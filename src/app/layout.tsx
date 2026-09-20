import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";

type RootLayoutProps = {
  children: React.ReactNode;
};
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// Both typefaces are loaded via stylesheet links rather than next/font,
// so the production build doesn't depend on network access to a font
// CDN at build time. --font-bricolage and --font-general-sans are
// declared as CSS variables in globals.css and consumed by the
// Tailwind theme block there.

export const metadata: Metadata = {
  title: "SKY BUILDS",
  description:
    "SKY BUILDS is a modern web development studio building high-quality digital experiences for ambitious businesses.",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-theme="dark" className="h-full antialiased">
      <head>
        {/* Sets the theme attribute before first paint, from
            localStorage, so there's no flash of the wrong theme on
            reload. Deliberately a tiny inline script rather than a
            dependency (e.g. next-themes) — ARCHITECTURE.md's
            dependency policy asks "can the existing stack solve
            this?" and here it clearly can. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try {
              var t = localStorage.getItem('sky-builds-theme');
              if (t === 'light' || t === 'dark') {
                document.documentElement.setAttribute('data-theme', t);
              }
            } catch (e) {}`,
          }}
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font --
            this rule targets the old Pages Router's _document.js; a
            <link> in the App Router root layout is the correct place
            to load a third-party font stylesheet. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only fixed top-4 left-4 z-[100] rounded-full px-4 py-2 text-sm font-medium"
          style={{ background: "var(--primary)", color: "var(--on-primary)" }}
        >
          Skip to content
        </a>
        {/* Respects prefers-reduced-motion for every Framer Motion
            animation in the app from one place, per ARCHITECTURE.md's
            animation-isolation principle. */}
        <MotionConfig reducedMotion="user">
          <Navbar />
          <div className="flex-1">
            <PageTransition>{children}</PageTransition>
          </div>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
