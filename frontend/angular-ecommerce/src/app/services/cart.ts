import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

      //for subject objects like total quantity and total price it will only update the stuff when .next is caled
    //so basically till just replace whatever placeholder was already there
    //here because we defined both as = 0 in the beginning and then necer called any code (like update cart) that has a .next nothing is updated 
    //subject doesnt save the last value like some other subsribe classes 
    
  //BehaviorSubject allows us to have a behvior on the last event called to subscribe, so if we open a new component we can see the last value in. the totals
  //its set defult to 0 
  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private currentTotalPrice: number = 0;
  private currentTotalQuantity: number = 0;

  constructor() { }

  updateCart(cartItem: CartItem) {
    console.log('Contents of the cart');
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined;


    //we use the Array.find method basically will return the first thing that passes the test we set
    // itemReturned= this.arrayName.find(a => a.id == b.id)

    existingCartItem = this.cartItems.find(curCartItem => curCartItem.id == cartItem.id)

    this.currentTotalPrice += cartItem.price;
    this.currentTotalQuantity++;
    this.updateTotals();


    if (existingCartItem !== undefined) {
      // Item exists: increment quantity
      existingCartItem.quantity++;
    } else {
      // Item does not exist: add to cart
      this.cartItems.push(cartItem);
    }

    // log cart data just for debugging purposes
    this.logCartData(this.currentTotalPrice, this.currentTotalQuantity);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.price;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.price}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----');
  }

  updateTotals() {
    this.totalPrice.next(this.currentTotalPrice);
    this.totalQuantity.next(this.currentTotalQuantity);
  }

  decrementQuantity(cartItem: CartItem){
    if(cartItem.quantity == 1){
      this.remove(cartItem);
    }
    else{
      this.currentTotalPrice -= cartItem.price;
      this.currentTotalQuantity--;
      cartItem.quantity--;
      this.updateTotals();
    }
  }
  
  remove(cartItem: CartItem) {
    const cartItemIndex :number= this.cartItems.findIndex(tempCartItem=> tempCartItem.id == cartItem.id )

    if(cartItemIndex > -1){
      this.cartItems.splice(cartItemIndex, 1);
      this.currentTotalPrice -= (cartItem.price *cartItem.quantity);
      this.currentTotalQuantity -= cartItem.quantity;
      cartItem.quantity--;
      this.updateTotals();
    }
  }
}
