import { APIResponse } from "@core/decorators/api-response.js";
import { Context } from "hono";

export class ProductsController {
  constructor() {}

  @APIResponse({
    message: "Products retrieved successfully",
  })
  async findBy(c: Context) {
    const body = c.req.valid("json" as never);
    return body;
  }
}
