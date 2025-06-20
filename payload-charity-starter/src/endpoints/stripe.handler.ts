import ejs from 'ejs';
import path from 'path';
import { Campaign, Organization } from '@/payload-types'
import { StripeWebhookHandlers } from '@payloadcms/plugin-stripe/types'
import { Endpoint, PayloadRequest } from 'payload'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-08-01',
  })

export const stripeCheckout : Endpoint = {
    path: '/create-checkout-session',
    method: 'get',
    handler: async ({ payload, query } : PayloadRequest) => {
        try {
            const webClientId = String(query.webClient)
            const webClient = await payload.findByID({ collection: 'websites', id : webClientId })
            if(!webClient.enabled) {
              return Response.json({}, {status: 400, statusText : "Website is disabled."})
            }
            const session = await stripe.checkout.sessions.create({
                mode: 'payment',
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Charity',
                        },
                        unit_amount: Number(query.amount) * 100,
                        },
                        quantity: 1,
                    },
                ],
                metadata: { webClient : webClientId },
                success_url: `${query.domain}?status=success`,
                cancel_url: `${query.domain}?status=cancel`,
            })
        
            return Response.json({url: session.url}, {status: 200})
        } catch (err) {
            console.error(err)
            return Response.json({ error: 'Failed to create checkout session' }, { status: 500})
        }    
    } 
}

export const webhooks : StripeWebhookHandlers = {
    
    'checkout.session.completed': async ({ req, payload, event }) => {
      const session = event.data.object as Stripe.Checkout.Session
      
      const website = await req.payload.findByID({ collection: 'websites', id : String(session.metadata?.webClient) })
      const campaign = website.campaign as Campaign
      const organization = campaign.organization as Organization

      const email = session.customer_details?.email || ''
      const customerName = session.customer_details?.name || ''
      const amount = (session.amount_total && session.amount_total / 100) || 0

      await req.payload.create({
        collection: 'transactions',
        data: {
          stripeSessionId: session.id,
          paymentIntent: session.payment_intent?.toString(),
          email: email,
          customerName : customerName,
          amountTotal: amount,
          currency: session.currency || '',
          status: session.payment_status,
          website: website.id,
          campaign: campaign.id,
          organization: organization.id,
          metadata: session.metadata,    
        },
      })

      try {
        const templatePath = path.join(process.cwd(), 'src/templates/thankyou.ejs')
        const html = await ejs.renderFile(templatePath, { 
            name : customerName,
            amount: amount
        });

        payload.sendEmail({
            to: email,
            subject: 'Thank you - Netset Charity',
            html: html
        })//fire and forget 
      } catch (error) {
        console.log(error);
      }

      Response.json("OK", {status: 200})
    },
    'payment_intent.payment_failed': async ({ req, event }) => {
      const session = event.data.object as Stripe.PaymentIntent
      
      await req.payload.create({
        collection: 'transactions',
        data: {
          stripeSessionId: session.id,
          paymentIntent: 'NA',
          email: session.last_payment_error?.payment_method?.billing_details.email || '',
          customerName : session.last_payment_error?.payment_method?.billing_details.name || '',
          amountTotal: session.amount && session.amount / 100,
          currency: session.currency,
          status: 'unpaid',
          website: session.metadata?.webClient,
          metadata: {
            charge: session.last_payment_error?.charge,
            code: session.last_payment_error?.code,
            decline_code: session.last_payment_error?.decline_code,
            doc_url: session.last_payment_error?.doc_url,
            message: session.last_payment_error?.message
          },
        },
      })

      Response.json("OK", {status: 200})
    },
}