import { uuid } from "drizzle-orm/pg-core";
import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: uuid()
    .$default(() => crypto.randomUUID())
    .notNull()
    .primaryKey(),

  content: text().notNull(),
  done: boolean().notNull().default(false),

  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
