import { createRoute } from "@hono/zod-openapi";
import {
  FindByProductSchema,
  ProductsListResponseSchema,
} from "../domain/dtos/product-schema.dto.js";
import { ProductsController } from "./products.controller.js";
import { Context } from "hono";

const productController = new ProductsController();

export const findBy = createRoute({
  method: "post",
  path: "/products",
  tags: ["Products"],
  request: {
    query: FindByProductSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ProductsListResponseSchema,
        },
      },
      description: "Lista de productos optimizados para la Landing Page",
    },
  },
  description:
    "Obtiene los productos públicos de un seller de Mercado Libre y los devuelve limpios.",
});

export const productRoutes = {
  findBy: findBy,
};

export const productHandlers = {
  findBy: (c: Context) => productController.findBy(c) as any,
};
