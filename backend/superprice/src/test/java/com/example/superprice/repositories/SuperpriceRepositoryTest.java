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
        String keyword = "Molten Basketball";
        Collection<Product> expectedObj = repo.searchForItem(keyword);
        assertEquals(expectedObj, repo.searchForItem("Basketball"));
    }

    @Test
    public void searchByKeyword_MultipleResults() {
        String keyword = "Coke";
        Collection<Product> expectedObj = repo.searchForItem(keyword);
        assertEquals(expectedObj, repo.searchForItem(keyword));
    }

    // No results
    @Test
    public void searchByKeyword_NoResults() {
        String keyword = "No result";
        assertTrue(repo.searchForItem(keyword).isEmpty());
    }

}
