import { z, defineCollection } from "astro:content";

const projectCollection = defineCollection({
    type: "data",
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            short_description: z.string(),
            banner_image: image(),
        }),
});

const workCollection = defineCollection({
    type: "content",
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            short_description: z.string(),
            description: z.optional(z.string()),
            banner_image: image(),
            link_button_text: z.optional(z.string()),
            link: z.optional(z.string()),
            services: z.array(z.string()),
            tech_stack: z.array(z.string()),
        }),
});

export const collections = {
    projects: projectCollection,
    works: workCollection,
};
