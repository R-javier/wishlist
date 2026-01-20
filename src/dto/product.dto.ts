export class ProductDTO {
    id: string;
    title: string;
    category: string;
    price: number;
    currency: string;
    stock: number;
    rating: number;
    imageUrl: string;
    createdAt: string;

    private constructor(
        id: string,
        title: string,
        category: string,
        price: number,
        currency: string,
        stock: number,
        rating: number,
        imageUrl: string,
        createdAt: string,) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.price = price;
        this.currency = currency;
        this.stock = stock;
        this.rating = rating;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt
    }

};