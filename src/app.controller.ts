import { Controller, Get } from "@nestjs/common";
import { AppService, type Product } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getProduct(): Product {
    return this.appService.getProduct();
  }
}
