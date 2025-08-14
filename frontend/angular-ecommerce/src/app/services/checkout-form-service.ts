import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {
  
  private countriesUrl="http://localhost:8080/api/countries?size=1000";
  private statesUrl="http://localhost:8080/api/states";


  constructor (private httpClient: HttpClient){}

  getExpirationMonths (curMonth: number) : Observable<string[]>{
    let months: string[] = [];

    for(let i=curMonth; i <= 12; i++){
      months.push(i.toString().padStart(2, '0'));
    }
    //arrrays must be wrappedin an of i order to make them observable
    return of(months);
  }

  getExpirationYears () : Observable<string[]>{
    let years: string [] = [];

    let startYear: number = new Date().getFullYear();
    let endYear: number = startYear+10;

    for(let i=startYear; i <= endYear; i++){
      years.push(i.toString().slice(-2));
    }

    return of(years);
  }

  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response=>response._embedded.countries)
    )
  }
  getStates(theCountryCode: String): Observable<State[]>{
    const stateSearchUrl= `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}&size=1000`;
    console.log(stateSearchUrl);
    return this.httpClient.get<GetResponseStates>(stateSearchUrl).pipe(
      map(response=>response._embedded.states)
    )
  }
}

interface GetResponseCountries{
  _embedded:{
    countries: Country[];
  }
}
interface GetResponseStates{
  _embedded:{
    states: State[];
  }
}
