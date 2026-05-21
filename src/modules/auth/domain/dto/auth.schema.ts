import { z } from "@hono/zod-openapi";
import { createSuccessSchema } from "@core/models/api-response.model.js";

export const AuthorizationProviderSchema = z.enum(["MERCADOLIBRE"]).openapi({
  description: "El proveedor para el cual se genera la URL de autorización",
  example: "MERCADOLIBRE",
});

export const GetAuthorizationUrlQuerySchema = z.object({
  client_id: z.string().openapi({
    description: "Client ID del proveedor",
    example: "1998488128186121",
  }),
  redirect_url: z.string().url().openapi({
    description: "URI de redirección de retorno",
    example: "https://kropy.ikedadev.cl",
  }),
  provider: AuthorizationProviderSchema,
});

export const AuthorizationUrlDataSchema = z.object({
  url: z.string().url().openapi({
    description: "URL de autorización generada",
    example: "https://auth.mercadolibre.cl/authorization?response_type=code&client_id=1998488128186121&redirect_uri=https://kropy.ikedadev.cl",
  }),
});

export const AuthorizationUrlResponseSchema = createSuccessSchema(
  AuthorizationUrlDataSchema
).openapi("AuthorizationUrlResponse");
