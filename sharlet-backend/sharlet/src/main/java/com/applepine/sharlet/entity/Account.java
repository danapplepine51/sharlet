package com.applepine.microwms.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
// import lombok.Setter;
import lombok.NoArgsConstructor;


/**
 * An entity class represents a table in a relational database
 */
@Entity
@Getter
@NoArgsConstructor
// @Setter
// No userInfo!!! -> postgresql convert all to small letter cases
@Table(name = "account")
public class Account {

    @Id
    private Integer id;
    private String first_name;
    private String last_name;
    private String email;

    @JsonIgnore // For security
    private String password;

    private String atype;

    @Builder
    public Account(Integer id, String first_name, String last_name, String email, String password, String atype){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.atype = atype;
    }
}