import {IsNotEmpty, IsString, IsInt} from 'class-validator'

export class CreateFavoriteDto{
    @IsString()
    @IsNotEmpty()
    productId!: string;

}