package com.example.superprice.repositories;


import com.example.superprice.model.CartItem;
import com.example.superprice.model.Product;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;
import java.util.Collection;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CartRepositoryTest {

    @Autowired
    private Flyway flyway;

    @Autowired
    DataSource dataSource;
    CartRepository repo;

    @BeforeEach
    private void setUp() {
        flyway.migrate();
        repo = new CartRepositoryImpl(dataSource);
    }

    @AfterEach
    private void tearDown() {
        flyway.clean();
    }

    // Scenario: Check if we can retrieve items from the different carts.
    @Test
    public void getProductsInCart() {
        assertEquals(5, repo.getCartProducts(1).size());
        assertEquals(2, repo.getCartProducts(2).size());
        assertEquals(3, repo.getCartProducts(3).size());
    }

    // Scenario: Check if an invalid cart returns an empty cart
    @Test
    public void getProductsInCart_NoItems() {
        assertEquals(0, repo.getCartProducts(4).size());
    }

    // Scenario: Check if the cart content is correct
    @Test
    public void checkCartContent() {
        // Cart 1
        List<Product> c1 = repo.getCartProducts(1);
        String c1Item1 = c1.get(0).name();
        String c1Item2 = c1.get(1).name();
        String c1Item3 = c1.get(2).name();

        assertEquals("T-Shirt", c1Item1);
        assertEquals("Coke", c1Item2);
        assertEquals("Molten Basketball", c1Item3);
    }

    // Adding items to cart
    @Test
    public void addItemToCart_Success() {
        // Check size before
        assertEquals(5, repo.getCartProducts(1).size());

        // Add the item
        repo.addToCart(new CartItem(1, 1, 1));

        // Check size after
        assertEquals(6, repo.getCartProducts(1).size());
    }

    // Scenario: Cannot add item to a cart that does not exist.
    @Test
    public void addItemToCart_Fail() {
        assertThrows(RuntimeException.class, () -> this.repo.addToCart(new CartItem(1, 1, 100)));
    }

    // Remove items from cart
    @Test
    public void removeItemFromCart_Success() {
        // Check size before
        assertEquals(2, repo.getCartProducts(2).size());

        // Delete the item
        repo.removeFromCart(2, 1);

        // Check size after
        assertEquals(1, repo.getCartProducts(2).size());

        // Verify the object
        assertEquals("Molten Basketball", repo.getCartProducts(2).get(0).name());
    }

    @Test
    public void removeItemFromCart_Fail() {
        // Delete the item
        assertThrows(RuntimeException.class, () -> repo.removeFromCart(2, 100));
    }
}
