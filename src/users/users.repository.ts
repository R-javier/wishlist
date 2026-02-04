import { Injectable, ConflictException } from '@nestjs/common';
import { pool } from 'src/commons/database/db';
import { NotFoundException } from '@nestjs/common';
import { FavouriteModel } from 'src/commons/sequelize/models/favourite_model';
import { Op } from 'sequelize';

@Injectable()
export class UsersRepository {
  constructor() {}

  async getFavouriteQuery(userId: number, productId: string) {
    const result = await FavouriteModel.findOne({
      where: {
        user_id: userId,
        product_external_id: productId,
      },
    });

    return result;
  }

  async restoreFavourite(userId: number, productId: string) {
    const result = await FavouriteModel.findOne({
      paranoid: false,
      where: {
        user_id: userId,
        product_external_id: productId,
        deleted_at: {
          [Op.not]: null,
        },
      },
    });
    if (!result) {
      return null;
    }
    await result.restore();
    return result;
  }

  async getFavouritesQuery(userId: number) {
    const favourites = await FavouriteModel.findAll({
      where: {
        user_id: userId,
      },
    });

    return favourites;
  }
  
  async createFavourite(userId: number, productId: string) {
    return FavouriteModel.create({
      user_id: userId,
      product_external_id: productId,
    });
  }

  async deleteFavoriteQuery(userId: number, productId: string) {
    const result = await FavouriteModel.destroy({
      where: {
        user_id: userId,
        product_external_id: productId,
      },
    });
    return result;
  }
}
