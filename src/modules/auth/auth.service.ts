export interface GetAuthorizationUrlDto {
  client_id: string;
  redirect_url: string;
  provider: "MERCADOLIBRE";
}

export class AuthService {
  getAuthorizationUrl(dto: GetAuthorizationUrlDto): { url: string } {
    const { client_id, redirect_url, provider } = dto;

    if (provider === "MERCADOLIBRE") {
      const baseUrl = "https://auth.mercadolibre.cl/authorization";
      const params = new URLSearchParams({
        response_type: "code",
        client_id,
        redirect_uri: redirect_url,
      });

      return {
        url: `${baseUrl}?${params.toString()}`,
      };
    }

    throw new Error(`Unsupported provider: ${provider}`);
  }
}
