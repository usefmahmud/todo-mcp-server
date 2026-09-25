import { buildApp } from "./app";

const PORT = Number(process.env.PORT ?? 8000);

const app = buildApp();

app.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
