import type { MetadataRoute } from "next";
import { projects } from "@/features/projects/project-data";
import { getSiteUrl } from "@/lib/seo/site";

/**
 * Public routes only: home, services, projects index, project details
 * (from the existing project data — no invented URLs), contact.
 * Admin, login, and API routes are intentionally excluded.
 *
 * Returns an empty sitemap when NEXT_PUBLIC_SITE_URL is unset rather
 * than publishing guessed absolute URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  const now = new Date();
  const statics: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const projectEntries: MetadataRoute.Sitemap = [...projects]
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...statics, ...projectEntries];
}
