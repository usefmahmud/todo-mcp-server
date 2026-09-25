import z from "zod";
import { defineTool } from "../../../mcp/tool";
import { getAllTodos } from "../todo.repository";

const listTodosSchema = z.object({});

export const listTodosTool = defineTool({
  name: "list-todos",
  description: "List all todo items",
  inputSchema: listTodosSchema,
  handler: async () => {
    try {
      const todos = await getAllTodos();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(todos),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error listing todos: ${error}`,
          },
        ],
        isError: true,
      };
    }
  },
});
