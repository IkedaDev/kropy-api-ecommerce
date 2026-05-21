import { describe, it, expect } from "vitest";
import app from "../../src/server/server.js";

describe("Auth Module Integration Tests", () => {
  describe("GET /v1/auth/authorization", () => {
    it("should successfully generate a Mercado Libre authorization URL with valid inputs", async () => {
      const res = await app.request(
        "/v1/auth/authorization?client_id=1998488128186121&redirect_url=https://kropy.ikedadev.cl&provider=MERCADOLIBRE"
      );

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.message).toBe("URL de autorización generada correctamente");
      expect(json.data.url).toBe(
        "https://auth.mercadolibre.cl/authorization?response_type=code&client_id=1998488128186121&redirect_uri=https%3A%2F%2Fkropy.ikedadev.cl"
      );
    });

    it("should return a validation error (400) if provider is not MERCADOLIBRE", async () => {
      const res = await app.request(
        "/v1/auth/authorization?client_id=1998488128186121&redirect_url=https://kropy.ikedadev.cl&provider=INVALID_PROVIDER"
      );

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.message).toContain("Error de Validación");
    });

    it("should return a validation error (400) if redirect_url is not a valid URL", async () => {
      const res = await app.request(
        "/v1/auth/authorization?client_id=1998488128186121&redirect_url=invalid-url&provider=MERCADOLIBRE"
      );

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.message).toContain("Error de Validación");
    });

    it("should return a validation error (400) if parameters are missing", async () => {
      const res = await app.request(
        "/v1/auth/authorization?provider=MERCADOLIBRE"
      );

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.message).toContain("Error de Validación");
    });
  });
});
