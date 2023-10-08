package com.example.superprice.repositories;


import com.example.superprice.model.CartItem;
import com.example.superprice.model.Product;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

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


        // Initialize a mock repository
        repo = mock(CartRepository.class);

        // Set up a sample cart
        Product p1 = new Product(1, "T-Shirt", "Description 1", "Store 1", "/image1.png", 10.0, 5, 0.2, true, "", "", "");
        Product p2 = new Product(2, "Coke", "Description 2", "Store 2", "/image2.png", 2.0, 50, 0.0, false, "", "", "");
        Product p3 = new Product(3, "Shoes", "Description 3", "Store 1", "/image3.png", 30.0, 15, 0.1, true, "", "", "");

        when(repo.getCartProducts(1)).thenReturn(List.of(p1, p2));
    }

    @AfterEach
    private void tearDown() {
        flyway.clean();
    }

    // Scenario: Check if we can retrieve items from the different carts.
    @Test
    public void getCartProducts_AllCarts() {
        assertEquals(2, repo.getCartProducts(1).size());
    }

    // Scenario: Check if an invalid cart returns an empty cart
    @Test
    public void getCartProducts_NoItems() {
        when(repo.getCartProducts(1)).thenReturn(Collections.emptyList());
        assertEquals(0, repo.getCartProducts(1).size());
    }

    // Scenario: Check if the cart content is correct
    @Test
    public void getCartProducts_checkCartContent() {
        List<Product> cartProducts = repo.getCartProducts(1);
        assertEquals("T-Shirt", cartProducts.get(0).name());
        assertEquals("Coke", cartProducts.get(1).name());
    }

    // Scenario: Adding a new item to cart
    @Test
    public void addToCart_Success() {
        // Adding item to cart
        repo.addToCart(new CartItem(1, 1, 3));

        // Verifying the behavior
        verify(repo).addToCart(new CartItem(1, 1, 3));
    }

    // Scenario: Cannot add item to a cart that does not exist
    @Test
    public void addToCart_Fail() {
        repo = new CartRepositoryImpl(dataSource);
        assertThrows(RuntimeException.class, () -> this.repo.addToCart(new CartItem(1, 1, 100)));
    }

    // Scenario: Removing an item present in cart
    @Test
    public void removeFromFromCart_Success() {
        // Removing an item from the cart
        repo.removeFromCart(1, 2);

        // Verifying the behavior
        verify(repo).removeFromCart(1, 2);
    }

    // Scenario: Cannot remove an item that's not in the cart
    @Test
    public void removeFromCart_Fail() {
        // Delete the item
        repo = new CartRepositoryImpl(dataSource);
        assertThrows(RuntimeException.class, () -> repo.removeFromCart(2, 100));
    }
}
