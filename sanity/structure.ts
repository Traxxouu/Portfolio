import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('blog').title('Blog Posts'),
      S.documentTypeListItem('project').title('Projects'),
      S.divider(),
      // Terminal Status - document unique
      S.listItem()
        .title('Terminal Status')
        .icon(() => '💻')
        .child(
          S.document()
            .schemaType('terminalStatus')
            .documentId('terminalStatus')
            .title('Terminal Status')
        ),
      S.divider(),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['blog', 'project', 'category', 'author', 'terminalStatus'].includes(item.getId()!),
      ),
    ])
