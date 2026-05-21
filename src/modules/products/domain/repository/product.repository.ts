import { CriteriaRequest } from "@core/criteria/schemas/criteria-request.schema.js";
import { Product } from "../entities/product.entity.js";

export abstract class ProductRepository {
  abstract findBy(req: CriteriaRequest): Promise<Product[]>;
}
