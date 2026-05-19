import { rateLimiter } from "hono-rate-limiter";

export const generalLimiter = rateLimiter({
  windowMs: 60 * 1000,
  limit: 50,
  keyGenerator: (c) => c.req.header("x-forwarded-for") || "ip",
  message: { success: false, message: "Demasiadas peticiones, calma un poco." },
});
