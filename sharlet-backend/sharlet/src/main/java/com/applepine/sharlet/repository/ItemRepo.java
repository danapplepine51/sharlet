package com.applepine.microwms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.applepine.microwms.entity.Item;
import java.util.List;


/**
 * Repository is an interface that provides access to data in a database
 */

 @Repository
public interface ItemRepo extends JpaRepository<Item, Integer> {

    // @Query("SELECT i FROM item WHERE i.sku1 =: sku1")
    // Item findBySKU(@Param("sku1") String sku1);
    List<Item> findBySku1(String sku1);
}