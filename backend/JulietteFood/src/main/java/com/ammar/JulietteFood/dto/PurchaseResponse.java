package com.ammar.JulietteFood.dto;

import lombok.Data;

//repsonse we send back java object as json
//backend --> frontend
@Data
public class PurchaseResponse {
    private String orderTrackingNumber;
}
