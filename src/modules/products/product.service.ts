import { ProductMLRepository } from "./repository/product-ml.repository.js";

export class ProductService {
  private readonly productRepository = new ProductMLRepository({
    clientId: "",
    redirectUri: "",
  });

  findBy() {}
}
