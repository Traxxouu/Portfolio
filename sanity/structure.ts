import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('blog').title('Blog Posts'),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('certification').title('Certifications & Badges'),
      S.divider(),
      S.listItem()
        .title('Bandeau d\'information')
        .icon(() => '📢')
        .child(
          S.document()
            .schemaType('banner')
            .documentId('banner')
            .title('Bandeau d\'information')
        ),
      S.divider(),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['blog', 'project', 'category', 'author', 'certification', 'banner'].includes(item.getId()!),
      ),
    ])
