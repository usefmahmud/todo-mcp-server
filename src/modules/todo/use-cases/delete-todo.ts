import type { UUID } from "node:crypto";
import z from "zod";
import { defineTool } from "../../../mcp/tool";
import { deleteTodoById } from "../todo.repository";

const deleteTodoSchema = z.object({
  id: z.uuid(),
});

export const deleteTodoTool = defineTool({
  name: "delete-todo",
  description: "Delete a todo item by id",
  inputSchema: deleteTodoSchema,
  handler: async ({ id }) => {
    try {
      const deleted = await deleteTodoById(id);

      if (!deleted) {
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
            text: JSON.stringify({ id, deleted: true }),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error deleting todo: ${error}`,
          },
        ],
        isError: true,
      };
    }
  },
});
