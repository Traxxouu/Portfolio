import { defineField, defineType } from 'sanity'

// Réglages globaux : accroche, statut, focus du moment
export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Réglages du site',
  type: 'document',
  fields: [
    defineField({
      name: 'pitch',
      title: 'Accroche (accueil)',
      type: 'text',
      rows: 3,
      description: 'Le paragraphe sous ton nom en haut de l’accueil.',
      validation: (r) => r.max(280),
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      description: 'Petite ligne avec le point vert, ex : Ouvert aux projets via YourWeb',
      validation: (r) => r.max(60),
    }),
    defineField({
      name: 'focus',
      title: 'Ce que j’apprends en ce moment',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
  preview: { prepare: () => ({ title: 'Réglages du site' }) },
})
