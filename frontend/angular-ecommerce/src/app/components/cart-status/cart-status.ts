import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-cart-status',
  standalone: false,
  templateUrl: './cart-status.html',
  styleUrl: './cart-status.css'
})
export class CartStatus implements OnInit{

  cartPrice : number = 0.00;
  cartQuantity : number = 0;

  //inject a cartService so we can get data from it 
  constructor(private cartService: CartService){}

  ngOnInit(){
    this.updateCartStatus();
  }

  //in this method we subscirbe for updates in totalPrice and total Quantity
  updateCartStatus() {
    this.cartService.totalPrice.subscribe(
      data=>{
        this.cartPrice =data;
      }
    )
    this.cartService.totalQuantity.subscribe(
      data=>{
        this.cartQuantity =data;
      }
    )
  }
}
