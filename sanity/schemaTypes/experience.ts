import { defineField, defineType } from 'sanity'

// Parcours : entreprise, stages, formation — affiché sur l'accueil et la page Parcours
export const experienceType = defineType({
  name: 'experience',
  title: 'Parcours',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Poste / diplôme', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'org', title: 'Entreprise / école', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'kind',
      title: 'Type',
      type: 'string',
      options: { list: [
        { title: 'Entreprise', value: 'entreprise' },
        { title: 'Stage', value: 'stage' },
        { title: 'Alternance', value: 'alternance' },
        { title: 'Formation', value: 'formation' },
      ], layout: 'radio' },
      initialValue: 'stage',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'period', title: 'Période affichée', type: 'string', description: 'Ex : Mai — juil. 2026, ou 2025 — aujourd’hui' }),
    defineField({ name: 'summary', title: 'Résumé', type: 'text', rows: 3, validation: (r) => r.required().max(320) }),
    defineField({ name: 'tags', title: 'Technos / mots-clés', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'url', title: 'Lien (optionnel)', type: 'url' }),
    defineField({ name: 'order', title: 'Ordre (1 = en haut)', type: 'number', validation: (r) => r.required().min(1) }),
  ],
  orderings: [{ title: 'Ordre', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'org', subtitle: 'title', period: 'period' },
    prepare: ({ title, subtitle, period }) => ({ title, subtitle: [subtitle, period].filter(Boolean).join(' · ') }),
  },
})
