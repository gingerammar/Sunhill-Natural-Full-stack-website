package com.ammar.JulietteFood.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="apps_countries")
@Getter
@Setter
public class Country{
    private Long id;

    @Id
    @Column(name="country_code")
    private String  code;

    @Column(name="country_name")
    private String  name;

    @OneToMany
    private List<State> states;
}
