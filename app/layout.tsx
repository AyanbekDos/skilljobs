import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Manrope } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const GA_ID = "G-8RX60HY90J";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkillJobs — AI-инструменты для профессионалов",
  description:
    "Калькуляторы, чеклисты, шаблоны документов и справочники для профессионалов Казахстана. Работают прямо в чате.",
  openGraph: {
    title: "SkillJobs — AI-инструменты для профессионалов",
    description:
      "Калькуляторы, чеклисты, шаблоны документов и справочники для профессионалов Казахстана",
    type: "website",
    locale: "ru_KZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${playfair.variable} ${manrope.variable} h-full antialiased dark`}
    >
      <head>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
      </head>
      <body className="noise min-h-full flex flex-col bg-background text-foreground">
        <header className="glass sticky top-0 z-50">
          <div className="mx-auto max-w-7xl flex items-center justify-between px-5 py-3.5 sm:px-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/15 transition-colors group-hover:bg-primary/25">
                <svg viewBox="0 0 24 24" fill="none" className="size-4 text-primary" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold tracking-tight text-foreground">
                  Skill<span className="text-primary">Jobs</span>
                </span>
                <span className="hidden sm:inline text-xs tracking-wide uppercase text-muted-foreground">
                  Beta
                </span>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <span className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                Бесплатный доступ
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-border/50 py-8 mt-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
              <span className="text-sm text-muted-foreground">
                &copy; 2026 SkillJobs
              </span>
              <span className="text-xs text-muted-foreground/60">
                AI-инструменты для профессионалов Казахстана
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
