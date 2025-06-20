import type { CollectionConfig } from 'payload'

export const Websites: CollectionConfig = {
  slug: 'websites',
  labels: {
    singular: 'Website',
    plural: 'Websites',
  },
  admin: {
    useAsTitle: 'url',
    description: "The websites which will be using plugin for charity.",
    components: {
      Description: '@/components/IntegrationInstructions#IntegrationInstructions'
    },
    hideAPIURL: true
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'owner',
          label: 'Website Owner Name',
          type: 'text',
          required: true,
        },
        {
          name: 'campaign',
          type: 'relationship',
          relationTo: 'campaigns',
          required: true,
        }
      ]
    },
    {
      name: 'donationAmounts',
      type: 'array',
      defaultValue: [{ donationAmount :5 }, { donationAmount : 10 },{ donationAmount : 100 }],
      fields :[
        {
          name: 'donationAmount',
          type: 'number',
          required: true
        }
      ]
    },
    {
      name: 'enabled',
      type: 'checkbox',
      required: true,
      defaultValue: true
    },
    {
      name: 'remarks',
      type: 'textarea',
      required: false,
    },
  ]
}
