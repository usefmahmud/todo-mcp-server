import { eq, sql } from "drizzle-orm";
import { db, todos, type NewTodo, type Todo } from "../../db";
import { UUID } from "node:crypto";

export const createTodo = async (data: { content: string }): Promise<Todo> => {
  const [todo] = await db.insert(todos).values(data).returning();
  
  return todo;
};

export const getAllTodos = async (): Promise<Todo[]> => {
  return db.select().from(todos);
};

export const getTodoById = async (id: UUID): Promise<Todo | undefined> => {
  const [todo] = await db.select().from(todos).where(eq(todos.id, id));

  return todo;
};

export const updateTodoById = async (
  id: UUID,
  data: Partial<Pick<NewTodo, "content" | "done">>,
): Promise<Todo | undefined> => {
  const [todo] = await db
    .update(todos)
    .set({ ...data, updatedAt: sql`now()` })
    .where(eq(todos.id, id))
    .returning();

  return todo;
};

export const deleteTodoById = async (id: UUID): Promise<boolean> => {
  const deleted = await db
    .delete(todos)
    .where(eq(todos.id, id))
    .returning({ id: todos.id });

  return deleted.length > 0;
};
