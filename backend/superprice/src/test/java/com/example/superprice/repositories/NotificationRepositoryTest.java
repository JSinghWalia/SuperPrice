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
public class NotificationRepositoryTest {

    @Autowired
    private Flyway flyway;

    @Autowired
    DataSource dataSource;
    NotificationsRepository repo;

    @BeforeEach
    private void setUp() {
        flyway.migrate();
        repo = new NotificationsRepositoryImpl(dataSource);
    }

    @AfterEach
    private void tearDown() {
        flyway.clean();
    }

    @Test
    public void getProducts_AllPromoProducts() {
        List<Product> products = repo.getProducts();
        assertEquals(2, products.size());
    }

    // Scenario: Finding item with VALID keyword
    @Test
    public void findByKeyword_Success() {
        assertEquals(1, repo.findByKeyword("Basketball").size());
    }

    // Scenario: Finding item with INVALID keyword
    @Test
    public void findByKeyword_Fail() {
        assertEquals(0, repo.findByKeyword("No result").size());
    }
}
