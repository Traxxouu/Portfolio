import { defineField, defineType } from 'sanity'

export const terminalStatusType = defineType({
  name: 'terminalStatus',
  title: 'Terminal Status',
  type: 'document',
  icon: () => '💻',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre (pour le studio)',
      type: 'string',
      initialValue: 'Status actuel',
    }),
    defineField({
      name: 'lastUpdate',
      title: 'Date de dernière mise à jour',
      description: 'La date affichée dans le terminal',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Contenu du fichier status.txt',
      description: 'Affiché quand on tape "cat status.txt". Chaque ligne = un retour à la ligne.',
      type: 'text',
      rows: 10,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'serverName',
      title: 'Nom du serveur',
      type: 'string',
      initialValue: 'maelserver',
    }),
    defineField({
      name: 'fileName',
      title: 'Nom du fichier',
      type: 'string',
      initialValue: 'status.txt',
    }),
    defineField({
      name: 'welcomeMessage',
      title: 'Message de bienvenue',
      description: 'Affiché au démarrage du terminal (avant le prompt). Chaque ligne = un retour à la ligne.',
      type: 'text',
      rows: 5,
      initialValue: 'Bienvenue sur le serveur de Maël Barbe.\nTape "help" pour voir les commandes disponibles.',
    }),
    defineField({
      name: 'commands',
      title: 'Commandes personnalisées',
      description: 'Commandes que les visiteurs peuvent taper dans le terminal.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'terminalCommand',
          title: 'Commande',
          fields: [
            defineField({
              name: 'name',
              title: 'Nom de la commande',
              description: 'Ce que l\'utilisateur tape (ex: "whoami", "skills", "contact")',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description (pour le help)',
              description: 'Courte description affichée dans la commande "help"',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'output',
              title: 'Sortie de la commande',
              description: 'Ce qui est affiché quand la commande est exécutée. Chaque ligne = un retour à la ligne.',
              type: 'text',
              rows: 8,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'description',
            },
            prepare({ title, subtitle }) {
              return {
                title: title ? `$ ${title}` : 'Commande',
                subtitle: subtitle || '',
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'lastUpdate',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Terminal Status',
        subtitle: subtitle ? `Dernière MAJ: ${subtitle}` : 'Non configuré',
      }
    },
  },
})
