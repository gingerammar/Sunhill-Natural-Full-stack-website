import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private checkoutUrl: string = "http://localhost:8080/api/checkout"

  constructor (private httpClient: HttpClient){}

  //were gna make a fucntiont hat posts a purhcase and will be returned a json
  postAPurchase(purchase: Purchase): Observable<any>{

    const purchaseUrl=   `${this.checkoutUrl}/purchase`;
    return this.httpClient.post<Purchase>(purchaseUrl, purchase);
  }
  
}
