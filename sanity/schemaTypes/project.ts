import { defineType, defineField } from 'sanity';

export const projectType = defineType({
  name: 'project',
  title: 'Projets',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
      description: 'Un emoji pour représenter le projet (ex: 🚀)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: 'En cours', value: 'en-cours' },
          { title: 'Terminé', value: 'terminé' },
          { title: 'Abandonné', value: 'abandonné' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gradientFrom',
      title: 'Gradient (départ)',
      type: 'string',
      description: 'Couleur Tailwind CSS (ex: blue-500)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gradientTo',
      title: 'Gradient (arrivée)',
      type: 'string',
      description: 'Couleur Tailwind CSS (ex: purple-500)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Ordre',
      type: 'number',
      description: 'Ordre d\'affichage (1 = premier)',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'githubUrl',
      title: 'URL GitHub',
      type: 'url',
    }),
    defineField({
      name: 'liveUrl',
      title: 'URL du site',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      emoji: 'emoji',
      status: 'status',
    },
    prepare({ title, emoji, status }) {
      return {
        title: `${emoji} ${title}`,
        subtitle: status,
      };
    },
  },
});
