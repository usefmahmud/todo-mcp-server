# Todo MCP Server

A tiny todo MCP server, TypeScript, Fastify, PostgreSQL, and Drizzle ORM. Expose full todo CRUD to any MCP-capable client (Claude, opencode, Cursor, ...) over a single HTTP endpoint.

```bash
pnpm install && pnpm db:push && pnpm dev
```

## Features

Five tools, zero fluff:

| Tool          | Description                          | Inputs                      |
| ------------- | ------------------------------------ | --------------------------- |
| `add-todo`    | Add a todo item                      | `content`                   |
| `list-todos`  | List all todo items                  | —                           |
| `get-todo`    | Get a single todo by id              | `id` (UUID)                 |
| `update-todo` | Update content and/or done status    | `id`, `content?`, `done?`   |
| `delete-todo` | Delete a todo                        | `id` (UUID)                 |

Every tool validates input with Zod and returns structured JSON — errors come back as `isError` results, never crashes.

## ech Stack

- **[Fastify](https://fastify.dev)** — HTTP layer
- **[@modelcontextprotocol/*](https://modelcontextprotocol.io)** — server, fastify adapter, node handler
- **[Drizzle ORM](https://orm.drizzle.team)** + **PostgreSQL** — persistence
- **Zod** — tool input schemas

## Start

**Prerequisites:** Node.js 20+, [pnpm](https://pnpm.io), a PostgreSQL instance.

1. **Install**

   ```bash
   pnpm install

   cp .env.example .env # repalce DATABASE_URL with yours
   
   pnpm db:push
   
   pnpm dev
   ```
   Server listening at `http://127.0.0.1:8000` — MCP endpoint live at **`/mcp`**.

## onnect an MCP Client

The server speaks MCP over HTTP at `http://127.0.0.1:8000/mcp`.

**opencode**, add to `opencode.json`:

```json
{
  "mcp": {
    "todo": {
      "type": "remote",
      "url": "http://127.0.0.1:8000/mcp"
    }
  }
}
```

**Claude**, add to your MCP config:

```json
{
  "mcpServers": {
    "todo": {
      "command": "npx",
      "args": ["mcp-remote", "http://127.0.0.1:8000/mcp"]
    }
  }
}
```

Then ask your agent things like *"add a todo: buy milk"* or *"list my todos"*.

## Project Structure

```
src/
├── index.ts                 # Server entry (port, listen)
├── app.ts                   # Fastify app + MCP handler wiring
├── mcp/
│   └── tool.ts              # defineTool / registerMcpTools helpers
├── db/
│   ├── index.ts             # Drizzle client
│   └── schema.ts            # todos table
└── modules/todo/
    ├── todo.repository.ts   # Data access (CRUD)
    └── use-cases/           # One file per MCP tool + barrel export
```

