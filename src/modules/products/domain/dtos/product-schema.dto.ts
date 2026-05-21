import { CriteriaRequestSchema } from "@core/criteria/schemas/criteria-request.schema.js";
import { z } from "@hono/zod-openapi";

// Lo que el frontend de Astro enviará a tu API de Kropy
export const FindByProductSchema = z.object({
  meta: z.object({
    seller_id: z.string().openapi({
      example: "123456789",
      description: "El ID de vendedor del cliente en Mercado Libre",
    }),
  }),
  query: CriteriaRequestSchema,
});

// El formato premium, estandarizado y limpio que Kropy le devolverá a Astro
export const ProductResponseSchema = z
  .object({
    id: z.string().openapi({ example: "MLC14029312" }),
    title: z
      .string()
      .openapi({ example: "Mantención de Suspensión Bicicleta Sport" }),
    price: z.number().openapi({ example: 45000 }),
    currency: z.string().openapi({ example: "CLP" }),
    permalink: z
      .string()
      .openapi({ example: "https://articulo.mercadolibre.cl/..." }),
    thumbnail: z
      .string()
      .openapi({ example: "https://http2.mlstatic.com/D_NQ_NP_2X_736..." }),
    available_quantity: z.number().openapi({ example: 5 }),
  })
  .openapi("Product");

export const ProductsListResponseSchema = z
  .object({
    success: z.boolean().openapi({ example: true }),
    products: z.array(ProductResponseSchema),
  })
  .openapi("ProductsListResponse");
