package com.applepine.microwms.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
// import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.Builder;


/**
 * An entity class represents a table in a relational database
 */
@Entity
@Getter
// Don't use Setter for consistency
// @Setter
@NoArgsConstructor
@Table(name = "item")
public class Item {

    @Id
    private Integer id;
    private Integer owner_id;
    private String box_number;
    private String sku1;
    private String sku2;
    private String product_name;
    private String description;
    private Integer quantity;
    private String bin_number;

    @Builder
    public Item(Integer id, Integer owner_id, String sku1, String sku2, String product_name, String description, Integer quantity, String bin_number){
        this.id = id;
        this.owner_id = owner_id;
        this.sku1 = sku1;
        this.sku2 = sku2;
        this.product_name = product_name;
        this.description = description;
        this.quantity = quantity;
        this.bin_number = bin_number;
    }
}