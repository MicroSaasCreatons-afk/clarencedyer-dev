import { config, collection, singleton, fields } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },

  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Publish Date' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'AI Agents', value: 'ai-agents' },
            { label: 'Automation', value: 'automation' },
            { label: 'Lead Generation', value: 'lead-generation' },
            { label: 'Content Systems', value: 'content-systems' },
            { label: 'SaaS', value: 'saas' },
            { label: 'Business Strategy', value: 'business-strategy' },
            { label: 'CAIO Insights', value: 'caio-insights' },
          ],
          defaultValue: 'ai-agents',
        }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        readTime: fields.text({ label: 'Read Time (e.g. 5 min read)' }),
        featured: fields.checkbox({ label: 'Featured Post', defaultValue: false }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),

    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'description' },
      schema: {
        title: fields.slug({ name: { label: 'Project Title' } }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Live', value: 'live' },
            { label: 'Building', value: 'building' },
            { label: 'Completed', value: 'completed' },
          ],
          defaultValue: 'live',
        }),
        tag: fields.text({ label: 'Tag (e.g. Directory SaaS)' }),
        icon: fields.text({ label: 'Emoji Icon' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'SaaS', value: 'saas' },
            { label: 'AI Agent', value: 'agent' },
            { label: 'Automation', value: 'automation' },
            { label: 'Content', value: 'content' },
          ],
          defaultValue: 'saas',
        }),
        problem: fields.text({ label: 'Problem Statement', multiline: true }),
        solution: fields.text({ label: 'Solution', multiline: true }),
        outcome: fields.text({ label: 'Outcome / Result' }),
        techStack: fields.array(fields.text({ label: 'Technology' }), {
          label: 'Tech Stack',
          itemLabel: props => props.value || 'Tech',
        }),
        featured: fields.checkbox({ label: 'Featured Project', defaultValue: false }),
        order: fields.integer({ label: 'Display Order', defaultValue: 1 }),
        description: fields.markdoc({ label: 'Full Description' }),
      },
    }),

    testimonials: collection({
      label: 'Testimonials',
      slugField: 'name',
      path: 'src/content/testimonials/*',
      schema: {
        name: fields.slug({ name: { label: 'Client Name' } }),
        role: fields.text({ label: 'Role / Title' }),
        company: fields.text({ label: 'Company' }),
        quote: fields.text({ label: 'Testimonial Quote', multiline: true }),
        stars: fields.integer({ label: 'Stars (1-5)', defaultValue: 5 }),
        featured: fields.checkbox({ label: 'Show on Homepage', defaultValue: true }),
      },
    }),

    services: collection({
      label: 'Services',
      slugField: 'title',
      path: 'src/content/services/*',
      schema: {
        title: fields.slug({ name: { label: 'Service Title' } }),
        icon: fields.text({ label: 'Emoji Icon' }),
        description: fields.text({ label: 'Short Description', multiline: true }),
        features: fields.array(fields.text({ label: 'Feature' }), {
          label: 'Features List',
          itemLabel: props => props.value || 'Feature',
        }),
        order: fields.integer({ label: 'Display Order', defaultValue: 1 }),
        featured: fields.checkbox({ label: 'Show on Homepage', defaultValue: true }),
      },
    }),
  },

  singletons: {
    homepage: singleton({
      label: 'Homepage Settings',
      path: 'src/content/homepage',
      schema: {
        heroTitle: fields.text({ label: 'Hero Title' }),
        heroSubtitle: fields.text({ label: 'Hero Subtitle', multiline: true }),
        stat1Value: fields.text({ label: 'Stat 1 Value' }),
        stat1Label: fields.text({ label: 'Stat 1 Label' }),
        stat2Value: fields.text({ label: 'Stat 2 Value' }),
        stat2Label: fields.text({ label: 'Stat 2 Label' }),
        stat3Value: fields.text({ label: 'Stat 3 Value' }),
        stat3Label: fields.text({ label: 'Stat 3 Label' }),
        stat4Value: fields.text({ label: 'Stat 4 Value' }),
        stat4Label: fields.text({ label: 'Stat 4 Label' }),
        aboutText1: fields.text({ label: 'About Paragraph 1', multiline: true }),
        aboutText2: fields.text({ label: 'About Paragraph 2', multiline: true }),
        aboutText3: fields.text({ label: 'About Paragraph 3', multiline: true }),
      },
    }),
  },
});
