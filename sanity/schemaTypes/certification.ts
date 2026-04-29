import { defineField, defineType } from 'sanity'

export const certificationType = defineType({
  name: 'certification',
  title: 'Certifications & Badges',
  type: 'document',
  icon: () => '🏆',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom de la certification',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issuer',
      title: 'Organisme de délivrance',
      description: 'Ex: Google, AWS, Meta, Microsoft...',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issuerLogo',
      title: 'Logo de l\'organisme',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'issueDate',
      title: 'Date d\'émission',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'expiryDate',
      title: 'Date d\'expiration',
      description: 'Laisser vide si pas d\'expiration',
      type: 'date',
    }),
    defineField({
      name: 'credentialId',
      title: 'Identifiant du diplôme',
      type: 'string',
    }),
    defineField({
      name: 'credentialUrl',
      title: 'URL du diplôme',
      description: 'Lien pour vérifier / afficher le diplôme',
      type: 'url',
    }),
    defineField({
      name: 'skills',
      title: 'Compétences associées',
      description: 'Les compétences validées par cette certification',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'media',
      title: 'Media (certificat / badge)',
      description: 'Upload le PDF, PNG ou image de ta certification ou badge',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      description: 'Plus petit = affiché en premier',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Ordre personnalisé',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Date d\'émission (récent)',
      name: 'issueDateDesc',
      by: [{ field: 'issueDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'issuer',
      media: 'issuerLogo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Certification',
        subtitle: subtitle || '',
        media,
      }
    },
  },
})
