package com.example.superprice.repositories;


import com.example.superprice.model.Product;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;

import java.sql.SQLException;
import java.util.Collection;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

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
    @Test
    public void toggleNotification_ON() throws SQLException {
        try {
            // Get the initial product
            Product p = repo.getProducts().get(0);

            // Toggle notifications
            repo.toggleNotification(p.id(), "ON");
            dataSource.getConnection().commit();

            // Check the new product
            p = repo.getProducts().get(0);
            assertTrue(p.notification());
            System.out.println(p.notification());
        } catch (SQLException e) {
            // Handle SQLException
            e.printStackTrace();
            this.dataSource.getConnection().rollback();  // Rollback in case of error
        }
    }

    @Test
    public void toggleNotification_OFF() throws SQLException {
        try {
            // Get the initial product
            Product p = repo.getProducts().get(1);

            // Toggle notifications
            repo.toggleNotification(p.id(), "OFF");
            dataSource.getConnection().commit();

            // Check the new product
            p = repo.getProducts().get(1);
            assertFalse(p.notification());
            System.out.println(p.notification());
        } catch (SQLException e) {
            // Handle SQLException
            e.printStackTrace();
            this.dataSource.getConnection().rollback();  // Rollback in case of error
        }
    }

    @Test
    public void toggleNotification_Invalid_Command() {
        assertThrows(RuntimeException.class, () -> repo.toggleNotification(0, "INVALID COMMAND"));
    }


}
