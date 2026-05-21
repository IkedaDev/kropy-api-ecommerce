import { AuthRepository } from "../domain/repository/auth.repository.js";

interface ExchangeCodeInput {
  client_id: string;
  client_secret: string;
  code: string;
  redirect_uri: string;
  grant_type: string;
}

abstract class ExchangeCodeForTokenUseCase {
  abstract execute(input: ExchangeCodeInput): Promise<any>;
}

export class ExchangeCodeForToken implements ExchangeCodeForTokenUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(input: ExchangeCodeInput): Promise<any> {
    return this.authRepository.exchangeCodeForToken({
      clientId: input.client_id,
      clientSecret: input.client_secret,
      code: input.code,
      redirectUri: input.redirect_uri,
      grantType: input.grant_type,
    });
  }
}
