package com.ammar.JulietteFood.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="apps_states")
@Data
public class State {
    @Id
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name="country_code")
    private Country country;
}
