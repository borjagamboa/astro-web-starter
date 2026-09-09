import type { CollectionEntry } from 'astro:content';

export type BlogEntry = CollectionEntry<'blog'>;

export const isPublished = (entry: BlogEntry) => import.meta.env.DEV || !entry.data.draft;

export const sortBlogPosts = (entries: readonly BlogEntry[]) => (
  [...entries].sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())
);

export const getBlogSlug = (entry: BlogEntry) => entry.id.replace(/\.(md|mdx)$/i, '');
