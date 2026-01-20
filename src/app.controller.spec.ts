import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService, type Product } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return a product', () => {
      const result: Product = appController.getProduct();
       
      expect(result).toBeDefined();
    });
  });
});
