import type { CollectionConfig } from 'payload'

export const Organization: CollectionConfig = {
  slug: 'organizations',
  admin: {
    useAsTitle: 'name',
    hideAPIURL: true
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ]
}
