import type { Metadata, Viewport } from "next";
import "./globals.css";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  getSiteUrl,
} from "@/lib/seo/site";

type RootLayoutProps = {
  children: React.ReactNode;
};

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: `${SITE_NAME} — Modern Web Development Studio`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Modern Web Development Studio`,
    description: SITE_DESCRIPTION,
    ...(siteUrl
      ? {
          images: [
            {
              url: `${siteUrl}/opengraph-image`,
              width: 1200,
              height: 630,
              alt: `${SITE_NAME} — Digital experiences built to move ideas forward.`,
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Modern Web Development Studio`,
    description: SITE_DESCRIPTION,
    ...(siteUrl ? { images: [`${siteUrl}/opengraph-image`] } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F1EA" },
    { media: "(prefers-color-scheme: dark)", color: "#120E1F" },
  ],
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-theme="dark" className="h-full antialiased">
      <head>
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
        {children}
      </body>
    </html>
  );
}
