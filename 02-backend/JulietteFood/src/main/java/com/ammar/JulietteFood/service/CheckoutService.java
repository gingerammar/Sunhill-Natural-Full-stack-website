package com.ammar.JulietteFood.service;

import com.ammar.JulietteFood.dto.Purchase;
import com.ammar.JulietteFood.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder (Purchase purchase);
}
