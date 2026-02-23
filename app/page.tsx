import Link from "next/link";
import {
  Globe,
  Zap,
  Shield,
  ArrowRight,
  BookOpen,
  ExternalLink,
  Activity,
} from "lucide-react";

export const dynamic = "force-dynamic";

const LANGUAGES = [
  { flag: "🇺🇸", name: "English",  sample: "Connection timeout after 30000ms" },
  { flag: "🇪🇸", name: "Español",  sample: "Tiempo de conexión agotado después de 30000ms" },
  { flag: "🇫🇷", name: "Français", sample: "Délai de connexion dépassé après 30000ms" },
  { flag: "🇩🇪", name: "Deutsch",  sample: "Verbindungstimeout nach 30000ms" },
  { flag: "🇯🇵", name: "日本語",    sample: "30000ms後に接続タイムアウト" },
  { flag: "🇨🇳", name: "中文",     sample: "连接超时，30000毫秒后" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hackathon badge */}
      <div className="border-b border-border bg-primary/5 py-2 text-center text-xs text-muted-foreground">
        🏆 Built for the{" "}
        <a
          href="https://lingo.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-medium"
        >
          Lingo.dev Hackathon
        </a>{" "}
        — Feb 2026 &nbsp;·&nbsp; Uses all 5 Lingo.dev tools
      </div>

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

            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Activity className="h-4 w-4" />
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
              <a
                href="https://github.com/fortuner6023/GlobalOps_DevOps_Monitoring_Multilingual"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                <ExternalLink className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Live language demo strip */}
      <div className="border-y border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            The same log message — translated live across 6 languages
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LANGUAGES.map((lang) => (
              <div
                key={lang.name}
                className="flex items-start gap-3 rounded-lg border border-border bg-background p-4"
              >
                <span className="text-xl shrink-0">{lang.flag}</span>
                <div>
                  <p className="text-xs font-semibold text-primary mb-1">{lang.name}</p>
                  <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                    {lang.sample}
                  </p>
                </div>
              </div>
            ))}
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
              { num: "1", name: "Compiler", desc: "Build-time UI translation", file: "next.config.ts", color: "text-blue-400" },
              { num: "2", name: "CLI",      desc: "Markdown docs translation", file: "i18n.json",       color: "text-green-400" },
              { num: "3", name: "SDK",      desc: "Runtime content translation", file: "lib/lingo.ts",  color: "text-amber-400" },
              { num: "4", name: "CI/CD",    desc: "Auto-translate on push",    file: ".github/workflows/", color: "text-purple-400" },
              { num: "5", name: "MCP",      desc: "AI insights in any language", file: "lib/mcp.ts",   color: "text-cyan-400" },
            ].map((tool) => (
              <div
                key={tool.name}
                className="rounded-xl border border-border bg-card p-5 text-center hover:border-primary/30 transition-colors"
              >
                <p className={`text-xs font-bold mb-1 ${tool.color}`}>#{tool.num}</p>
                <p className="text-sm font-bold text-foreground mb-1">{tool.name}</p>
                <p className="text-xs text-muted-foreground mb-2">{tool.desc}</p>
                <code className="text-xs text-muted-foreground/70">{tool.file}</code>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">See it in action</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Switch languages from the dashboard and watch logs, alerts, and AI insights
            instantly update — all powered by the Lingo.dev SDK at runtime.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Open Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground flex-wrap gap-4">
            <p>🌍 GlobalOps — DevOps Monitoring In Every Language</p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/fortuner6023/GlobalOps_DevOps_Monitoring_Multilingual"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <span>·</span>
              <span>Built with Next.js, Supabase &amp; Lingo.dev</span>
            </div>
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