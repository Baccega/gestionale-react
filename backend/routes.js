const root = async (request, reply) => {
	reply.send({ hello: "world" });
};

module.exports = function(fastify, opts, done) {
	fastify.get("/", root);
	fastify.get("/colori", async (request, reply) => {
		const client = await fastify.pg.connect();
		const { rows } = await client.query("SELECT * FROM colori");
		client.release();
		return rows;
	});
	fastify.post("/aziende", async (request, reply) => {
		const client = await fastify.pg.connect();
		const { rows } = await client.query("SELECT * FROM aziende");
		client.release();
		return rows;
	});
	done();
};
