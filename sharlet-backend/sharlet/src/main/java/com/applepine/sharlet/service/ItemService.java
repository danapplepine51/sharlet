package com.applepine.microwms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.applepine.microwms.entity.Item;
import com.applepine.microwms.repository.ItemRepo;

import java.util.List;

/**
 * Service layer is where all the business logic lies
 */
@Service
public class ItemService {

    @Autowired
    private ItemRepo itemRepo;

    public List<Item> getAllItems(){
        return itemRepo.findAll();
    }

    public List<Item> getItemBySku(String sku1){
        return itemRepo.findBySku1(sku1);
    }
}
