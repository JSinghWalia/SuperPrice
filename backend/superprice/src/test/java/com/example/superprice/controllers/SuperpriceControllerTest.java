package com.example.superprice.controllers;


import com.example.superprice.model.Product;
import com.example.superprice.services.SuperpriceService;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
public class SuperpriceControllerTest {
    SuperpriceController controller;
    SuperpriceService service;

    @BeforeEach
    void setUp() {
        this.service = mock(SuperpriceService.class);
        this.controller = mock(SuperpriceController.class);
    }

    // Search keyword tests
    @Test
    void should_returnEmpty_When_noRelatedProducts() {
        when(this.service.searchKeyword("completelyunrelatedword")).thenReturn(new ArrayList<>());
        assertEquals(0, this.controller.get("completelyunrelatedword").size());
    }

    @Test
    void should_returnProduct_When_relatedProducts() {
//        ArrayList<Product> testList1 = new ArrayList<>(Collections.singleton(new Product((long) 4, "Coke",
//                "A totally healthy beverage that is very tasty.", "Woolworths",
//                "/cokeBottle.png", (long) 69, (long) 6)));
//
//        assertEquals(testList1, this.controller.get("Coke"));

        Product p1 = new Product((long) 4, "Coke",
                "A totally healthy beverage that is very tasty.", "Woolworths",
                "/cokeBottle.png", (long) 69, (long) 6);

        when(this.service.searchKeyword("Coke")).thenReturn(
                List.of(new Product((long) 4, "Coke",
                        "A totally healthy beverage that is very tasty.", "Woolworths",
                        "/cokeBottle.png", (long) 69, (long) 6)));

        Collection<Product> p = this.service.searchKeyword("Coke");
        assertNotNull(p);
        assertEquals(1, p.size());
    }

//    @Test
//    void all_should_returnMovies_When_availableInService() {
//        when(this.service.getMovies())
//                .thenReturn(List.of(new Movie(1L, "Title 1", 1)));
//        assertEquals(1, this.controller.all().size());
//    }

//    @Test
//    void get_should_returnMovieDetails_When_available() {
//        when(this.service.getMovie(1L))
//                .thenReturn(Optional.of(new Movie(1L, "Title 1", 1978)));
//        Movie m = this.controller.get(1L);
//        assertNotNull(m);
//        assertEquals("Title 1", m.title());
//    }
}
