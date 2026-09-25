import z from "zod";
import { defineTool } from "../../../mcp/tool";
import { createTodo } from "../todo.repository";

const addTodoSchema = z.object({
  content: z.string().min(1, "Content is required"),
});

export const addTodoTool = defineTool({
  name: "add-todo",
  description: "Add a todo item",
  inputSchema: addTodoSchema,
  handler: async ({ content }) => {
    try {
      const todo = await createTodo({ content });
      
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
            text: `Error adding todo: ${error}`,
          },
        ],
        isError: true,
      };
    }
  },
});
