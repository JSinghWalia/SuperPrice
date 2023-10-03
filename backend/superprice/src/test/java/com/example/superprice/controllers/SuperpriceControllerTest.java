package com.example.superprice.controllers;


import com.example.superprice.model.CartItem;
import com.example.superprice.model.Product;
import com.example.superprice.services.SuperpriceService;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.sql.DataSource;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
public class SuperpriceControllerTest {
    SuperpriceController controller;
    SuperpriceService service;

    @BeforeEach
    void setUp() {
        this.service = mock(SuperpriceService.class);
        this.controller = new SuperpriceController(this.service);
    }

    // Search keyword tests
    @Test
    void should_returnEmpty_When_noRelatedProducts() {
        when(this.service.findByKeyword("completelyunrelatedword")).thenReturn(new ArrayList<>());
        assertEquals(0, this.controller.searchForProduct("completelyunrelatedword").size());
    }

    @Test
    void should_returnProduct_When_relatedProducts() {
        Product p1 = new Product((long) 4, "Coke",
                "A totally healthy beverage that is very tasty.", "Woolworths",
                "/cokeBottle.png", (long) 69, (long) 6);

        when(this.service.findByKeyword("Coke")).thenReturn(
                List.of(new Product((long) 4, "Coke",
                        "A totally healthy beverage that is very tasty.", "Woolworths",
                        "/cokeBottle.png", (long) 69, (long) 6)));

        Collection<Product> p = this.controller.searchForProduct("Coke");
        assertNotNull(p);
        assertEquals(1, p.size());
    }

    // Get all tests
    @Test
    void should_returnCollection_When_getProducts () {
        Product p1 = new Product((long) 1, "T-Shirt",
                "This is a pretty cool shirt.", "Coles",
                "/tshirt.png", (long) 19.99, (long) 20);

        Product p2 = new Product((long) 2, "Coke",
                "A totally healthy beverage that is very tasty.", "Woolworths",
                "/cokeBottle.png", (long) 3.99, (long) 18);

        Product p3 = new Product((long) 3, "Molten Basketball",
                "A nice basketball that is not overpriced at all.", "Woolworths",
                "/basketball.png", (long) 69, (long) 6);

        Product p4 = new Product((long) 4, "Samsung",
                "A new smart watch which is totally necessary.", "Coles",
                "/watch.webp", (long) 200, (long) 3);

        Product p5 = new Product((long) 5, "Coke",
                "A totally healthy beverage that is very tasty.", "Woolworths",
                "/cokeBottle.png", (long) 3.99, (long) 18);

        when(this.service.getProducts()).thenReturn(
                List.of(p1, p2, p3, p4, p5));

        Collection<Product> p = this.controller.getProducts();
        assertNotNull(p);
        assertEquals(5, p.size());
    }

    @Test
    void should_returnEmpty_When_datbaseEmpty() {
        when(this.service.getProducts()).thenReturn(new ArrayList<>());
        Collection<Product> p = this.controller.getProducts();
        assertEquals(0, p.size());
    }

    // Get cart products
    @Test
    void should_returnEmpty_When_cartEmpty() {
        when(this.service.getCartProducts(1)).thenReturn(new ArrayList<>());
        Collection<Product> p = this.controller.getCartProducts(1);
        assertEquals(0, p.size());
    }

    @Test
    void should_returnProducts_When_cartNonEmpty() {
        when(this.service.getCartProducts(1)).thenReturn(
                List.of(new Product((long) 4, "Coke",
                        "A totally healthy beverage that is very tasty.", "Woolworths",
                        "/cokeBottle.png", (long) 69, (long) 6)));
        Collection<Product> p = this.controller.getCartProducts(1);
        assertEquals(1, p.size());
    }

    // addProductToCart test
    @Test
    void should_returnResponseEntity_addProductToCart() {
        CartItem ci = new CartItem(1, 1, 1);
        when(this.service.addToCart(ci)).thenReturn(ci);
        ResponseEntity response = this.controller.addProductToCart(ci);

        assertEquals(ci, response.getBody());
    }

    // remove test
    @Test
    void should_return_ACCEPTEDHttpStatus() {
        ResponseEntity<HttpStatus> response = new ResponseEntity<HttpStatus>(HttpStatus.ACCEPTED);
        assertEquals(response, this.controller.removeProductFromCart(1, 1));
    }
}
