import {IsNotEmpty, IsString} from 'class-validator'

export class CreateFavoriteArgsDto{
    @IsString()
    @IsNotEmpty()
    productId!: string;

}