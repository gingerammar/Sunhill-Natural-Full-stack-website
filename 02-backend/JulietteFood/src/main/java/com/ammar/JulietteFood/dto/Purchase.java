package com.ammar.JulietteFood.dto;

import com.ammar.JulietteFood.entity.Address;
import com.ammar.JulietteFood.entity.Customer;
import com.ammar.JulietteFood.entity.Order;
import com.ammar.JulietteFood.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
//dto will be the thing that we post to in our frontend and that will be filtered and used for our dao to post into our db
//frontend--> backend
//will be transferred with a json that has an list of orders an adress and customer etc
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;\
    private Order order;
    private Set<OrderItem> orderItems;

}
