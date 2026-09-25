import type { UUID } from "node:crypto";
import z from "zod";
import { defineTool } from "../../../mcp/tool";
import { getTodoById } from "../todo.repository";

const getTodoSchema = z.object({
  id: z.uuid(),
});

export const getTodoTool = defineTool({
  name: "get-todo",
  description: "Get a todo item by id",
  inputSchema: getTodoSchema,
  handler: async ({ id }) => {
    try {
      const todo = await getTodoById(id);

      if (!todo) {
        return {
          content: [
            {
              type: "text",
              text: `Todo not found: ${id}`,
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(todo),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error getting todo: ${error}`,
          },
        ],
        isError: true,
      };
    }
  },
});
