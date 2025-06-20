// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Campaign } from './collections/Campaign'
import { Websites } from './collections/Websites'
import { stripePlugin } from '@payloadcms/plugin-stripe'
import Transactions from './collections/Transactions'
import { stripeCheckout, webhooks } from './endpoints/stripe.handler'
import { Organization } from './collections/Organization'
import { websiteCharityData } from './endpoints/charity.handler'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailerSendgrid from 'nodemailer-sendgrid'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  i18n: {
    translations :{
      en : {
        general : {
          collections : 'Manage'
        }
      }
    }
  },
  email: nodemailerAdapter({
    defaultFromAddress: 'info@netset-charity.io',
    defaultFromName: 'Netset Charity',
    transportOptions: nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY || '',
    }),
  }),
  cors: '*',
  admin: {
    avatar : 'default',
    components: {
      graphics : {
        Logo : '@/components/Logo',
        Icon: '@/components/Icon',
      },
      // Nav: '@/components/MyCustomHeader',
      header : ['@/components/MyCustomHeader'],
      actions: ['@/components/MyCustomHeader'],
    },
    meta: {
      titleSuffix : '- netset charity',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/favicon.png',
        },
      ],
    },
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Media, Organization, Users, Campaign, Websites, Transactions ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    stripePlugin({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY!!,
      stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_ENDPOINT_SECRET,
      webhooks : webhooks
    }),
    // storage-adapter-placeholder
  ],
  endpoints: [
    stripeCheckout,
    websiteCharityData
  ]
})
