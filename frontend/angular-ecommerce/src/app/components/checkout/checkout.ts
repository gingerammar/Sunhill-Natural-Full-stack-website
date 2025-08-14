import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { CheckoutFormService } from '../../services/checkout-form-service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { MyCustomValidators } from '../../validators/my-custom-validators';
import { CartService } from '../../services/cart';
import { CheckoutService } from '../../services/checkout-service';
import { Router } from '@angular/router';
import { Order } from '../../common/order';
import { CartItem } from '../../common/cart-item';
import { OrderItem } from '../../common/order-item';
import { Purchase } from '../../common/purchase';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {

  checkoutFormGroup !:  FormGroup;
  totalPrice: number = 0;
  totalQuantity : number = 0;

  expirationMonths: string[] = [];
  expirationYears: string[] = [];
  countries: Country[] = [];
  shippingStates: State[] = [];
  billingStates: State[] = [];


  constructor(private formBuilder: FormBuilder,
              private formService: CheckoutFormService,
              private cartService: CartService, 
              private checkoutService: CheckoutService,
              private router: Router
  ){

  }

  ngOnInit(): void {
    this.populateDropdownData();
    this.updateTotals();
    this.checkoutFormGroup = this.formBuilder.group({
      //were starting to use validation 
      //validation.reuired says this is a required field
      //validation min lentgh is self explantory there is also a seprate min for ints 
      /* validatipon pattern 
      ^-start matching at the beginning of the string (dont just a match the pattern inside fo the string
      ex- "hi ginger@gmail.com" wouldnt work)
      [a-z0-9._+-]+ square brackets mean a charcter portion is allowed in this spot
                    we should have some characters from a-z 0-9 or those specail character
                    the plus means we should have at ;east one or more character before moving on to the next part of the pattern 
      @- there must literally be a @ at the next part of the pattern 
      [a-z0-9._+-]+ now there must be another group of one or more characters 
      \.- there must literally be a . at the next part of the pattern 
      [a-z]{2,24}- there must be a group of characters a-z from 2-24 characters long (domain name)
      $-the end of the pattern should be the end of the string
      */ 
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), MyCustomValidators.notOnlyWhiteSpace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), MyCustomValidators.notOnlyWhiteSpace]),
        email: new FormControl('', [Validators.required, 
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9._]+\.[a-z]{2,24}$')]),
        phoneNumber: new FormControl('', [Validators.required, 
          Validators.pattern(/^\+?[\d\s().-]{7,25}$/)]),
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), MyCustomValidators.notOnlyWhiteSpace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), MyCustomValidators.notOnlyWhiteSpace]),
        state:  new FormControl<State | null>(null, { updateOn: 'change' }),
        country:new FormControl<Country | null>(null, { validators: [Validators.required], updateOn: 'change' }),
        zip: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^\d{5}(-\d{4})?$/)])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), MyCustomValidators.notOnlyWhiteSpace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), MyCustomValidators.notOnlyWhiteSpace]),
        state:  new FormControl<State | null>(null, { updateOn: 'change' }),
  country:new FormControl<Country | null>(null, { validators: [Validators.required], updateOn: 'change' }),
        zip: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^\d{5}(-\d{4})?$/)])
      }),
      creditCard: this.formBuilder.group({
        type:  new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/)]),
        number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{16}$')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3}$')]),
        expMonth: new FormControl('', [Validators.required]),
        expYear: new FormControl('', [Validators.required])
      })
    }, { updateOn: 'blur' });
    /*
    even tho i put a change event handler by my expyear, becuase it was defulting to the first 
    year in the list(current year) it was not validatign the year. In order to fix that i actaully 
    populated my lists and then when i built my form i assigned the first year
    then i called validate date in my on init so it would see ok whats there already
     (even tho nothing was "changed" yet)
    */
    this.validateMonth(); 
  }
  updateTotals() {
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice= totalPrice
    );
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity= totalQuantity
    );
  }
  populateDropdownData() {
    this.formService.getExpirationMonths(1).subscribe(data=> {this.expirationMonths=data;});
    this.formService.getExpirationYears().subscribe(data=> {this.expirationYears=data;});
    this.formService.getCountries().subscribe(data=> {this.countries=data;});
  }

  getStates(FormGroupName: string) {
    console.log('country control value:', this.checkoutFormGroup.controls['shippingAddress'].value.country);
    const formGroup= this.checkoutFormGroup.controls['shippingAddress']!;
    console.log(formGroup.value.country.code)
    this.formService.getStates(formGroup.value.country.code).subscribe(
      data=> {
        if(FormGroupName=="shippingAddress"){
          this.shippingStates=data;
        }
        if(FormGroupName=="billingAddress"){
          this.billingStates=data;
        }
      });
  }

  validateMonth() {

   if((new Date().getFullYear()).toString().slice(-2)== this.checkoutFormGroup.controls['creditCard'].value.expYear){
    this.formService.getExpirationMonths(new Date().getMonth()+1).subscribe(data=> {this.expirationMonths=data;});  
   }
  }

  onSubmit () {
    console.log(this.checkoutFormGroup.get('customer')?.value)

    //goes and checked whether anything is invalid , then it marks it as checked, so that all the fields will show erros
    //the reason this is important is becuase before u touch the field nohting will show up(even tho technically its invalid)
    //but once they click submit we dont want the user to geta way with leaving it empty even tho they never touched it 
    if (this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    //set up order
    let order: Order= new Order;
    order.totalPrice= this.totalPrice;
    order.totalQuantity= this.totalQuantity;

    //gte cart items
    const cartItems : CartItem[]= this.cartService.cartItems;

    //create orderItems from CartItems
    //short way of doing a loop 
    const orderItems: OrderItem[] = cartItems.map(tempCartItem=> new OrderItem(tempCartItem));
    
    //set up pruchase
    const purchase: Purchase= new Purchase;
    purchase.order= order;
    purchase.orderItems= orderItems;
    //We assign al the properties in shipping address using the field sin our form control of shipping address
    //even tho we have an object for state and cpuntry it stores them as a string bc at runtime java doesnt care about types
    //itll assign it even tho its not a string
    purchase.shippingAddress= this.checkoutFormGroup.controls['shippingAddress'].value;
    //here we need to do stringify and then parse so we can trick the ts into thinking we assigned a string even tho it was really an object
    //then we go in and take out a stirng and parse it as an object so we can do .name without error
    //if we just did purchase.shippingAddress.state.name it would be confused bc it would relized we assigned an object to the propty "state" which in this class is a stirng 
    const shippingState: State =JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country =JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state= shippingState.name;
    purchase.shippingAddress.country= shippingCountry.name;

    purchase.billingAddress= this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State =JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country =JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state= billingState.name;
    purchase.billingAddress.country= billingCountry.name;

    purchase.customer= this.checkoutFormGroup.controls['customer'].value;

    this.checkoutService.postAPurchase(purchase).subscribe(
      {
        //if we get the good response from subscribe (passed in a good product)
        next: response=>{
          //takes the json from the response and grabs the order tracking number field 
          alert(`Your order has been reciveed.\n Order tracking number: ${response.orderTrackingNumber} `)
          this.resetCart();
        },
        //if we get an error 
        error: err=>{
          alert(`There was an error : ${err.message}`)
        }

      }
    );
  }


  copyShippingToBilling(event: Event) {
    //checks if theevent passed in means the box is ticked on
    if ((event.target as HTMLInputElement).checked){
      
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
      this.billingStates=this.shippingStates;
    }
    else{
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingStates= [];
    }
  }

  resetCart(){
    //resets the cart data 
    this.cartService.cartItems= []; 
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    //resets the form fields 
    this.checkoutFormGroup.reset();

    //navigate back to the products page
    this.router.navigateByUrl("/products");

  }

  get firstName(){return this.checkoutFormGroup.get('customer.firstName');}
  get lastName(){return this.checkoutFormGroup.get('customer.lastName');}
  get email(){return this.checkoutFormGroup.get('customer.email');}
  get phoneNumber(){return this.checkoutFormGroup.get('customer.phoneNumber');}

  get shippingStreet(){return this.checkoutFormGroup.get('shippingAddress.street');}
  get shippingCity(){return this.checkoutFormGroup.get('shippingAddress.city');}
  get shippingCountry(){return this.checkoutFormGroup.get('shippingAddress.country');}
  get shippingState(){return this.checkoutFormGroup.get('shippingAddress.state');}
  get shippingZip(){return this.checkoutFormGroup.get('shippingAddress.zip');}

  get billingStreet(){return this.checkoutFormGroup.get('billingAddress.street');}
  get billingCity(){return this.checkoutFormGroup.get('billingAddress.city');}
  get billingCountry(){return this.checkoutFormGroup.get('billingAddress.country');}
  get billingState(){return this.checkoutFormGroup.get('billingAddress.state');}
  get billingZip(){return this.checkoutFormGroup.get('billingAddress.zip');}

  get creditType(){return this.checkoutFormGroup.get('creditCard.type');}
  get creditName(){return this.checkoutFormGroup.get('creditCard.name');}
  get creditNumber(){return this.checkoutFormGroup.get('creditCard.number');}
  get creditSecurity(){return this.checkoutFormGroup.get('creditCard.securityCode');}
  get creditMonth(){return this.checkoutFormGroup.get('creditCard.expMonth');}
  get creditYear(){return this.checkoutFormGroup.get('creditCard.expYear');}
}
