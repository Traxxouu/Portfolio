import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio')
    .items([
      S.listItem()
        .title('Réglages du site')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Réglages du site')),
      S.listItem()
        .title("Bandeau d'information")
        .child(S.document().schemaType('banner').documentId('banner').title("Bandeau d'information")),
      S.divider(),
      S.documentTypeListItem('project').title('Projets'),
      S.documentTypeListItem('experience').title('Parcours'),
      S.documentTypeListItem('certification').title('Certifications & badges'),
      S.divider(),
      S.documentTypeListItem('blog').title('Blog'),
      S.documentTypeListItem('category').title('Catégories'),
      S.documentTypeListItem('author').title('Auteurs'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['blog', 'project', 'category', 'author', 'certification', 'banner', 'experience', 'siteSettings', 'terminalStatus'].includes(item.getId()!),
      ),
    ])
