export abstract class AuthRepository {
  abstract getAuthorizationUrl(clientId: string, redirectUrl: string): string;
}
