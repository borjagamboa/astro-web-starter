import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const canonicalField = z.string().trim().min(1).refine((value) => {
  if (value.startsWith('/')) return true;
  try {
    return ['http:', 'https:'].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}, 'Canonical must be a relative path or an absolute HTTP(S) URL.');

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1).max(180),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(true),
    image: z.string().trim().min(1).optional(),
    imageAlt: z.string().trim().min(1).optional(),
    author: z.string().trim().min(1).optional(),
    tags: z.array(z.string().trim().min(1)).default([]),
    canonical: canonicalField.optional(),
    noindex: z.boolean().default(false),
  }).superRefine((data, context) => {
    if (data.image && !data.imageAlt) {
      context.addIssue({
        code: 'custom',
        path: ['imageAlt'],
        message: 'imageAlt is required when image is set.',
      });
    }
    if (data.updatedDate && data.updatedDate < data.publishDate) {
      context.addIssue({
        code: 'custom',
        path: ['updatedDate'],
        message: 'updatedDate cannot be earlier than publishDate.',
      });
    }
  }),
});

export const collections = { blog };
