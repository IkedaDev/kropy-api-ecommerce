import { CriteriaRequest } from "@core/criteria/schemas/criteria-request.schema.js";
import { Product } from "../domain/entities/product.entity.js";
import { ProductRepository } from "../domain/repository/product.repository.js";

interface ProductMLRepositoryProps {
  clientId: string;
  redirectUri: string;
}

export class ProductMLRepository implements ProductRepository {
  private readonly clientId: string;
  private readonly redirectUri: string;

  constructor(props: ProductMLRepositoryProps) {
    this.clientId = props.clientId;
    this.redirectUri = props.redirectUri;
  }

  private getToken() {}

  findBy(req: CriteriaRequest): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
}
