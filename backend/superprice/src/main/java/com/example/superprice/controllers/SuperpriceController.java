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

    //default one
    @PostMapping("/api/additem/{quantity}/{cartId}/{productId}")
    public ResponseEntity<CartItem> addProductToCart(@RequestBody Long quantity, Long cartId, Long productId) {
        CartItem ci = service.addItemToCart(quantity, cartId, productId);
        return new ResponseEntity<CartItem>(ci, HttpStatus.CREATED);
    }

    // new one
    @PostMapping("/cart/add")
    public ResponseEntity<String> addItem(
            @RequestParam Long quantity,
            @RequestParam Long cartId,
            @RequestParam Long productId) {
        CartItem ci = service.addItemToCart(quantity, cartId, productId);
        return ResponseEntity.ok("Item added to cart successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> remove(@PathVariable Long cartId, Long productId) {
        this.service.removeProductFromCart(cartId, productId);
        return new ResponseEntity<HttpStatus>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/promotions/{id}")
    public String getProductNotification(@PathVariable int id) {
        // Retrieve the product
        Product p = service.getAllProducts().get(id);
        // Return the notification String
        return service.getNotification(p);
    }

    @GetMapping("/discounts/{id}")
    public float getDiscountPrice(@PathVariable int id) {
        // Retrieve the product
        Product p = service.getAllProducts().get(id);
        // Return the discounted price
        return service.getDiscountedPrice(p);
    }

}
