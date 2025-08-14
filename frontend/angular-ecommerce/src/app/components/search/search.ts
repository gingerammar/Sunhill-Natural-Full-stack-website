import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit{

  //injecst a router into our service 
  constructor(private router: Router){}
  
  ngOnInit(): void {
    
  }

  doSearch(myInput: String){
      console.log(`value=${myInput}`);
      //will call out router to reroute our product list to be only things that contian that input
      this.router.navigateByUrl(`/search/${myInput}`);
  }


}
