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
public class SuperpriceRepositoryTest {

    @Autowired
    private Flyway flyway;

    @Autowired
    DataSource dataSource;
    SuperpriceRepository repo;

    @BeforeEach
    private void setUp() {
        flyway.migrate();
        repo = new SuperpriceRepositoryImpl(dataSource);
    }

    @AfterEach
    private void tearDown() {
        flyway.clean();
    }

    // Getting list of products
    @Test
    public void completeListOfProducts() {
        var products = repo.getAllProducts();
        assertEquals(5, products.size());
    }

    // Searching for a product

    // With results
    @Test
    public void searchByKeyword_OneResult() {
        // Search for the object
        Collection<Product> expectedObj = repo.searchForItem("Basketball");
        // Check if it outputs one result.
        assertNotNull(expectedObj);
        assertEquals(1, expectedObj.size());
    }

    @Test
    public void searchByKeyword_Synonym() {
        String keyword = "Basketball";
        // Search for the object that contains "Basketball" in the name
        Collection<Product> expectedObj = repo.searchForItem("Molten Basketball");
        // Check if the the search result is correct
        assertEquals(expectedObj, repo.searchForItem(keyword));
    }

    @Test
    public void searchByKeyword_MultipleResults() {
        // Search for the object
        Collection<Product> expectedObj = repo.searchForItem("Coke");
        // Check if it outputs two results. {there are 2 coke records in the db.}
        assertNotNull(expectedObj);
        assertEquals(2, expectedObj.size());
    }
    
    // Getting products from the cart database

    // Scenario: Check if we can retrieve items from the different carts.
    @Test
    public void getProductsInCart() {
        assertEquals(5, repo.getCartProducts(1L).size());
        assertEquals(2, repo.getCartProducts(2L).size());
        assertEquals(3, repo.getCartProducts(3L).size());
    }

    // Scenario: Check if an invalid cart returns an empty cart
    @Test
    public void getProductsInCart_NoItems() {
        assertEquals(0, repo.getCartProducts(4L).size());
    }

    // Scenario: Check if the cart content is correct
    @Test
    public void checkCartContent() {
        // Cart 1
        List<Product> c1 = repo.getCartProducts(1L);
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
        assertEquals(5, repo.getCartProducts(1L).size());

        // Add the item
        repo.addItemToCart(1L, 1L, 1L);

        // Check size after
        assertEquals(6, repo.getCartProducts(1L).size());
    }

    // Scenario: Cannot add item to a cart that does not exist.
    @Test
    public void addItemToCart_Fail() {
        assertThrows(RuntimeException.class, () -> this.repo.addItemToCart(1L, 100L, 1L));
    }

    // Remove items from cart
    @Test
    public void removeItemFromCart_Success() {
        // Check size before
        assertEquals(2, repo.getCartProducts(2L).size());

        // Delete the item
        repo.removeProductFromCart(2L, 1L);

        // Check size after
        assertEquals(1, repo.getCartProducts(2L).size());

        // Verify the object
        assertEquals("Molten Basketball", repo.getCartProducts(2L).get(0).name());
    }

    @Test
    public void removeItemFromCart_Fail() {
        // Delete the item
        assertThrows(RuntimeException.class, () -> repo.removeProductFromCart(2L, 100L));
    }
}
