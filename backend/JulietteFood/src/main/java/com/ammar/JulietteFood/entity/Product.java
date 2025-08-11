package com.ammar.JulietteFood.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name="product")
@Data

public class Product {
    @Id
    @Column(name="ItemID")
    //must generate values for new products
    private Long id;

    @Column(name="ItemName")
    private String name;

    @ManyToOne
    @JoinColumn(name = "CategoryId", nullable = false)
    private ProductCategory category;

    @Column(name = "Weight")
    private int weight;

    @Column(name = "UnitOfWeight")
    private String unitOfWeight;

    private int amount;

    @Column(name="Description")
    private String description;

    @Column(name="Notes")
    private String notes;

    @Column(name="Dimensions")
    private String dimensions;

    @Column(name="DimensionsMetric")
    private String dimensionsMetric;

    @Column(name="OrderMinimumQuantity")
    private String orderMinimumQuantity;

    @Column(name="OrderMultipleQuantity")
    private String orderMultipleQuantity;

    @Column(name = "ContainerMinQty")
    private boolean containerMinQty;

    @Column(name = "OnHandQuantity")
    private int onHandQuantity;

    @Column(name = "UPC")
    private String upc;

    @Column(name = "BasePrice")
    private BigDecimal basePrice;

    @Column(name = "PriceLevel1")
    private BigDecimal priceLevel1;

    @Column(name = "PriceLevel2")
    private BigDecimal priceLevel2;

    @Column(name = "PriceLevel3")
    private BigDecimal priceLevel3;

    @Column(name = "PriceLevel4")
    private BigDecimal priceLevel4;

    @Column(name = "PriceLevel5")
    private BigDecimal priceLevel5;

    @Column(name = "PriceLevel6")
    private boolean priceLevel6;

    @Column(name = "PriceLevel7")
    private BigDecimal priceLevel7;

    @Column(name = "PriceLevel8")
    private BigDecimal priceLevel8;

    @Column(name = "SpecialPrice")
    private boolean specialPrice;

    @Column(name = "AdditionalPhotos")
    private String additionalPhotos;

    @Column(name = "PhotoName")
    private int photoName;

    @Column(name = "Source")
    private String source;

    @Column(name = "IsDeleted")
    private String isDeleted;

    @Column(name = "AdditionalImageCount")
    private String additionalImageCount;

}
