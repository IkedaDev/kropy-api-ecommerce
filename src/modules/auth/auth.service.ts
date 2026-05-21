import { AuthRepositoryFactory } from "./repository/auth-repository.factory.js";
import { GetAuthorizationUrl } from "./use-cases/get-authorization-url.use-case.js";

export interface GetAuthorizationUrlDto {
  client_id: string;
  redirect_url: string;
  provider: string;
}

export class AuthService {
  getAuthorizationUrl(dto: GetAuthorizationUrlDto): { url: string } {
    // 1. Resolve the concrete repository using the factory
    const repository = AuthRepositoryFactory.getRepository(dto.provider);

    // 2. Instantiate and execute the use case
    const useCase = new GetAuthorizationUrl(repository);
    return useCase.execute(dto.client_id, dto.redirect_url);
  }
}
