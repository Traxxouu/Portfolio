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
      description: 'Un emoji pour représenter le projet (ex: 🚀) - Optionnel si image fournie',
    }),
    defineField({
      name: 'coverImage',
      title: 'Image de couverture',
      type: 'image',
      description: 'Image principale du projet (recommandé : 1200x630px)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
          description: 'Important pour l\'accessibilité',
        }
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'text',
      description: 'Description affichée dans la liste des projets',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Description complète',
      type: 'array',
      description: 'Contenu détaillé du projet (texte, images, code, etc.)',
      of: [
        { 
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Titre H2', value: 'h2'},
            {title: 'Titre H3', value: 'h3'},
            {title: 'Titre H4', value: 'h4'},
            {title: 'Citation', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numérotée', value: 'number'}
          ],
          marks: {
            decorators: [
              {title: 'Gras', value: 'strong'},
              {title: 'Italique', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Lien externe',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule) => rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Ouvrir dans un nouvel onglet',
                    initialValue: true,
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texte alternatif',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Légende',
            },
            {
              name: 'position',
              type: 'string',
              title: 'Position',
              options: {
                list: [
                  {title: 'Centre', value: 'center'},
                  {title: 'Gauche', value: 'left'},
                  {title: 'Droite', value: 'right'},
                ],
                layout: 'radio',
              },
              initialValue: 'center',
            }
          ]
        },
        {
          type: 'code',
          name: 'code',
          title: 'Bloc de code',
          options: {
            language: 'javascript',
            languageAlternatives: [
              {title: 'JavaScript', value: 'javascript'},
              {title: 'TypeScript', value: 'typescript'},
              {title: 'Python', value: 'python'},
              {title: 'Java', value: 'java'},
              {title: 'HTML', value: 'html'},
              {title: 'CSS', value: 'css'},
              {title: 'JSON', value: 'json'},
              {title: 'Bash', value: 'bash'},
            ],
            withFilename: true,
          }
        }
      ],
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
      name: 'featured',
      title: 'Projet mis en avant',
      type: 'boolean',
      description: 'Afficher ce projet en premier',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      }
    }),
    defineField({
      name: 'gradientFrom',
      title: 'Gradient (départ)',
      type: 'string',
      description: 'Couleur Tailwind CSS (ex: blue-500) - Utilisé si pas d\'image',
    }),
    defineField({
      name: 'gradientTo',
      title: 'Gradient (arrivée)',
      type: 'string',
      description: 'Couleur Tailwind CSS (ex: purple-500) - Utilisé si pas d\'image',
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
      media: 'coverImage',
    },
    prepare({ title, emoji, status, media }) {
      return {
        title: emoji ? `${emoji} ${title}` : title,
        subtitle: status,
        media,
      };
    },
  },
});
