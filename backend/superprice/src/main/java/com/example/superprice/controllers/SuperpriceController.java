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

    @PostMapping
    public ResponseEntity<CartItem> addProductToCart(@RequestBody Long quantity, Long cartId, Long productId) {
        CartItem ci = service.addItemToCart(quantity, cartId, productId);
        return new ResponseEntity<CartItem>(ci, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> remove(@PathVariable Long cartId, Long productId) {
        this.service.removeProductFromCart(cartId, productId);
        return new ResponseEntity<HttpStatus>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/promotions/{id}")
    public String getProductNotification(@PathVariable int id) {
        Product p = service.getAllProducts().get(id);
        if (p.promotion() && p.notification())
            return "There's a promotion!";
        else if (p.promotion() && !p.notification())
            return "Notifications are off.";
        else if (!p.promotion() && p.notification())
            return "There is no promotion for this item.";
        else if (!p.promotion() && !p.notification())
            return String.format("Notifications are off and there are no promotions for %s.", p.name());

        return String.format("Error getting notifications for %s", p.name());
    }

}
