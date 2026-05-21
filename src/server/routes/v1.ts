import { ApiResponse } from "@core/models/api-response.model.js";
import { OpenAPIHono } from "@hono/zod-openapi";
import {
  healthHandlers,
  healthRouter,
} from "@modules/health/presentation/health.routes.js";
import {
  productHandlers,
  productRoutes,
} from "@modules/products/presentation/product.routes.js";
import {
  authHandlers,
  authRoutes,
} from "@modules/auth/presentation/auth.routes.js";

import { generalLimiter } from "@server/middlewares/rate-limit.middleware.js";

const v1 = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      return ApiResponse.error(
        c,
        "Error de Validación (Datos inválidos)",
        result.error,
        400,
      );
    }
  },
});

v1.use("/*", generalLimiter);

// Health
v1.openapi(healthRouter.healthCheck, healthHandlers.healthCheck);

v1.openapi(productRoutes.findBy, productHandlers.findBy);

// Auth
v1.openapi(authRoutes.getAuthorizationUrl, authHandlers.getAuthorizationUrl);
v1.openapi(authRoutes.exchangeCodeForToken, authHandlers.exchangeCodeForToken);

export default v1;
