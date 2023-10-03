package com.example.superprice.controllers;

import com.example.superprice.model.CartItem;
import com.example.superprice.model.Product;
import com.example.superprice.services.SuperpriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;

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
        return this.service.getProducts();
    }

    @GetMapping("/{keyword}")
    public Collection<Product> searchForProduct(@PathVariable String keyword) {
        return service.searchKeyword(keyword);
    }

    @GetMapping("/cart/{id}")
    public Collection<Product> getCartProducts(@PathVariable int id) {
        return service.getCartProducts(id);
    }

    @PostMapping
    public ResponseEntity<CartItem> addProductToCart(@RequestBody CartItem item) {
        CartItem ci = service.addToCart(item);
        return new ResponseEntity<CartItem>(ci, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> removeProductFromCart(@PathVariable int cartId, int productId) {
        this.service.removeFromCart(cartId, productId);
        return new ResponseEntity<HttpStatus>(HttpStatus.ACCEPTED);
    }
}
