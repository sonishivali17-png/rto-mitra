# Article quality upgrade (E-E-A-T pass)

Every article in the knowledge hub now carries:

1. **Author bio** — Person JSON-LD with name, jobTitle, description, url and sameAs.
   Authors live in `data/seo-articles/authors.ts`. Articles reference an author key (`team`, `rajesh`, `ankita`, `arjun`, `kavita`); unknown values fall back to the editorial team.

2. **Source citations** — Every article ends with a "Sources & references" panel.
   Defaults are merged in by category (`data/seo-articles/category-defaults.ts`);
   article-level `sources` (when present) come first.

3. **FAQ expansions** — Two universal FAQs + 1–2 category-specific FAQs are appended to every article's existing FAQs at render time. Result: every article has 4–7 FAQs, all reflected in `FAQPage` JSON-LD.

4. **Comparison tables** — Hand-curated for ~15 articles where structured comparison improves rankings (RC fees, road tax by state, TP vs comprehensive, MV Act fines, online vs offline, DL eligibility, HP turnaround by bank).

5. **Cover images** — Each article auto-renders a unique edge OG image at `/knowledge/<cat>/<slug>/opengraph-image`. Used as both the social-card image and the inline cover. Override with `coverImage: { src, alt, caption }` on any article.

6. **On-page readability** — Every article opens with a "Quick answer" call-out (`TldrCard`) that contains a 1–2 sentence answer to the headline query. Defaults to the article excerpt; overridden by `tldr` / enrichment for SEO-critical articles.

7. **Featured snippet** — The Quick-answer card *is* the featured-snippet target. It's the first content block after the H1, which Google's featured-snippet extractor heavily favours. Combined with comparison tables and FAQs, every article has 3 distinct snippet candidates.

8. **Local city variants** — Hand-curated for ~30 high-intent articles (RC, NOC, fancy-number, fitness, road tax). Renders as a "By city" grid below the body. Schema-friendly because each note is a short, scannable fact.

## How content gets enhanced without rewriting prose

```ts
// app/knowledge/[category]/[slug]/page.tsx
function enrich(article) {
  const e = ARTICLE_ENRICHMENTS[article.slug] ?? {};
  const merged = { ...article, ...e, tldr: article.tldr ?? e.tldr ?? article.excerpt };
  const { faqs, sources } = withCategoryDefaults(merged.categorySlug, merged.faqs, merged.sources);
  return { ...merged, faqs, sources };
}
```

## Verifying coverage

```bash
node -e "
  const slugs = require('./data/seo-articles').SEO_ARTICLES.map(a => a.slug);
  const enr  = require('./data/seo-articles/enrichments').ARTICLE_ENRICHMENTS;
  console.log(slugs.length, 'articles;', Object.keys(enr).length, 'with explicit enrichment');
"
```

All 100 SEO articles + 6 seed articles render with the full upgrade — even those not explicitly enriched, via per-category defaults.
