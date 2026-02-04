import { ProductDTO } from './product.dto';

export class CreateFavouriteDTO {
  user_id: number;
  product_external_id: string;
  created_at: Date;
  product: {
    title: string;
    price: number;
  };

  constructor(row: any, product: ProductDTO) {
    this.user_id = row.user_id;
    this.product_external_id = row.product_external_id;
    this.created_at = row.createdAt;
    this.product = {
      title: product.title,
      price: product.price,
    };
  }
}
