import type { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';

const BASE_URL = 'https://goatscale.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/work`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/start-a-project`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BASE_URL}/book-a-call`, changeFrequency: 'yearly', priority: 0.6 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/work/${p.slug}`,
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
