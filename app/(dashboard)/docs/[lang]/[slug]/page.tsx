import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { Markdown } from "@/components/ui/markdown";

export const dynamic = "force-dynamic";

interface DocsPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

const docTitles: Record<string, string> = {
  "getting-started": "Getting Started",
  "api-reference": "API Reference",
  deployment: "Deployment Guide",
};

export default async function DocsPage({ params }: DocsPageProps) {
  const { lang, slug } = await params;
  const filePath = path.join(process.cwd(), "docs", lang, `${slug}.md`);

  let content: string;
  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch {
    notFound();
  }

  const docSlugs = ["getting-started", "api-reference", "deployment"];

  return (
    <div className="grid gap-8 lg:grid-cols-4">
      <aside className="lg:col-span-1">
        <nav className="space-y-1">
          <p className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Documentation
          </p>
          {docSlugs.map((s) => (
            <Link
              key={s}
              href={`/docs/${lang}/${s}`}
              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                s === slug
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {docTitles[s] || s}
            </Link>
          ))}
          <hr className="my-4 border-border" />
          <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Language
          </p>
          {["en", "es", "fr", "de", "ja", "zh"].map((l) => (
            <Link
              key={l}
              href={`/docs/${l}/${slug}`}
              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                l === lang
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {l.toUpperCase()}
            </Link>
          ))}
        </nav>
      </aside>

      <article className="lg:col-span-3 prose prose-invert prose-sm max-w-none">
        <div className="rounded-xl border border-border bg-card p-8">
          <Markdown content={content} />
        </div>
      </article>
    </div>
  );
}
