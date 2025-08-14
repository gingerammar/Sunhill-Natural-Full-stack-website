import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { ProductDetails } from './components/product-details/product-details';
import { CartDetails } from './components/cart-details/cart-details';
import { Checkout } from './components/checkout/checkout';



//list of route objects used to help our router connect paths to compoennts 
//from most spesfic to most generci simce it matches the first applicable page
const routes: Routes = [
  {path: 'checkout', component: Checkout},
  {path: 'cart-details', component: CartDetails},
  {path: 'products/:id', component: ProductDetails},
  {path: 'search/:keyword', component: ProductList},
  {path: 'category/:id', component: ProductList},
  {path: 'category', component: ProductList},
  {path: 'products', component: ProductList},
  //path doesnt contain a / at the beginning sincer were defining it
  // but a route we redirect to can since its a route not a path
  //path macth full means 
  {path: '', redirectTo: '/products', pathMatch:'full'},
  {path: '**', redirectTo: '/products', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
