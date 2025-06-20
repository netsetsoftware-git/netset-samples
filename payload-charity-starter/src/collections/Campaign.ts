import type { CollectionConfig } from 'payload'

export const Campaign: CollectionConfig = {
  slug: 'campaigns',
  admin: {
    useAsTitle: 'title',
    hideAPIURL: true
  },
  fields: [
    {
      name: 'organization',
      type: 'relationship',
      relationTo: 'organizations',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ]
  /*,
  access : {
    read: ({ req }) => {//allow public access to get by id only
      if(req.routeParams?.id) return true
      return Boolean(req.user)
    }
  }*/
}
