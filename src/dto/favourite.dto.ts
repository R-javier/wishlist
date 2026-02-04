export class FavouriteDTO {
  id: number;
  user_id: number;
  product_external_id: string;
  created_at: Date;
  active: boolean;

  constructor(row: any) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.product_external_id = row.product_external_id;
    this.created_at = row.createdAt;
  }
}
