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
        when(this.service.searchKeyword("completelyunrelatedword")).thenReturn(new ArrayList<>());
        assertEquals(0, this.controller.searchForProduct("completelyunrelatedword").size());
    }

    @Test
    void should_returnProduct_When_relatedProducts() {
        Product p1 = new Product((long) 4, "Coke",
                "A totally healthy beverage that is very tasty.", "Woolworths",
                "/cokeBottle.png", (long) 69, (long) 6, 0, false);

        when(this.service.searchKeyword("Coke")).thenReturn(
                List.of(new Product((long) 4, "Coke",
                        "A totally healthy beverage that is very tasty.", "Woolworths",
                        "/cokeBottle.png", (long) 69, (long) 6, 0, false)));

        Collection<Product> p = this.controller.searchForProduct("Coke");
        assertNotNull(p);
        assertEquals(1, p.size());
    }

    // Get all tests
    @Test
    void should_returnCollection_When_getProducts() {
        Product p1 = new Product((long) 1, "T-Shirt",
                "This is a pretty cool shirt.", "Coles",
                "/tshirt.png", (long) 19.99, (long) 20, 0, false);

        Product p2 = new Product((long) 2, "Coke",
                "A totally healthy beverage that is very tasty.", "Woolworths",
                "/cokeBottle.png", (long) 3.99, (long) 18, 0, true);

        Product p3 = new Product((long) 3, "Molten Basketball",
                "A nice basketball that is not overpriced at all.", "Woolworths",
                "/basketball.png", (long) 69, (long) 6, 0.05F, false);

        Product p4 = new Product((long) 4, "Samsung",
                "A new smart watch which is totally necessary.", "Coles",
                "/watch.webp", (long) 200, (long) 3, 0.010F, true);

        Product p5 = new Product((long) 5, "Coke",
                "A totally healthy beverage that is very tasty.", "Woolworths",
                "/cokeBottle.png", (long) 3.99, (long) 18, 0, true);

        when(this.service.getAllProducts()).thenReturn(
                List.of(p1, p2, p3, p4, p5));

        Collection<Product> p = this.controller.getProducts();
        assertNotNull(p);
        assertEquals(5, p.size());
    }

    @Test
    void should_returnEmpty_When_datbaseEmpty() {
        when(this.service.getAllProducts()).thenReturn(new ArrayList<>());
        Collection<Product> p = this.controller.getProducts();
        assertEquals(0, p.size());
    }

    // Get cart products
    @Test
    void should_returnEmpty_When_cartEmpty() {
        when(this.service.getCartProducts(1L)).thenReturn(new ArrayList<>());
        Collection<Product> p = this.controller.getCartProducts(1L);
        assertEquals(0, p.size());
    }

    @Test
    void should_returnProducts_When_cartNonEmpty() {
        when(this.service.getCartProducts(1L)).thenReturn(
                List.of(new Product((long) 2, "Coke",
                        "A totally healthy beverage that is very tasty.", "Woolworths",
                        "/cokeBottle.png", (long) 3.99, (long) 18, 0, true)));
        Collection<Product> p = this.controller.getCartProducts(1L);
        assertEquals(1, p.size());
    }

    // addProductToCart test
    @Test
    void should_returnResponseEntity_addProductToCart() {
        CartItem ci = new CartItem(1L, 1L, 1L);
        when(this.service.addItemToCart(1L, 1L, 1L)).thenReturn(ci);
        ResponseEntity response = this.controller.addProductToCart(1L, 1L, 1L);

        assertEquals(ci, response.getBody());
    }

    // remove test
    @Test
    void should_return_ACCEPTEDHttpStatus() {
        ResponseEntity<HttpStatus> response = new ResponseEntity<HttpStatus>(HttpStatus.ACCEPTED);
        assertEquals(response, this.controller.remove(1L, 1L));
    }

    // Notifications
    @Test
    void notifications_displayPromoMessage() {
        // Add a placeholder value onto the database
        Product p = new Product((long) 1, "T-Shirt",
                "This is a pretty cool shirt.", "Coles",
                "/tshirt.png", (long) 19.99, (long) 20, 0.10F, true);

        // Set the expected message
        float discountedPrice = p.price() - (p.price() * p.promotion());
        String expected = String.format("There's a promotion for %s (ID: %d)!\nOriginal price: $%.2f, New price: $%.2f",
                p.name(), p.id(), p.price(), discountedPrice);

        when(this.service.getAllProducts()).thenReturn(List.of(p));
        when(this.service.getNotification(p)).thenReturn(expected);

        // Check if the output message is correct
        assertEquals(expected, this.controller.getProductNotification(0));
    }

    @Test
    void notifications_NotificationsAreOff() {
        // Add a placeholder value onto the database
        Product p = new Product((long) 1, "T-Shirt",
                "This is a pretty cool shirt.", "Coles",
                "/tshirt.png", (long) 19.99, (long) 20, 0.05F, false);

        // Set expected
        String expected = "Notifications are off.";
        when(service.getAllProducts()).thenReturn(List.of(p));
        when(service.getNotification(p)).thenReturn(expected);

        // Check if the output message is correct
        assertEquals(expected, this.controller.getProductNotification(0));

    }

    @Test
    void notifications_NoPromotion() {
        // Add a placeholder value onto the database
        Product p = new Product((long) 1, "T-Shirt",
                "This is a pretty cool shirt.", "Coles",
                "/tshirt.png", (long) 19.99, (long) 20, 0, true);

        // Set expected
        String expected = String.format("There is no promotion for %d %s.",
                p.id(), p.name());
        when(service.getAllProducts()).thenReturn(List.of(p));
        when(service.getNotification(p)).thenReturn(expected);

        // Check if the output message is correct
        assertEquals(expected, this.controller.getProductNotification(0));
    }

    @Test
    void notifications_NotificationsAndPromotions_AreOff() {
        // Add a placeholder value onto the database
        Product p = new Product((long) 1, "T-Shirt",
                "This is a pretty cool shirt.", "Coles",
                "/tshirt.png", (long) 19.99, (long) 20, 0, true);

        // Set expected
        String expected = String.format("Notifications are off and there are no promotions for %d %s.", p.id(), p.name());
        when(service.getAllProducts()).thenReturn(List.of(p));
        when(service.getNotification(p)).thenReturn(expected);

        // Check if the output message is correct
        assertEquals(expected, this.controller.getProductNotification(0));
    }
}
