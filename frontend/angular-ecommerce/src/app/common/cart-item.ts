import { Product } from "./product";

export class CartItem {
    public name: string;
    public categoryId: number;
    public id: number;
    public price: number;
    public imageUrl: string;

    public quantity: number =1;

    constructor(public product: Product) {
        this.name = product.name;
        this.categoryId = product.categoryId;
        this.id = product.id;
        this.price = +((product.basePrice / product.amount).toFixed(2));
        this.imageUrl = product.photoName ? `assets/images/products/${product.photoName}.png` : 'assets/images/default.png';
    }
}
