import { serve } from "@hono/node-server";
import app from "@server/server.js";

const port = 3000;

console.log(`🚀 Server running on port ${port}`);
console.log(`📄 Docs available at http://localhost:${port}/docs`);

serve({
  fetch: app.fetch,
  port,
});
