import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {authorType} from './authorType'
import {projectType} from './project'
import blogType from './blogType'
import {certificationType} from './certification'
import {bannerType} from './banner'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, authorType, projectType, blogType, certificationType, bannerType],
}
