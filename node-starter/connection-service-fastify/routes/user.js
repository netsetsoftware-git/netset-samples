const User = require('../models/user');

async function userRoutes(fastify, options) {
    fastify.post('/users', async (request, reply) => {
        const user = new User(request.body)
        const savedUser = await user.save()
        return { message: `User created.`, data : savedUser };
    });

    fastify.get('/users', async (request, reply) => {
        return User.find({}).sort({ createdAt: -1 });;
    });

    fastify.get('/users/:id', async (request, reply) => {
        const { id } = request.params;
        return User.findOne({_id : id});
    });

    fastify.put('/users/:id', async (request, reply) => {
        const { id } = request.params;
        const user = await User.findOneAndUpdate({_id : id}, request.body);
        return { message: `User Updated.`, data : user };
    });

    fastify.delete('/users/:id', async (request, reply) => {
        const { id } = request.params;
        await User.findOneAndDelete({_id : id})
        return { message: `User successfully deleted.` };
    });
}
  
module.exports = userRoutes;
  