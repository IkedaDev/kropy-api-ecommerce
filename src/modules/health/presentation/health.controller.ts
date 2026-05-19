import { Context } from "hono";
import { HealthService } from "../health.service.js";
import { APIResponse } from "@core/decorators/api-response.js";

export class HealthController {
  constructor(private healthService: HealthService) {}

  @APIResponse("System is healthy")
  check(c: Context) {
    return this.healthService.getSystemStatus();
  }
}
