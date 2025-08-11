package com.ammar.JulietteFood.dao;

import com.ammar.JulietteFood.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.domain.Pageable;


// cross-origin allows other browsers to access our data if they are scripts (ts,js)
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {
    //query method- uses a keyword jpa knows "findBy" so itll write the code for us
    Page<Product> findByCategoryId(@Param("id")Long id, Pageable pageable);

    //query method that will look for a name that contians the substring typed into the search bar
    //ex you type in oats it finds rolled oats and instant oats
    Page<Product> findByNameContaining(@Param("name")String name, Pageable page);
}
