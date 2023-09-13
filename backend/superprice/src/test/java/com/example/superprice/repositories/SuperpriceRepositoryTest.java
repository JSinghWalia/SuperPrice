package com.example.superprice.repositories;


import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;

import static org.junit.jupiter.api.Assertions.assertEquals;

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
}

//    @Test
//    public void searchForKeyword_validInput() {
//        assertEquals("Item 1", repo.searchForItem("Item 1"));
//    }
//
//    @Test
//    public void searchForKeyword_invalidResult() {
//        assertEquals("Item 1", repo.searchForItem("Item 1"));
//    }
//
//    @Test
//    public void searchForKeyword_oneResult() {
//        assertEquals("Item 1", repo.searchForItem("Item 1"));
//    }
//
//    @Test
//    public void searchForKeyword_multipleResults() {
//        assertEquals("Item 1", repo.searchForItem("Item 1"));
//    }
//}
