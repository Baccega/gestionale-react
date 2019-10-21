const handler_v1 = async (request, reply) => {
	reply.send({ hello: "world" });
};

module.exports = function(fastify, opts, done) {
	fastify.get("/", handler_v1);
	done();
};
