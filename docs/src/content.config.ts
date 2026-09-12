import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        /** sha256 of the page's source inputs (set by scripts/generate-pages.mjs). Emitted as <meta name="content-hash">. */
        contentHash: z.string().optional(),
      }),
    }),
  }),
};
