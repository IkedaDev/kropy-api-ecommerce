import "dotenv/config";
import env from "env-var";

export class Envs {
  static API_PUBLIC_PATH?: string = env.get("API_PUBLIC_PATH").asString();
  static NODE_ENV: string = env.get("NODE_ENV").required().asString();
}
