/**
 * Lightweight markdown renderer for our seeded knowledge articles.
 * Supports: ##/### headings (with anchor IDs), bold, italic, links,
 * unordered/ordered lists, paragraphs.
 *
 * For full CMS-grade rendering swap to `react-markdown` with rehype/remark.
 */

function renderInline(text: string) {
  // [text](url)
  let html = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  // **bold**
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  // *italic* / _italic_
  html = html.replace(/(^|\W)_([^_]+)_(?=\W|$)/g, "$1<em>$2</em>");
  html = html.replace(/(^|\W)\*([^*]+)\*(?=\W|$)/g, "$1<em>$2</em>");
  // `code`
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  return html;
}

function slugifyHeading(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function RenderedMarkdown({ source }: { source: string }) {
  const blocks = source.split(/\n\n+/);
  const html: string[] = [];

  for (const block of blocks) {
    const lines = block.split(/\n/);
    if (/^### /.test(lines[0])) {
      const text = lines[0].replace(/^### /, "");
      html.push(`<h3 id="${slugifyHeading(text)}">${renderInline(text)}</h3>`);
      continue;
    }
    if (/^## /.test(lines[0])) {
      const text = lines[0].replace(/^## /, "");
      html.push(`<h2 id="${slugifyHeading(text)}">${renderInline(text)}</h2>`);
      continue;
    }
    if (lines.every((l) => /^- /.test(l))) {
      html.push(
        "<ul>" +
          lines.map((l) => `<li>${renderInline(l.replace(/^- /, ""))}</li>`).join("") +
          "</ul>"
      );
      continue;
    }
    if (lines.every((l) => /^\d+\.\s/.test(l))) {
      html.push(
        "<ol>" +
          lines.map((l) => `<li>${renderInline(l.replace(/^\d+\.\s/, ""))}</li>`).join("") +
          "</ol>"
      );
      continue;
    }
    html.push(`<p>${renderInline(block)}</p>`);
  }

  return (
    <article
      className="prose-rto"
      dangerouslySetInnerHTML={{ __html: html.join("\n") }}
    />
  );
}
