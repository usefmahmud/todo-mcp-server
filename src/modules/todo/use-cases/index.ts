import { addTodoTool } from "./add-todo";
import { deleteTodoTool } from "./delete-todo";
import { getTodoTool } from "./get-todo";
import { listTodosTool } from "./list-todos";
import { updateTodoTool } from "./update-todo";

export const todoTools = [
  addTodoTool,
  listTodosTool,
  getTodoTool,
  updateTodoTool,
  deleteTodoTool,
];
