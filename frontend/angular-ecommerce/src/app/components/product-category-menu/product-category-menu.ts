import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCategory } from '../../common/product-category';

@Component({
  selector: 'app-product-category-menu',
  standalone: false,
  templateUrl: './product-category-menu.html',
  styleUrl: './product-category-menu.css'
})
export class ProductCategoryMenu implements OnInit{

  productCategories: ProductCategory[] = [];

  constructor( private productService: ProductService){}

  ngOnInit(){
    this.listProductCategories();
    console.log('Category test');  
  }

  listProductCategories(){
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories' + JSON.stringify(data));
        this.productCategories= data;
      }
    );
  }
}

