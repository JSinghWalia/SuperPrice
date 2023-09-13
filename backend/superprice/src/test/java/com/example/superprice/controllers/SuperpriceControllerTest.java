package com.example.superprice.controllers;


import com.example.superprice.model.Product;
import com.example.superprice.services.SuperpriceService;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
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

    @Test
    void should_returnEmpty_When_noRelatedProducts () {
        when(this.service.searchKeyword("completelyunrelatedword")).thenReturn(new ArrayList<>());
        assertEquals(0, this.controller.searchKeyword("completelyunrelatedword").size());
    }

    @Test
    void should_returnProduct_When_relatedProducts () {
        ArrayList<Product> testList = new ArrayList<>(Collections.singleton(new Product((long) 4, "Coke",
                "A totally healthy beverage that is very tasty.", "Woolworths",
                "/cokeBottle.png", (long) 69, (long) 6)));
        when(this.service.searchKeyword("Coke")).thenReturn(testList);

        assertFalse(this.controller.searchKeyword("Coke").isEmpty());
    }
}
