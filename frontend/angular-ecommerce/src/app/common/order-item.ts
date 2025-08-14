import { CartItem } from "./cart-item";

export class OrderItem {
    imageUrl !: string;
    quantity !: number;
    unitPrice !: number;
    productId !: number;
    constructor(cartItem: CartItem){
        if (cartItem!=null){
            this.imageUrl=cartItem.imageUrl;
            this.quantity=cartItem.quantity;
            this.unitPrice=cartItem.price;
            this.productId=cartItem.id;
        }
    }
}
