import { Controller, Get } from "@nestjs/common";
import type { AppService, Product } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getProduct(): Product {
    return this.appService.getProduct();
  }
}
