package com.applepine.microwms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.applepine.microwms.entity.Item;
import com.applepine.microwms.service.ItemService;

import java.util.List;

@RestController
@RequestMapping("/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping
    public ResponseEntity<List<Item>> getAllItems(){
        List<Item> items = itemService.getAllItems();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{sku}")
    public ResponseEntity<List<Item>> getItemBySku(@PathVariable("sku") String sku){
        List<Item> items = itemService.getItemBySku(sku);
        return ResponseEntity.ok(items);
    }
}