import { AuthRepository } from "../domain/repository/auth.repository.js";
import { AuthMLRepository } from "./auth-ml.repository.js";

export class AuthRepositoryFactory {
  private static readonly repositories: Record<string, AuthRepository> = {
    MERCADOLIBRE: new AuthMLRepository(),
  };

  static getRepository(provider: string): AuthRepository {
    const repository = this.repositories[provider.toUpperCase()];
    if (!repository) {
      throw new Error(`No repository implementation found for provider: ${provider}`);
    }
    return repository;
  }
}
