const fastify = require('fastify')({ logger: true });
const fastifyCors = require('@fastify/cors');

const connectDB = require('./config/db');
const { connectRabbitMQ } = require('./config/rabbitmq');

connectDB();

const userRoutes = require('./routes/user');
const notifyRoutes = require('./routes/notify');

fastify.register(fastifyCors, { 
  origin: '*'
});

fastify.register(userRoutes);
fastify.register(notifyRoutes);

fastify.get('/', async () => {
  return { message: 'Server running!!' };
});


fastify.addHook('onClose', async (instance, done) => {
    await mongoose.disconnect();
    done();
});

const start = async () => {
  try {
    await connectRabbitMQ(); 
    await fastify.listen({ port: 3000 })
    console.log('Server listening on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
