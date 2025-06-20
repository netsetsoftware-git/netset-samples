import { Endpoint, PayloadRequest } from "payload"
import ejs from 'ejs';
import path from 'path';

//just sample - unused
export const emailHander : Endpoint = {
    path: '/test-email',
    method: 'get',
    handler: async ({ payload } : PayloadRequest) => {
        try {

            console.log("sending mail")

            const templatePath = path.join(process.cwd(), 'src/templates/thankyou.ejs')
            const html = await ejs.renderFile(templatePath, { 
                name : 'Raul',
                amount: '10'
            });

            const email = await payload.sendEmail({
                to: 'muk214782@gmail.com',
                subject: 'This is a test email',
                html: html
            })
            
            console.log(email, "emailemailemail")

            return Response.json({}, {status: 200, statusText : "Sent"})
        } catch (error) {
            console.log(error);
            
            return Response.json({}, {status: 400, statusText : "not Sent"})
        }
    }
}