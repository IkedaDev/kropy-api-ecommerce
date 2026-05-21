import { CriteriaRequest } from "@core/criteria/schemas/criteria-request.schema.js";
import { Product } from "../domain/entities/product.entity.js";
import { ProductRepository } from "../domain/repository/product.repository.js";

abstract class FindProductUseCase {
  abstract execute(req: CriteriaRequest): Promise<Product[]>;
}

export class FindProduct implements FindProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  execute(req: CriteriaRequest): Promise<Product[]> {
    return this.productRepository.findBy(req);
  }
}
