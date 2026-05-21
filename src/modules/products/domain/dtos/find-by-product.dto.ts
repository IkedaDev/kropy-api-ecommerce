import z from "zod";
import { FindByProductSchema } from "./product-schema.dto.js";

export type FindByProductDTO = z.infer<typeof FindByProductSchema>;
