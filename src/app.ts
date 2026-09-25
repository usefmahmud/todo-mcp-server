import { createMcpFastifyApp } from "@modelcontextprotocol/fastify";
import { toNodeHandler } from "@modelcontextprotocol/node";
import { createMcpHandler, McpServer } from "@modelcontextprotocol/server";
import { todoTools } from "./modules/todo/use-cases";
import { registerMcpTools } from "./mcp/tool";

const handler = createMcpHandler(() => {
  const server = new McpServer(
    {
      name: "Todo MCP Server",
      version: "1.0.0",
    },
    {
      capabilities: { tools: {} },
    },
  );

  registerMcpTools(server, todoTools);

  return server;
});

const node = toNodeHandler(handler);

export const buildApp = () => {
  const app = createMcpFastifyApp({
    host: process.env.VERCEL ? "0.0.0.0" : "127.0.0.1",
  });

  app.all("/mcp", (request, reply) =>
    node(request.raw, reply.raw, request.body),
  );

  return app;
};
