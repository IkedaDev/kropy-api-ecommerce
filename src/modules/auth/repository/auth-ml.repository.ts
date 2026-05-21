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

  async exchangeCodeForToken(props: {
    clientId: string;
    clientSecret: string;
    code: string;
    redirectUri: string;
    grantType: string;
  }): Promise<any> {
    const baseUrl = Envs.MERCADOLIBRE_API_URL;
    const response = await fetch(`${baseUrl}/oauth/token`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: props.grantType,
        client_id: props.clientId,
        client_secret: props.clientSecret,
        code: props.code,
        redirect_uri: props.redirectUri,
      }).toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error en intercambio de token con Mercado Libre: ${response.statusText} - ${errorText}`);
    }

    return await response.json();
  }
}
