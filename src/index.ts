import Fastify from "fastify";

const fastify = Fastify();

const PORT = process.env.PORT;

fastify.get("/ping", async (_request, _reply) => {
  return "pong\n";
});

fastify.listen({ port: parseInt(PORT!) }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
