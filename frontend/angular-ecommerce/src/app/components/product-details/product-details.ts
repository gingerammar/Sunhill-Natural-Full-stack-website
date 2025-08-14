import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../common/product';
import { CartService } from '../../services/cart';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit{
  //we put a ! in order to make sure its not null 
  // in ts your not allowed to declare and not assigna. paramter unless u say it wont be null later
  product !: Product;

  

  //will inject a productservice
  //will inject the current route so we can access the parameters in the route
  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService
  ){}

  ngOnInit(): void {
    this.getDetails();
  }
  getDetails() {
    //puts a + sign to turn it into an int
    const productId: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductDetails(productId).subscribe(
      data=> {
        this.product = data; 
      }
    );
  }

  addToCart(productItem : Product){
    const cartItem= new CartItem(this.product)
    this.cartService.updateCart(cartItem);
  }
}
