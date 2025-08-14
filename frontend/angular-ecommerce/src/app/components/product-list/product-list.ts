import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list-grid.html',
  styleUrl: './product-list.css'
})
export class ProductList {


  products: Product[] =[];
  currentCategoryId: number = 0;
  previousCategoryId: number = 0;

  //pagination variables
  //pageNumber is the current page we are on (must be 1 here even tho its 0 based the ngb-pagination will display it as 1)
  //pageSize is how many products we want to show per page
  //we will use these to fetch a subset of products from the server
  //and then display them in the product list component
  //totalElements is the total number of products we have in our database
  pageNumber: number = 1;
  pageSize: number = 8;
  totalElements: number = 0;

  //will inject a productservice 
  //will inject the current route so we can access the paramters in the route
  constructor(private productService : ProductService,
              private cartService : CartService,
              private route: ActivatedRoute
  ){

  }
  //will be run when we initialise our program
  ngOnInit(): void{
    //were taking this route and making a param map of it 
    //but by using subscribe were keeping track of if the route changes so we can run the function inside subsribe -- 
    //which is calling list products
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }
  
  listProducts() {
    //looks at the param map and sees if right now it has an id parameter returns a boolean
    const  hasKeyword: boolean = this.route.snapshot.paramMap.has('keyword');

    if(hasKeyword){
      this.searchProductList();
    }
    else if (this.route.snapshot.paramMap.has('id')){
      this.categoryProductList();
    }
    else{
      this.fullProductList();
    }

  }

//all the possible options for fetching subsets of products:
  fullProductList(){

     //we call get rpoduct list which will send the get request and prep for mapping 
    //but until we do .subsribe nothing will be fetched or ran 
    //.subsribe() has three possible params (what to do with data, what to do with an error, what to do when its done)
    this.productService.getFullProductListPaginate(this.pageNumber-1, this.pageSize).subscribe(
      data => {
        this.products = data._embedded.products;
        this.pageNumber = data.page.number+1;
        this.pageSize = data.page.size;
        this.totalElements = data.page.totalElements;
      }
    );
  }

  searchProductList(){
    let searchKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.getSearchProductListPaginate(searchKeyword, this.pageNumber-1, this.pageSize).subscribe(
      data => {
        this.products = data._embedded.products;
        this.pageNumber = data.page.number+1;
        this.pageSize = data.page.size;
        this.totalElements = data.page.totalElements;
      }
    );
  }

  categoryProductList(){
    //the + symbol turns the string into a number
    this.currentCategoryId= +this.route.snapshot.paramMap.get('id')!;

    if(this.previousCategoryId != this.currentCategoryId){
      this.pageNumber = 0;
    }
    this.previousCategoryId = this.currentCategoryId;

    this.productService.getCategoryProductListPaginate(this.currentCategoryId, this.pageNumber-1, this.pageSize).subscribe(
      data => {
        this.products = data._embedded.products;
        this.pageNumber = data.page.number+1;
        this.pageSize = data.page.size;
        this.totalElements = data.page.totalElements;
      }
    );
  }

  updatePageSize(newSize: number) {
    this.pageSize = newSize;
    this.pageNumber = 1; // reset to first page
    this.listProducts(); // re-fetch products with new page size
  }

  addToCart(product: Product) {
    let newCartItem : CartItem = new CartItem(product);
    this.cartService.updateCart(newCartItem);
  }
}

