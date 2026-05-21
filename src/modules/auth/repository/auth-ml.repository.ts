import { AuthRepository } from "../domain/repository/auth.repository.js";
import { Envs } from "@core/adapters/envs.adapter.js";

export class AuthMLRepository implements AuthRepository {
  getAuthorizationUrl(clientId: string, redirectUrl: string): string {
    const baseUrl = Envs.MERCADOLIBRE_AUTH_URL;
    const params = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      redirect_uri: redirectUrl,
    });

    return `${baseUrl}?${params.toString()}`;
  }
}
