import { Test, TestingModule } from '@nestjs/testing';
import {
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  RequestTimeoutException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ProductsController } from './../src/products/products.controller';
import { ProductsService } from '../src/products/products.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        { provide: HttpService, useValue: { get: jest.fn() } },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
    httpService = module.get<HttpService>(HttpService);
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

    try {
      await controller.getProducts();
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Solicitud inválida al servicio de catálogo');
    }
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

    try {
      await controller.getProducts();
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe(
        'No se encontraron productos en el servicio de catálogo',
      );
    }
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

    try {
      await controller.getProducts();
    } catch (error) {
      expect(error).toBeInstanceOf(RequestTimeoutException);
      expect(error.message).toBe(
        'El servicio de catálogo tardó demasiado en responder',
      );
    }
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

    try {
      await controller.getProducts();
    } catch (error) {
      expect(error).toBeInstanceOf(ServiceUnavailableException);
      expect(error.message).toBe(
        'El servicio de catálogo no está disponible en este momento',
      );
    }
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

    try {
      await controller.getProducts();
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Error inesperado del servicio de catálogo');
    }
  });
});
