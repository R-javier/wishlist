import { Body, Controller, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post(':userId/favourites')
  createFavourite(
    @Param('userId') userId: number,
    @Body('productId') productId: string,
  ) {
    console.log(userId);
    console.log(productId);

    return this.userService.createFavorite(Number(userId), productId);
  }
}
