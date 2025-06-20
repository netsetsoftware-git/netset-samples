import { Campaign, Media, Organization } from '@/payload-types'
import { Endpoint, PayloadRequest } from 'payload'

export const websiteCharityData : Endpoint = {
    path: '/websites-charity-data/:id',
    method: 'get',
    handler: async ({ payload, user, routeParams } : PayloadRequest) => {
        try {
          const webClientId = String(routeParams?.id)
          const webClient = await payload.findByID({ collection: 'websites', id : webClientId })
          const campaign = webClient.campaign as Campaign
          const logoId = String((campaign.organization as Organization).logo)
          const orgLogo = await payload.findByID({ collection: 'media', id : logoId })

          if(!webClient.enabled) {
            return Response.json({}, {status: 400, statusText : "Website is disabled."})
          }
          
          return Response.json({
            websiteId : webClient.id,
            orgLogo : orgLogo.url,
            title : campaign.title,
            description : campaign.description,
            donations : webClient.donationAmounts?.map(donation => donation.donationAmount),
            image : (campaign.image as Media).url,
          }, {status: 200})
        } catch (err) {
            console.error(err)
            return Response.json({ error: 'Failed to create checkout session' }, { status: 500})
        }    
    } 
}