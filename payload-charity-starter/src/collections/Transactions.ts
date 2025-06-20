import type { CollectionConfig } from 'payload'

export const Transactions: CollectionConfig = {
  slug: 'transactions',
  admin: {
    useAsTitle: 'email',
    hideAPIURL: true,
    description: "Here you can analyze the donations made for a charity campaign.",
  },
  access: {
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'organization',
      type: 'relationship',
      relationTo: 'organizations'
    },
    {
      name: 'campaign',
      type: 'relationship',
      relationTo: 'campaigns'
    },
    {
      name: 'website',
      type: 'relationship',
      relationTo: 'websites'
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'customerName',
      type: 'text',
      required: true,
    },
    {
      name: 'currency',
      type: 'text',
      required: true,
    },
    {
      name: 'amountTotal',
      type: 'number',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['no_payment_required', 'paid', 'unpaid'],
      required: true,
    },
    {
      name: 'paymentIntent',
      type: 'text',
    },
    {
      name: 'stripeSessionId',
      type: 'text',
      unique: true,
    },
    {
      name: 'metadata',
      type: 'json',
      hidden: true
    }
  ]
}

export default Transactions
