package com.ammar.JulietteFood.dao;

import com.ammar.JulietteFood.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

//when an order comes in well garb the customer and save it with this repository
@CrossOrigin("http://localhost:4200")
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
