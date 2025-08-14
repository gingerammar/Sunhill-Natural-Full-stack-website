import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  //where we should get the json file from for products 
  private productUrl= 'http://localhost:8080/api/products';

  //where we should get the json file from for productCategroies 
  private productCategoryUrl= 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient){}

  //function that will return a list of products based on category 
  getFullProductList(): Observable<Product[]>{

    // it will expect a response in the form of the GetResponse interface 
    // well get that response from the base url 
    //.pipe(.map) work together to map one by one thru the data and do smth to them 
    //we need pipe in order to use map bc its an observable 
    return this.httpClient.get<GetResponseProducts>(this.productUrl).pipe(
      map(response =>response._embedded.products)
    )
  }

  getCategoryProductList(theCategoryId: number): Observable<Product[]>{

    const searchUrl = `${this.productUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response =>response._embedded.products)
    )
  }

  getSearchProductList(theKeyword: String): Observable<Product[]>{

    const searchUrl = `${this.productUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response =>response._embedded.products)
    )
  }
  //return an obseravable of a list of product catergories 
  getProductCategories() : Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategories>(this.productCategoryUrl).pipe(
      map(response =>response._embedded.productCategory)
    )
  }

  getProductDetails(theProductId: number) : Observable<Product>{
    const searchUrl = `${this.productUrl}/${theProductId}`;
    return this.httpClient.get<Product>(searchUrl).pipe(
      map(response =>response)
    )
  } 

  //alternate pagination methods
  getFullProductListPaginate(thePage:number, theSize:number): Observable<GetResponseProducts>{
    const searchUrl = `${this.productUrl}?page=${thePage}&size=${theSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
  getCategoryProductListPaginate(theCategoryId: number, thePage:number, theSize:number): Observable<GetResponseProducts>{

    const searchUrl = `${this.productUrl}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${theSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
  getSearchProductListPaginate(theKeyword: String, thePage:number, theSize:number): Observable<GetResponseProducts>{

    const searchUrl = `${this.productUrl}/search/findByNameContaining?name=${theKeyword}&page=${thePage}&size=${theSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
  
}


//the json file you get form the API comes like :
//"embedded":
  // "products": [
      //"name": "Ginger", ...
  //]
//so we tell our interface were going to have a json file that will have an embedded field and 
//w/i that there is a list of product objects that well call products 
interface GetResponseProducts {
  _embedded:{
    products: Product[];
  },
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  }
}

//the name of the thing your unqrapping say productCategory actaully matters becasue its what the name of the list in the json file is 
interface GetResponseProductCategories {
  _embedded:{
    productCategory: ProductCategory[];
  }
}