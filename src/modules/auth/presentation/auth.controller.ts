import { Context } from "hono";
import { AuthService } from "../auth.service.js";
import { APIResponse } from "@core/decorators/api-response.js";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @APIResponse("URL de autorización generada correctamente")
  async getAuthorizationUrl(c: Context) {
    const query = c.req.valid("query" as never) as any;
    return this.authService.getAuthorizationUrl({
      client_id: query.client_id,
      redirect_url: query.redirect_url,
      provider: query.provider,
    });
  }
}
