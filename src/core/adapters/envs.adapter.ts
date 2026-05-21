import "dotenv/config";
import env from "env-var";

export class Envs {
  static API_PUBLIC_PATH?: string = env.get("API_PUBLIC_PATH").asString();
  static NODE_ENV: string = env.get("NODE_ENV").required().asString();
  static MERCADOLIBRE_AUTH_URL: string = env.get("MERCADOLIBRE_AUTH_URL").required().asString();
}
