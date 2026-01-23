import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  @Get(':userId/favourites')
  getFavourites(@Param('userId', ParseIntPipe) userId: number) {
    try {
      return this.userService.getFavourites(userId);
    } catch (error) {
      return this.errorHandlerService.handleError(error);
    }
  }
}
