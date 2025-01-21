const { publishMessage } = require('../config/rabbitmq'); 

async function notifyRoutes(fastify, options) {
    fastify.post('/notify/:notificationType', async (request, reply) => {
        const notification = {
            ...request.body,
            notificationType : request.params.notificationType,
            connections : request.body.userIds
        }

        publishMessage(notification);
        return { message: `notification sent.`};
    });
}
  
module.exports = notifyRoutes;
  