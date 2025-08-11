package com.ammar.JulietteFood.service;

import com.ammar.JulietteFood.dao.CustomerRepository;
import com.ammar.JulietteFood.dto.Purchase;
import com.ammar.JulietteFood.dto.PurchaseResponse;
import org.springframework.stereotype.Service;

//spring will pick this up as a service
@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository=customerRepository;
    }
    @Override
    public PurchaseResponse placeOrder(Purchase purchase) {
        return null;
    }
}
