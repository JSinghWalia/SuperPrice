package com.example.superprice.controllers;

import com.example.superprice.model.Product;
import com.example.superprice.services.SuperpriceService;
import com.example.superprice.services.SuperpriceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping(value = "v1/superprice")
public class SuperpriceController {

    private SuperpriceService service;

    @Autowired
    public SuperpriceController(SuperpriceService service) {
        this.service = service;
    }

    @GetMapping
    public Collection<Product> getProducts() {
        return this.service.getAllProducts();
    }

    @GetMapping("/{keyword}")
    public Collection<Product> searchForProduct(@PathVariable String keyword) {
        return service.searchKeyword(keyword);
    }

    @GetMapping("/{cart}")
    public Collection<Product> getCartProducts() {
        return service.getCartProducts();
    }
}
