import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const seoFields = {
  title: z.string().min(1),
  description: z.string().min(1).max(180),
  slug: z.string().min(1),
  seoTitle: z.string().min(1).optional(),
  seoDescription: z.string().min(1).max(180).optional(),
  featuredImage: z.string().optional(),
  featuredImageAlt: z.string().optional(),
  draft: z.boolean().default(true),
};

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    ...seoFields,
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('[PROJECT_NAME]'),
    category: z.string().default('Provisional'),
    tags: z.array(z.string()).default([]),
    sourceUrl: z.string().url().optional(),
  }),
});

const servicios = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/servicios' }),
  schema: z.object({
    ...seoFields,
    layoutVariant: z.enum(['default', 'clinical']).default('default'),
    serviceName: z.string().min(1),
    benefits: z.array(z.string()).default([]),
    whoIsItFor: z.array(z.string()).default([]),
    howItWorks: z.array(z.string()).default([]),
    relatedPathologies: z.array(z.string()).default([]),
    relatedPosts: z.array(z.string()).default([]),
    pillars: z
      .array(
        z.object({
          title: z.string().min(1),
          text: z.string().min(1),
        })
      )
      .default([]),
    editorialEyebrow: z.string().optional(),
    editorialTitle: z.string().optional(),
    editorialParagraphs: z.array(z.string()).default([]),
    editorialNote: z.string().optional(),
    conditionIntro: z.string().optional(),
    conditionApproaches: z
      .array(
        z.object({
          title: z.string().min(1),
          text: z.string().min(1),
          includes: z.string().optional(),
        })
      )
      .default([]),
    homeTreatmentTitle: z.string().optional(),
    homeTreatmentParagraphs: z.array(z.string()).default([]),
    supportTitle: z.string().optional(),
    supportText: z.string().optional(),
    supportItems: z.array(z.string()).default([]),
    faqs: z
      .array(
        z.object({
          question: z.string().min(1),
          answer: z.string().min(1),
        })
      )
      .default([]),
    ctaTitle: z.string().optional(),
    ctaText: z.string().optional(),
    ctaSecondaryText: z.string().optional(),
    ctaSecondaryHref: z.string().optional(),
    order: z.number().int().nonnegative().default(0),
  }),
});

const patologias = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/patologias' }),
  schema: z.object({
    ...seoFields,
    conditionName: z.string().min(1),
    symptomsTitle: z.string().optional(),
    supportTitle: z.string().optional(),
    ctaTitle: z.string().optional(),
    ctaText: z.string().optional(),
    relatedServices: z.array(z.string()).default([]),
    relatedPosts: z.array(z.string()).default([]),
    order: z.number().int().nonnegative().default(0),
  }),
});

export const collections = {
  blog,
  servicios,
  patologias,
};

