import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    hidden :({ user }) => {
      return user?.role!='super_admin'
    }
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed

    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Super Admin', value: 'super_admin' },
        { label: 'Admin', value: 'admin' },
      ],
      required: true,
      access: {
        update: ({ req }) => {
          return false//Boolean(user)
        },
      }
    }
  ],
  access: {
    create : ({ req: { user } }) => {
      return user?.role=='super_admin'//Boolean(user)
    }, 
    unlock: ({ }) => {
      return false
    }
  }
}
