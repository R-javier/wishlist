import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import  request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Products (e2e)', () => {
    let app: INestApplication;
    const testProductId = 'p-1203';

    beforeAll(async() => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async() => {
        await app.close();
    });

    it('GET /products - respond  200', async () => {
        const res = await request(app.getHttpServer())
        .get('/products');
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
    })

    it('GET /products/:id - respond 200', async () => {
        const res = await request(app.getHttpServer())
        .get(`/products/${testProductId}`);
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body.id).toBe(testProductId);
    });
});