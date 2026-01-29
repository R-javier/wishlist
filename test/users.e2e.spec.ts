import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication<App>;
  const userId = 200;
  const testProductId = 'p-1200';

  console.log('URL DEL CATALOGO EN TEST:', process.env.CATALOG_SERVICE_URL);
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  describe('GET /users/:userId/favourites', () => {
    it('Debe retornar la lista de favoritos del usuario', async () => {
      const response = await request(app.getHttpServer()).get(
        `/users/${userId}/favourites`,
      );

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
    it('Debe retornar error 400 si userId no es un número', async () => {
      const response = await request(app.getHttpServer()).get(
        `/users/abc/favourites`,
      );

      expect(response.status).toBe(400);
    });
  });

  describe('POST /users/:userId/favourites', () => {
    it('Debe crear un nuevo favorito correctamente', async () => {
      const response = await request(app.getHttpServer())
        .post(`/users/${userId}/favourites`)
        .send({ productId: testProductId });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('userId');
      expect(response.body).toHaveProperty('productId');
      // expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('product');
      expect(response.body.userId).toBe(userId);
      expect(response.body.productId).toBe(testProductId);
    });

    it('Debe retornar error 409 si el favoritor ya existe', async () => {
      await request(app.getHttpServer())
        .post(`/users/${userId}/favourites`)
        .send({ productId: testProductId });

      const response = await request(app.getHttpServer())
        .post(`/users/${userId}/favourites`)
        .send({ productId: testProductId });

      expect(response.status).toBe(409);
    });
    it('Debe retornar error 404 si el producto no existe', async () => {
      const response = await request(app.getHttpServer())
        .post(`/users/${userId}/favourites`)
        .send({ productId: 'product-inexistente' });

      expect(response.status).toBe(404);
    });
    it('Debe retornar error 400 si userId no es un número', async () => {
      const response = await request(app.getHttpServer())
        .post(`/users/abd/favourites`)
        .send({ productId: testProductId });

      expect(response.status).toBe(400);
    });
  });
  describe('DELETE /users/:userId/favourites/:productId', () => {
    it('Debe eliminar un favorito correctamente', async () => {
      await request(app.getHttpServer())
        .post(`/users/${userId}/favourites`)
        .send({ productId: testProductId });

      const response = await request(app.getHttpServer()).delete(
        `/users/${userId}/favourites/${testProductId}`,
      );

      expect(response.status).toBe(204);
    });

    it('Debe retornar error 404 si el favorito no existe', async () => {
      const response = await request(app.getHttpServer()).delete(
        `/users/${userId}/favourites/product-inexistente`,
      );

      expect(response.status).toBe(404);
    });

    it('Debe retornar error 400 si userId no es un número', async () => {
      const response = await request(app.getHttpServer()).delete(
        `/users/abc/favourites/${testProductId}`,
      );

      expect(response.status).toBe(400);
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
