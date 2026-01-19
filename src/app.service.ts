import { Injectable } from "@nestjs/common";

export type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  currency: string;
  stock: number;
  rating: number;
  imageUrl: string;
  createdAt: string;
};

@Injectable()
export class AppService {
  getProduct(): Product {
    return {
      id: "p-1001",
      title: "Auriculares Eco 001",
      category: "Audio",
      price: 78320,
      currency: "ARS",
      stock: 71,
      rating: 5.5,
      imageUrl: "https://example.invalid/images/p-1001.jpg",
      createdAt: "2025-01-01T00:00:00Z",
    };
  }
}
