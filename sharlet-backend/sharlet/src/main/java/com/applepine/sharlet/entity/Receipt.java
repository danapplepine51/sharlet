package com.applepine.microwms.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


/**
 * An entity class represents a table in a relational database
 */
@Entity
@Getter
@Setter
// No userInfo!!! -> postgresql convert all to small letter cases
@Table(name = "receipt")

public class Receipt {
    @Id
    private Integer id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
}
