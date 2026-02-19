import Link from "next/link";
import { Globe, Zap, Shield, ArrowRight, BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-purple-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <Globe className="h-4 w-4" />
              Powered by Lingo.dev — 5 Translation Tools Integrated
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <div>DevOps Monitoring</div>
              <div className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                In Every Language
              </div>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Real-time logs, intelligent alerts, and AI-powered insights — all automatically
              translated into 6 languages. Monitor your global infrastructure without language
              barriers.
            </p>

            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                View Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/docs/en/getting-started"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                <BookOpen className="h-4 w-4" />
                Read Docs
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight">Built for Global Teams</h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need to monitor DevOps across languages and regions
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon={<Globe className="h-8 w-8 text-blue-400" />}
            title="6 Languages"
            description="Full UI translation with Lingo Compiler, documentation with CLI, and runtime content with SDK. Every piece of your dashboard speaks your language."
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-amber-400" />}
            title="Real-time Updates"
            description="Live log streaming, instant alert notifications, and auto-refreshing dashboards. See what's happening in your infrastructure as it happens."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8 text-green-400" />}
            title="AI-Powered Insights"
            description="Intelligent log analysis detects patterns, anomalies, and provides actionable recommendations — all in your preferred language via Lingo MCP."
          />
        </div>
      </div>

      {/* Lingo.dev Integration */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">5 Lingo.dev Tools Integrated</h2>
            <p className="mt-3 text-muted-foreground">
              Complete integration of the entire Lingo.dev ecosystem
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { name: "Compiler", desc: "Build-time UI translation", file: "next.config.ts" },
              { name: "CLI", desc: "Markdown docs translation", file: "i18n.json" },
              { name: "SDK", desc: "Runtime content translation", file: "lib/lingo.ts" },
              { name: "CI/CD", desc: "Auto-translate on push", file: ".github/workflows/" },
              { name: "MCP", desc: "AI insights in any language", file: "lib/mcp.ts" },
            ].map((tool) => (
              <div
                key={tool.name}
                className="rounded-xl border border-border bg-card p-5 text-center hover:border-primary/30 transition-colors"
              >
                <p className="text-sm font-bold text-primary mb-1">{tool.name}</p>
                <p className="text-xs text-muted-foreground mb-2">{tool.desc}</p>
                <code className="text-xs text-muted-foreground/70">{tool.file}</code>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>🌍 GlobalOps — DevOps Monitoring In Every Language</p>
            <p>
              Built with Next.js, Supabase & Lingo.dev
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-8 text-center hover:border-primary/30 transition-colors">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
