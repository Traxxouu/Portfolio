import { defineField, defineType } from 'sanity'

export const bannerType = defineType({
  name: 'banner',
  title: 'Bandeau d\'information',
  type: 'document',
  icon: () => '📢',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre (pour le studio)',
      type: 'string',
      initialValue: 'Bandeau principal',
    }),
    defineField({
      name: 'enabled',
      title: 'Afficher le bandeau',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'text',
      title: 'Texte du bandeau',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Couleur de fond (hex)',
      description: 'Ex: #2563eb (bleu), #ea580c (orange), #dc2626 (rouge), #16a34a (vert)',
      type: 'string',
      initialValue: '#2563eb',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'textColor',
      title: 'Couleur du texte (hex)',
      description: 'Ex: #ffffff (blanc), #000000 (noir)',
      type: 'string',
      initialValue: '#ffffff',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Lien (optionnel)',
      description: 'Si rempli, le bandeau sera cliquable',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'text',
      enabled: 'enabled',
    },
    prepare({ title, enabled }) {
      return {
        title: title || 'Bandeau',
        subtitle: enabled ? '✅ Actif' : '❌ Désactivé',
      }
    },
  },
})
