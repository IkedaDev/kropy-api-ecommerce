import { AuthRepository } from "../domain/repository/auth.repository.js";

abstract class GetAuthorizationUrlUseCase {
  abstract execute(clientId: string, redirectUrl: string): { url: string };
}

export class GetAuthorizationUrl implements GetAuthorizationUrlUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  execute(clientId: string, redirectUrl: string): { url: string } {
    const url = this.authRepository.getAuthorizationUrl(clientId, redirectUrl);
    return { url };
  }
}
