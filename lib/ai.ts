import Anthropic from "@anthropic-ai/sdk";
import { KNOWLEDGE_ARTICLES } from "@/data/knowledge-articles";
import { SITE } from "@/lib/constants";

export type AiTurn = { role: "user" | "assistant"; content: string };
export type AiSource = { title: string; url: string };

const TRUSTED_SOURCES: AiSource[] = [
  { title: "Parivahan Sewa (Govt of India)", url: "https://parivahan.gov.in" },
  { title: "Gujarat State Transport",        url: "https://cot.gujarat.gov.in" },
  { title: "VAHAN Citizen Services",         url: "https://vahan.parivahan.gov.in" },
  { title: "Sarathi Driving Licence",        url: "https://sarathi.parivahan.gov.in" },
  { title: "echallan portal",                url: "https://echallan.parivahan.gov.in" },
];

export const SYSTEM_PROMPT = `You are RTO Mitra AI, an expert assistant for Indian
vehicle paperwork (RC transfer, hypothecation removal, NOC, duplicate RC, DL,
challan, fancy number, road tax, FASTag, fitness, permit).

RULES:
- Be precise, step-by-step, and safe. Output Markdown.
- Use the provided CONTEXT first. If the answer is not in CONTEXT, say so plainly
  and provide the best generic guidance based on official Indian RTO rules.
- NEVER invent specific fees or timelines. Quote official ranges and add
  "varies by state and case".
- Always cite trusted sources at the bottom under "Sources:".
- End every reply with a short conversion CTA:
  "Need done-for-you support? WhatsApp us — we'll handle the entire process."
- Keep replies under ~250 words unless the user asks for more depth.`;

/* ---------- RAG-lite retrieval over the Knowledge Hub ---------- */

function tokenize(s: string) {
  return s.toLowerCase().match(/[a-z0-9]+/g) ?? [];
}

function scoreArticle(query: string, article: { title: string; excerpt: string; body: string }) {
  const qTokens = new Set(tokenize(query));
  if (qTokens.size === 0) return 0;
  const text = `${article.title} ${article.excerpt} ${article.body}`.toLowerCase();
  let s = 0;
  for (const t of qTokens) {
    if (t.length < 3) continue;
    const re = new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g");
    const m = text.match(re);
    if (m) s += m.length;
    if (article.title.toLowerCase().includes(t)) s += 3;
  }
  return s;
}

function topArticles(query: string, k = 3) {
  return KNOWLEDGE_ARTICLES
    .map((a) => ({ a, score: scoreArticle(query, a) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((x) => x.a);
}

function buildContextBlock(query: string) {
  const arts = topArticles(query);
  if (!arts.length) return { block: "", sources: [] as AiSource[] };
  const block = arts
    .map((a, i) => {
      // Trim body to 1.2k chars per article to keep token budget tight.
      const body = a.body.replace(/\s+/g, " ").slice(0, 1200);
      return `### Source ${i + 1}: ${a.title}\n${body}\n(URL: ${SITE.url}/knowledge/${a.categorySlug}/${a.slug})`;
    })
    .join("\n\n");
  const sources: AiSource[] = arts.map((a) => ({
    title: a.title,
    url: `${SITE.url}/knowledge/${a.categorySlug}/${a.slug}`,
  }));
  return { block, sources };
}

/* ---------- Main entry point ---------- */

export async function askRtoMitraAI({
  question,
  state,
  vehicleType,
  history = [],
}: {
  question: string;
  state?: string;
  vehicleType?: string;
  history?: AiTurn[];
}): Promise<{ answer: string; sources: AiSource[] }> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const { block, sources: knowledgeSources } = buildContextBlock(question);

  // No API key configured — return a friendly stub so dev still works.
  if (!apiKey) {
    return stubResponse({ question, state, vehicleType, knowledgeSources });
  }

  const client = new Anthropic({ apiKey });
  const ctx = state ? `\nUser state: ${state}.` : "";
  const veh = vehicleType ? `\nVehicle type: ${vehicleType}.` : "";

  const systemBlocks = [
    SYSTEM_PROMPT,
    ctx + veh,
    block ? `CONTEXT (use first):\n\n${block}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  // Bound history (last 10 turns) to keep latency / cost predictable.
  const recent = history.slice(-10);

  try {
    const result = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6",
      max_tokens: 700,
      temperature: 0.2,
      system: systemBlocks,
      messages: [
        ...recent.map((m) => ({ role: m.role, content: m.content })),
        { role: "user" as const, content: question },
      ],
    });

    const text = result.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("\n")
      .trim();

    return {
      answer: text || "Sorry, I couldn't generate a response. Please try again.",
      sources: knowledgeSources.length ? knowledgeSources : TRUSTED_SOURCES,
    };
  } catch (e) {
    console.error("Claude API error:", e);
    return stubResponse({ question, state, vehicleType, knowledgeSources });
  }
}

function stubResponse({
  state,
  vehicleType,
  knowledgeSources,
}: {
  question: string;
  state?: string;
  vehicleType?: string;
  knowledgeSources: AiSource[];
}): { answer: string; sources: AiSource[] } {
  const ctxState = state ? ` in ${state}` : "";
  const ctxVeh = vehicleType ? ` for your ${vehicleType.toLowerCase()}` : "";
  const answer = [
    `Here is a step-by-step approach${ctxState}${ctxVeh}:`,
    "",
    "1. Collect documents — RC, valid ID/address proof, insurance, PUC and the relevant form.",
    "2. Visit the official portal (parivahan.gov.in) or your state transport site to start the application.",
    "3. Pay the prescribed government fee online; keep the receipt.",
    "4. Visit the RTO if a physical verification or vehicle inspection is required.",
    "5. Track the status with your application number.",
    "",
    "_Note: Exact fees and timelines vary by state and case._",
    "",
    "**Need done-for-you support? WhatsApp us — we'll handle the entire process.**",
  ].join("\n");
  return { answer, sources: knowledgeSources.length ? knowledgeSources : TRUSTED_SOURCES };
}
