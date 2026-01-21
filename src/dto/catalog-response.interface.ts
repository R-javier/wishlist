import { ProductDTO } from "./product.dto";

export interface CatalogResponse {
  health: {
    status: string;
    service: string;
    products: number;
  };
  products: ProductDTO[]; 
}