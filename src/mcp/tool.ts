import type {
  McpServer,
  StandardSchemaWithJSON,
  ToolCallback,
} from "@modelcontextprotocol/server";

export interface McpToolDefinition<S extends StandardSchemaWithJSON> {
  name: string;
  description: string;
  inputSchema: S;
  handler: ToolCallback<S>;
}

export const defineTool = <S extends StandardSchemaWithJSON>(
  tool: McpToolDefinition<S>,
): McpToolDefinition<S> => tool;

const registerMcpTool = <S extends StandardSchemaWithJSON>(
  server: McpServer,
  tool: McpToolDefinition<S>,
): void => {
  server.registerTool(
    tool.name,
    { description: tool.description, inputSchema: tool.inputSchema },
    tool.handler,
  );
};

export const registerMcpTools = (
  server: McpServer,
  tools: McpToolDefinition<any>[],
) => {
  tools.forEach((tool) => registerMcpTool(server, tool));
};
