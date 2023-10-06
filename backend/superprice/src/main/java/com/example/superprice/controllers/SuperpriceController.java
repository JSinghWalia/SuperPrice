package com.example.superprice.controllers;

import com.example.superprice.model.CartItem;
import com.example.superprice.model.Product;
import com.example.superprice.services.SuperpriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.Collection;
import java.util.Optional;

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
        return service.findByKeyword(keyword);
    }

    @GetMapping("/cart/{id}")
    public Collection<Product> getCartProducts(@PathVariable int id) {
        return service.getCartProducts(id);
    }

    @PostMapping
    public ResponseEntity<CartItem> addToCart(@RequestBody CartItem item) {
        CartItem ci = service.addToCart(item);
        return new ResponseEntity<CartItem>(ci, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> removeFromCart(@PathVariable int cartId, int productId) {
        this.service.removeFromCart(cartId, productId);
        return new ResponseEntity<HttpStatus>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/notifications")
    public Collection<Product> getPromoProducts() {
        return this.service.getPromoProducts();
    }

    @GetMapping("/notifications/{keyword}")
    public Collection<Product> getPromoProducts(@PathVariable String keyword) {
        return this.service.findByKeywordPromo(keyword);
    }

    @PutMapping("/update_notification/{id}/{command}") // Commands: "ON"/"OFF"
    public ResponseEntity<Product> updateProductNotification(
            @PathVariable int id,
            @PathVariable String command,
            @RequestBody Product updatedProduct
    ) throws SQLException {
        service.toggleNotification(id, command);
        Optional<Product> product = service.findById(id);
        if (product.isPresent()) {
            return new ResponseEntity<>(product.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
