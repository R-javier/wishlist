import { UUID } from 'crypto';

export class FavouriteDTO {
  id: UUID;
  user_id: number;
  product_external_id: string;
  created_at: Date;
}
