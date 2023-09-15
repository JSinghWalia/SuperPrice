package com.example.superprice.repositories;


import com.example.superprice.model.Product;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;

import java.util.Collection;

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
        Collection<Product> expectedObj = repo.searchForItem("Molten Basketball");
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

    // No results
    @Test
    public void searchByKeyword_NoResults() {
        String keyword = "No result";
        assertTrue(repo.searchForItem(keyword).isEmpty());
    }

    // Getting products from the cart database

    // Scenario: There is at least one item in the cart
    @Test
    public void getProductsInCart_OneItem() {
        assertEquals(1, repo.getCartProducts().size());
    }

    @Test
    public void getProductsInCart_MultipleItems() {
        assertEquals(repo.getCartProducts().size() > 1, repo.getCartProducts().size());
    }

    @Test
    public void getProductsInCart_NoItems() {
        assertEquals(0, repo.getCartProducts().size());
    }

    // Adding items to cart
    @Test
    public void addItemToCart_Success() {

    }

    @Test
    public void addItemToCart_Fail() {
    }

    // Remove items from cart
    @Test
    public void removeItemFromCart_Success() {
    }

    @Test
    public void removeItemFromCart_Fail() {
    }
}
