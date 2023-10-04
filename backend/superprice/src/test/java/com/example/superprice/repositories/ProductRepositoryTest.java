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
public class ProductRepositoryTest {

    @Autowired
    private Flyway flyway;

    @Autowired
    DataSource dataSource;
    ProductRepository repo;

    @BeforeEach
    private void setUp() {
        flyway.migrate();
        repo = new ProductRepositoryImpl(dataSource);
    }

    @AfterEach
    private void tearDown() {
        flyway.clean();
    }

    @Test
    public void getProducts_AllProducts() {
        var products = repo.getProducts();
        assertEquals(5, products.size());
    }

    @Test
    public void findByKeyword_OneResult() {
        // Search for the object
        Collection<Product> expectedObj = repo.findByKeyword("Molten Basketball");
        // Check if it outputs one result.
        assertNotNull(expectedObj);
        assertEquals(1, expectedObj.size());
    }

    @Test
    public void findByKeyword_Synonym() {
        String keyword = "Basketball";
        // Search for the object that contains "Basketball" in the name
        Collection<Product> expectedObj = repo.findByKeyword("Basketball");
        // Check if the search result is correct
        assertEquals(expectedObj, repo.findByKeyword(keyword));
    }

    @Test
    public void findByKeyword_MultipleResults() {
        // Search for the object
        Collection<Product> expectedObj = repo.findByKeyword("Coke");
        // Check if it outputs two results. {there are 2 coke records in the db.}
        assertNotNull(expectedObj);
        assertEquals(2, expectedObj.size());
    }
}
