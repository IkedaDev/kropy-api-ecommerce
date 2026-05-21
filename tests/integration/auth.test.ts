import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
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

  describe("POST /v1/auth/token", () => {
    beforeEach(() => {
      vi.stubGlobal("fetch", vi.fn());
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it("should successfully exchange code for access token", async () => {
      const mockTokenResponse = {
        access_token: "APP_USR-1998488128186121-052020-2e6f48a8b99cc6367b0cb10d77923d6d-3404634724",
        token_type: "Bearer",
        expires_in: 21600,
        scope: "offline_access read write",
        user_id: 3404634724,
        refresh_token: "TG-6a0e585fa0571e000150880c-3404634724",
      };

      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockTokenResponse,
      });

      const res = await app.request("/v1/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: "TG-6a0e5815fb14810001f1ba42-3404634724",
          provider: "MERCADOLIBRE",
          grant_type: "authorization_code",
          client_id: "1998488128186121",
          client_secret: "QHZdvm69JfKt2oIYV3B2sqIMiiwwIshX",
          redirect_uri: "https://kropy.ikedadev.cl",
        }),
      });

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.message).toBe("Token obtenido correctamente");
      expect(json.data).toEqual(mockTokenResponse);

      // Verify fetch was called with the correct parameters
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.mercadolibre.com/oauth/token",
        expect.objectContaining({
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: expect.stringContaining("grant_type=authorization_code"),
        })
      );
    });

    it("should return validation error (400) if code is missing", async () => {
      const res = await app.request("/v1/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: "MERCADOLIBRE",
          grant_type: "authorization_code",
          client_id: "1998488128186121",
          client_secret: "QHZdvm69JfKt2oIYV3B2sqIMiiwwIshX",
          redirect_uri: "https://kropy.ikedadev.cl",
        }),
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.message).toContain("Error de Validación");
    });

    it("should return validation error (400) if redirect_uri is not a URL", async () => {
      const res = await app.request("/v1/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: "some-code",
          provider: "MERCADOLIBRE",
          grant_type: "authorization_code",
          client_id: "1998488128186121",
          client_secret: "QHZdvm69JfKt2oIYV3B2sqIMiiwwIshX",
          redirect_uri: "invalid-url",
        }),
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.message).toContain("Error de Validación");
    });
  });
});
