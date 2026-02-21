import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';
import { STORIES_POSTS, PROGRAMS_POSTS } from '@/data/site-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/stories`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/programs`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/space`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/friends`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/support`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/notice`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${base}/books`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/archive`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ];

  const storyPages: MetadataRoute.Sitemap = STORIES_POSTS.map((post) => ({
    url: `${base}/stories/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  const programPages: MetadataRoute.Sitemap = PROGRAMS_POSTS.map((post) => ({
    url: `${base}/programs/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...storyPages, ...programPages];
}
