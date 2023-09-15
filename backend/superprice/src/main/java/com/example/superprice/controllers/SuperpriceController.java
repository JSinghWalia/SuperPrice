package com.example.superprice.controllers;

import com.example.superprice.model.Product;
import com.example.superprice.services.SuperpriceService;
import com.example.superprice.services.SuperpriceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/cart/{id}")
    public Collection<Product> getCartProducts(@PathVariable Long id) {
        return service.getCartProducts(id);
    }

    @PostMapping
    public ResponseEntity<Product> addProductToCart(@RequestBody Product product) {
        Product p = service.addItemToCart(product);
        return new ResponseEntity<Product>(p, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> remove(@PathVariable Long id) {
        this.service.removeProductFromCart(id);
        return new ResponseEntity<HttpStatus>(HttpStatus.ACCEPTED);
    }
}
