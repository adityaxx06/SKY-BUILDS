import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Services } from "@/components/sections/Services";
import { WhySkyBuilds } from "@/components/sections/WhySkyBuilds";
import { About } from "@/components/sections/About";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  canonicalAlternates,
  getSiteUrl,
  openGraphPage,
} from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Modern Web Development Studio",
  description: SITE_DESCRIPTION,
  ...openGraphPage(
    `${SITE_NAME} — Modern Web Development Studio`,
    SITE_DESCRIPTION
  ),
  ...canonicalAlternates("/"),
};

const siteUrl = getSiteUrl();

/** Minimal Organization/WebSite structured data — only fields the site actually supports. */
function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    ...(siteUrl ? { url: siteUrl } : {}),
    email: "hello@skybuilds.studio",
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    ...(siteUrl ? { url: siteUrl } : {}),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

export default function Home() {
  return (
    <main>
      <StructuredData />
      <Hero />
      <Marquee />
      <Services />
      <WhySkyBuilds />
      <About />
      <SelectedWork />
      <Process />
      <CTA />
    </main>
  );
}
