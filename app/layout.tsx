import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillJobs — AI-скиллы для профессионалов",
  description:
    "Калькуляторы, чеклисты, шаблоны документов и справочники для профессионалов Казахстана",
  openGraph: {
    title: "SkillJobs — AI-скиллы для профессионалов",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="mx-auto max-w-6xl flex items-center gap-3 px-4 py-3 sm:px-6">
            <Link href="/" className="flex items-baseline gap-2 group">
              <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                SkillJobs
              </span>
              <span className="hidden sm:inline text-sm text-muted-foreground">
                AI-скиллы для профессионалов
              </span>
            </Link>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border/50 py-6 text-center text-sm text-muted-foreground">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            SkillJobs &copy; 2026 &mdash; AI-скиллы для профессионалов Казахстана
          </div>
        </footer>
      </body>
    </html>
  );
}
