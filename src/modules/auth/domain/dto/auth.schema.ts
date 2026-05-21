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

export const ExchangeCodeForTokenBodySchema = z.object({
  code: z.string().openapi({
    description: "El código de autorización devuelto por el proveedor",
    example: "TG-6a0e5815fb14810001f1ba42-3404634724",
  }),
  provider: AuthorizationProviderSchema,
  grant_type: z.enum(["authorization_code"]).openapi({
    description: "Tipo de concesión de OAuth",
    example: "authorization_code",
  }),
  client_id: z.string().openapi({
    description: "Client ID del proveedor",
    example: "1998488128186121",
  }),
  client_secret: z.string().openapi({
    description: "Client Secret del proveedor",
    example: "QHZdvm69JfKt2oIYV3B2sqIMiiwwIshX",
  }),
  redirect_uri: z.string().url().openapi({
    description: "URI de redirección coincidente",
    example: "https://kropy.ikedadev.cl",
  }),
});

export const TokenDataSchema = z.object({
  access_token: z.string().openapi({
    description: "Token de acceso OAuth",
    example: "APP_USR-1998488128186121-052020-2e6f48a8b99cc6367b0cb10d77923d6d-3404634724",
  }),
  token_type: z.string().openapi({
    description: "Tipo de token devuelto",
    example: "Bearer",
  }),
  expires_in: z.number().openapi({
    description: "Segundos restantes hasta que el token expire",
    example: 21600,
  }),
  scope: z.string().openapi({
    description: "Permisos concedidos",
    example: "offline_access read write",
  }),
  user_id: z.number().openapi({
    description: "ID de usuario del proveedor",
    example: 3404634724,
  }),
  refresh_token: z.string().optional().openapi({
    description: "Token de actualización (refresh token) si aplica",
    example: "TG-6a0e585fa0571e000150880c-3404634724",
  }),
});

export const TokenResponseSchema = createSuccessSchema(
  TokenDataSchema
).openapi("TokenResponse");
