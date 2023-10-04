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
        var products = repo.getProducts();
        assertEquals(5, products.size());
    }

    // Searching for a product

    // With results
    @Test
    public void searchByKeyword_OneResult() {
        // Search for the object
        Collection<Product> expectedObj = repo.findByKeyword("Basketball");
        // Check if it outputs one result.
        assertNotNull(expectedObj);
        assertEquals(1, expectedObj.size());
    }

    @Test
    public void searchByKeyword_Synonym() {
        String keyword = "Basketball";
        // Search for the object that contains "Basketball" in the name
        Collection<Product> expectedObj = repo.findByKeyword("Molten Basketball");
        // Check if the search result is correct
        assertEquals(expectedObj, repo.findByKeyword(keyword));
    }

    @Test
    public void searchByKeyword_MultipleResults() {
        // Search for the object
        Collection<Product> expectedObj = repo.findByKeyword("Coke");
        // Check if it outputs two results. {there are 2 coke records in the db.}
        assertNotNull(expectedObj);
        assertEquals(2, expectedObj.size());
    }
}
