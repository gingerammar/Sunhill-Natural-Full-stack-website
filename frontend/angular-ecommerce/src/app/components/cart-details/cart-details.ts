import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-cart-details',
  standalone: false,
  templateUrl: './cart-details.html',
  styleUrl: './cart-details.css'
})
export class CartDetails implements OnInit{
  cartItems : CartItem[] = [];
  totalPrice : number = 0;
  totalQuantity : number = 0;

  constructor(private cartService : CartService){

  }

  ngOnInit(){
    this.listCartDetails();

    //for subject objects like total quantity and total price it will only update the stuff when .next is caled
    //so basically till just replace whatever placeholder was already there
    //here because we defined both as = 0 in the beginning and then necer called any code (like update cart) that has a .next nothing is updated 
    //subject doesnt save the last value like some other subsribe classes 
    //therefore i made a method that calls the .next for both of them in our cartservice a
    this.cartService.updateTotals();
  } 

  listCartDetails(){
    //takes the current version of cart items and assigns it to out cart items arrray 
    // this will not be able to be updated unless we do it manually, unlike susbcribe
    //the reaosn this is fine is because this is tly the only place were using this array and theres no real way to update the cart once were alreay on the page
    //on top of that an arrray is big so its hard to reload it everytime there is a change 
    this.cartItems= this.cartService.cartItems;

    //honeslty these wont be updated whilst on the page either 
    // however because they are refrenced in other components where they are updated frequntly it makes sense to have them as a subject (somehting we susbcribe to)
    this.cartService.totalPrice.subscribe(
      data=> this.totalPrice =data
    );
    this.cartService.totalQuantity.subscribe(
      data=> this.totalQuantity =data
    );
  }

  incrementQuantity(cartItem: CartItem){
    this.cartService.updateCart(cartItem);
  }

  decrementQuantity(cartItem: CartItem){
    this.cartService.decrementQuantity(cartItem);
  }

  remove(cartItem: CartItem) {
    this.cartService.remove(cartItem);
  }
}

