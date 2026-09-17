/**
 * Schriftliche Trick-Anleitung. Einfaches Format, wie in inhalte/*.md:
 * "## " Trick-Überschrift, "### " Unterüberschrift, "> " Zitat, sonst Absätze.
 * Bewusst ohne Markdown-Paket und ohne HTML aus dem Text.
 */
export function Anleitung({ text }: { text: string }) {
  // Überschriften und Zitate sind immer eigene Blöcke, sonst trennt eine Leerzeile.
  const bloecke: string[] = [];
  let absatz: string[] = [];
  const abschliessen = () => {
    if (absatz.length) bloecke.push(absatz.join(" "));
    absatz = [];
  };
  for (const zeile of text.replace(/\r/g, "").split("\n").map((z) => z.trim())) {
    if (!zeile) abschliessen();
    else if (/^(#{2,3} |> )/.test(zeile)) {
      abschliessen();
      bloecke.push(zeile);
    } else absatz.push(zeile);
  }
  abschliessen();
  return (
    <article className="glass rounded-2xl p-6 md:p-10 max-w-prose space-y-4 text-dark-200 leading-relaxed">
      {bloecke.map((b, i) => {
        if (b.startsWith("### ")) return <h3 key={i} className="text-sm font-semibold uppercase tracking-[0.15em] text-lila-300 pt-1">{b.slice(4)}</h3>;
        if (b.startsWith("## ")) return <h2 key={i} className="font-display text-xl text-gold-400 pt-6 first:pt-0 text-balance">{b.slice(3)}</h2>;
        if (b.startsWith("> ")) return <blockquote key={i} className="border-l-2 border-gold-500/60 pl-4 italic text-dark-100 pt-4">{b.slice(2)}</blockquote>;
        return <p key={i}>{b}</p>;
      })}
    </article>
  );
}
