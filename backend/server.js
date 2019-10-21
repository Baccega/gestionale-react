const hostname = "0.0.0.0";
const port = 8080;
const allowed_origins = ["http://0.0.0.0:3000"];

const fastify = require("fastify")({ logger: true });

const start = async () => {
	try {
		fastify.register(require("fastify-cors"), {
			origin: allowed_origins
		});

		fastify.register(require("./routes"), { prefix: "/v1" });

		await fastify.listen(port, hostname);

		fastify.log.info(`server listening on ${fastify.server.address().port}`);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();