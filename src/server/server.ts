import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { swaggerUI } from "@hono/swagger-ui";
import { Envs } from "@core/adapters/envs.adapter.js";
import v1 from "./routes/v1.js";

const app = new OpenAPIHono();
const publicPath = Envs.API_PUBLIC_PATH || "";

app.use(
  "/*",
  cors({
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.use(logger());

app.route("/v1", v1);

app.openAPIRegistry.registerComponent("securitySchemes", "BearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
  description: "Ingresa tu token JWT para acceder a los endpoints protegidos",
});

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Kropy API",
    description: "Backend de Kropy ",
  },
  servers: [
    {
      url: `${publicPath}`, // Esto le dice a Scalar: "Todas las peticiones empiezan con /anami"
      description: "Servidor Principal",
    },
  ],
});

app.get(
  "/docs",
  swaggerUI({
    url: `${publicPath}/doc`,
  }),
);
app.get("", (c) => c.redirect("/docs"));

export default app;
