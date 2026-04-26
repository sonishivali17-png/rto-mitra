# Phase 2 — AI roadmap

## Today
- `/ai-assistant` ships a fully wired chat UI.
- `/api/ai/chat` calls `lib/ai.ts → askRtoMitraAI()` which returns a deterministic, source-referenced response so the experience is functional from day one.

## Phase 2.1 — Plug a real LLM
Open `lib/ai.ts` and replace the stubbed `askRtoMitraAI` with one of:

### Anthropic
```ts
const r = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "x-api-key": process.env.ANTHROPIC_API_KEY!,
    "anthropic-version": "2023-06-01",
    "content-type": "application/json",
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [...history, { role: "user", content: question }],
  }),
});
```

### OpenAI
```ts
const r = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history, { role: "user", content: question }],
});
```

## Phase 2.2 — Retrieval-augmented generation (RAG)
- Index Parivahan PDF circulars + state transport SOPs + your knowledge hub articles into Supabase **pgvector**.
- Inject top-k chunks into the system prompt as `Context:`.
- Always cite the source URL. Refuse to answer if no chunk passes a similarity threshold.

## Phase 2.3 — Document understanding
- Allow the user to upload an RC/Aadhaar/Form 35.
- Use vision-capable models (Claude or GPT-4o) to extract: vehicle no, owner, validity, hypothecation flag.
- Persist extracted fields to `uploaded_documents.notes` (JSON).

## Phase 2.4 — Voice (regional language)
- Whisper / Deepgram for input
- ElevenLabs / OpenAI TTS for output (Hindi & Gujarati)

## Guardrails
- Hard system rule: never invent fees or timelines — only ranges, with a "varies by state" caveat.
- Always end with the conversion CTA: "Need done-for-you support? WhatsApp us."
- Log every Q+A to `ai_chat_history` for quality review.
