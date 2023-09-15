package com.example.superprice.controllers;

import com.example.superprice.model.Product;
import com.example.superprice.services.SuperpriceService;
import com.example.superprice.services.SuperpriceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping()
public class SuperpriceController {

    private SuperpriceService service;

    @Autowired
    public SuperpriceController(SuperpriceService service) {
        this.service = service;
    }

    //@CrossOrigin(origins = "http://localhost:8080")
    @GetMapping
    public Collection<Product> getProducts() {
        return this.service.getAllProducts();
    }

    @GetMapping("/{keyword}")
    public Collection<Product> searchForProduct(@PathVariable String keyword) {
        return service.searchKeyword(keyword);
    }
}
