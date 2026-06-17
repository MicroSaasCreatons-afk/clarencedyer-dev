import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.string(),
    excerpt: z.string(),
    readTime: z.string().optional(),
    featured: z.boolean().optional().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['live', 'building', 'completed']),
    tag: z.string(),
    icon: z.string(),
    category: z.string(),
    problem: z.string(),
    solution: z.string(),
    outcome: z.string(),
    techStack: z.array(z.string()),
    featured: z.boolean().optional().default(false),
    order: z.number().optional().default(1),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    company: z.string(),
    quote: z.string(),
    stars: z.number().optional().default(5),
    featured: z.boolean().optional().default(true),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    icon: z.string(),
    description: z.string(),
    features: z.array(z.string()),
    order: z.number().optional().default(1),
    featured: z.boolean().optional().default(true),
  }),
});

export const collections = { blog, projects, testimonials, services };
