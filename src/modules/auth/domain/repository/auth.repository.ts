export abstract class AuthRepository {
  abstract getAuthorizationUrl(clientId: string, redirectUrl: string): string;
  abstract exchangeCodeForToken(props: {
    clientId: string;
    clientSecret: string;
    code: string;
    redirectUri: string;
    grantType: string;
  }): Promise<any>;
}
