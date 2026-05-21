import { AuthRepositoryFactory } from "./repository/auth-repository.factory.js";
import { GetAuthorizationUrl } from "./use-cases/get-authorization-url.use-case.js";
import { ExchangeCodeForToken } from "./use-cases/exchange-code-for-token.use-case.js";

export interface GetAuthorizationUrlDto {
  client_id: string;
  redirect_url: string;
  provider: string;
}

export interface ExchangeCodeForTokenDto {
  code: string;
  provider: string;
  grant_type: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
}

export class AuthService {
  getAuthorizationUrl(dto: GetAuthorizationUrlDto): { url: string } {
    // 1. Resolve the concrete repository using the factory
    const repository = AuthRepositoryFactory.getRepository(dto.provider);

    // 2. Instantiate and execute the use case
    const useCase = new GetAuthorizationUrl(repository);
    return useCase.execute(dto.client_id, dto.redirect_url);
  }

  async exchangeCodeForToken(dto: ExchangeCodeForTokenDto): Promise<any> {
    // 1. Resolve the concrete repository using the factory
    const repository = AuthRepositoryFactory.getRepository(dto.provider);

    // 2. Instantiate and execute the use case
    const useCase = new ExchangeCodeForToken(repository);
    return useCase.execute({
      client_id: dto.client_id,
      client_secret: dto.client_secret,
      code: dto.code,
      redirect_uri: dto.redirect_uri,
      grant_type: dto.grant_type,
    });
  }
}
