import type { UUID } from "node:crypto";
import z from "zod";
import { defineTool } from "../../../mcp/tool";
import { updateTodoById } from "../todo.repository";

const updateTodoSchema = z.object({
  id: z.uuid(),
  content: z.string().min(1).optional(),
  done: z.boolean().optional(),
});

export const updateTodoTool = defineTool({
  name: "update-todo",
  description: "Update a todo item's content and/or done status",
  inputSchema: updateTodoSchema,
  handler: async ({ id, content, done }) => {
    try {
      const todo = await updateTodoById(id, { content, done });

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
            text: `Error updating todo: ${error}`,
          },
        ],
        isError: true,
      };
    }
  },
});
