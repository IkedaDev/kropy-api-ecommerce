import { createRoute, z } from "@hono/zod-openapi";
import { HealthService } from "../health.service.js";
import { HealthController } from "./health.controller.js";
import { Context } from "hono";

const service = new HealthService();
const controller = new HealthController(service);

const healthCheckRoute = createRoute({
  method: "get",
  path: "/health",
  tags: ["System"],
  summary: "Check system health",
  description: "Returns the status of the server",
  responses: {
    200: {
      description: "System is up",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            data: z.object({
              status: z.string(),
              uptime: z.number(),
              system: z.string(),
            }),
            timestamp: z.string(),
          }),
        },
      },
    },
  },
});

export const healthRouter = { healthCheck: healthCheckRoute };
export const healthHandlers = {
  healthCheck: (c: Context) => controller.check(c) as any,
};
