import { createRoute } from "@hono/zod-openapi";
import { GetAuthorizationUrlQuerySchema, AuthorizationUrlResponseSchema } from "../domain/dto/auth.schema.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "../auth.service.js";
import { Context } from "hono";

const authService = new AuthService();
const authController = new AuthController(authService);

export const getAuthorizationUrlRoute = createRoute({
  method: "get",
  path: "/auth/authorization",
  tags: ["Auth"],
  summary: "Get provider authorization URL",
  description: "Generates the URL to redirect the client for provider authentication (e.g. Mercado Libre)",
  request: {
    query: GetAuthorizationUrlQuerySchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: AuthorizationUrlResponseSchema,
        },
      },
      description: "URL de autorización generada con éxito",
    },
  },
});

export const authRoutes = {
  getAuthorizationUrl: getAuthorizationUrlRoute,
};

export const authHandlers = {
  getAuthorizationUrl: (c: Context) => authController.getAuthorizationUrl(c) as any,
};
