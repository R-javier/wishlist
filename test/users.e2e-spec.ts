import {Test, TestingModule} from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import {App} from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
let app: INestApplication<App>;
const userId = 1;
const testProductId = 'product-1';

beforeEach(async () => {
const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
}).compile();

app = moduleFixture.createNestApplication();
await app.init();
});

describe('GET /users/:userId/favourites', () => {
    it('Debe retornar la lista de favoritos del usuario', () => {
        return request(app.getHttpServer())
        .get(`/users/${userId}/favourites`)
        .expect(200)
        .expect((res) => {
            expect(Array.isArray(res.body)).toBe(true);
        });
    });


    it('Debe retornar error 400 si userId no es un número', () => {
        return request(app.getHttpServer())
        .get(`/users/abc/favourites`)
        .expect(400);
    });
});

describe('POST /users/:userId/favourites', () => {
    it('Debe crear un nuevo favorito correctamente', () => {
        return request(app.getHttpServer())
        .post(`/users/${userId}/favourites`)
        .send({ productId: testProductId })
        .expect(201)
        .expect((res) => {
            expect(res.body).toHaveProperty('userId');
            expect(res.body).toHaveProperty('productId');
            expect(res.body).toHaveProperty('createdAt');
            expect(res.body).toHaveProperty('product');
            expect(res.body.userId).toBe(userId);
            expect(res.body.productId).toBe(testProductId);
        });
    });

    it('Debe retornar error 409 si el favoritor ya existe', () => {
        return request(app.getHttpServer())
        .post(`/users/${userId}/favourites`)
        .send({ productId: testProductId })
        .then(() => {
            return request(app.getHttpServer())
            .post(`/users/${userId}/favourites`)
            .send({ productId: testProductId })
            .expect(409);
        });
    });

    it('Debe retornar error 404 si el producto no existe', () => {
        return request(app.getHttpServer())
        .post(`/users/${userId}/favourites`)
        .send({ productId: 'product-inexistente'})
        .expect(404);
    });

    it('Debe retornar error 400 si userId no es un número', () => {
        return request(app.getHttpServer())
        .post(`/users/abd/favourites`)
        .send({ productId: testProductId })
        .expect(400);
    });
});

describe('DELETE /users/:userId/favourites/:productId', () => {
    it('Debe eliminar un favorito correctamente', () => {
        return request(app.getHttpServer())
        .post(`/users/${userId}/favourites`)
        .send({ productId: testProductId })
        .then(() => {
            return request(app.getHttpServer())
            .delete(`/users/${userId}/favourites/${testProductId}`)
            .expect(204);
        });
    });

    it('Debe retornar error 404 si el favorito no existe', () => {
        return request(app.getHttpServer())
        .delete(`/users/${userId}/favourites/product-inexistente`)
        .expect(404);
    });
    
    it('Debe retornar error 400 si userId no es un número', () => {
        return request(app.getHttpServer())
        .delete(`/users/abc/favourites/${testProductId}`)
        .expect(400);
    });
});

afterEach(async () => {
    await app.close()
})
})