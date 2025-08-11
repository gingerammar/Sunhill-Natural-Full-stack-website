package com.ammar.JulietteFood.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table( name= "address")
@Getter
@Setter
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String city;

    private String country;

    private String state;

    private String street;

    @Column(name="zip_code")
    private String zipCode;

    @OneToOne
    //the primary keys are also the foreign keys
    @PrimaryKeyJoinColumn
    private Order order;
}
