import { Test, TestingModule } from '@nestjs/testing';
import {
  HttpException,
  BadRequestException,
  NotFoundException,
  RequestTimeoutException,
  ServiceUnavailableException,
  INestApplication,
  Module,
} from '@nestjs/common';
import { ProductsController } from './../src/products/products.controller';
import { ProductsService } from '../src/products/products.service';
import { HttpService } from '@nestjs/axios';
import { throwError, of } from 'rxjs';
import { AxiosError } from 'axios';
import { ProductDTO } from './../src/dto/product.dto';
import { ErrorHandlerService } from './../src/error-handler/error-handler.service';
import { ConfigService } from '@nestjs/config';
import * as db from './../external-service/db.json';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;
  let httpService: HttpService;
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        ErrorHandlerService,
        { provide: HttpService, useValue: { get: jest.fn() } },
        { provide: ConfigService, useValue: { get: jest.fn() } },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
    httpService = module.get<HttpService>(HttpService);

    app = module.createNestApplication();
    app.init();
  });

  afterAll(async () => {
    await app.close();
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the service default message for 400', async () => {
    const axiosError = {
      response: {
        status: 400,
        data: {},
      },
      isAxiosError: true,
    } as AxiosError;

    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(throwError(() => axiosError));

    await expect(controller.getProducts()).rejects.toThrow(
      new BadRequestException('Solicitud inválida al servicio de catálogo'),
    );
  });

  it('should return the service default message for 404', async () => {
    const axiosError = {
      response: {
        status: 404,
        data: {},
      },
      isAxiosError: true,
    } as AxiosError;

    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(throwError(() => axiosError));

    await expect(controller.getProducts()).rejects.toThrow(
      new NotFoundException(
        'No se encontraron productos en el servicio de catálogo',
      ),
    );
  });
  it('should return the service default message for 408', async () => {
    const axiosError = {
      response: {
        status: 408,
        data: {},
      },
      isAxiosError: true,
    } as AxiosError;

    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(throwError(() => axiosError));

    await expect(controller.getProducts()).rejects.toThrow(
      new RequestTimeoutException(
        'El servicio de catálogo tardó demasiado en responder',
      ),
    );
  });
  it('should return the service default message for 504', async () => {
    const axiosError = {
      response: {
        status: 504,
        data: {},
      },
      isAxiosError: true,
    } as AxiosError;

    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(throwError(() => axiosError));

    await expect(controller.getProducts()).rejects.toThrow(
      new ServiceUnavailableException(
        'El servicio de catálogo no está disponible en este momento',
      ),
    );
  });
  it('should return the service default message unhandled errors', async () => {
    const axiosError = {
      response: {
        status: 451,
        data: {},
      },
      isAxiosError: true,
    } as AxiosError;

    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(throwError(() => axiosError));

    await expect(controller.getProducts()).rejects.toThrow(
      new HttpException('Error inesperado del servicio de catálogo', 500),
    );
  });
  it('should return a list of products', async () => {
    const productsData = db.products;

    const axiosResponse = {
      data: productsData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of(axiosResponse as any));

    const products = await controller.getProducts();

    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBe(productsData.length);
  });
});
