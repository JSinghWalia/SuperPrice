package com.example.superprice.controllers;

import com.example.superprice.model.Product;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value="v1/superprice")
public class SuperpriceController {

    @GetMapping
    public String all() {
        return "Hello World";
    }

    public ArrayList<Product> searchKeyword(String keyword) {
        ArrayList<Product> test = new ArrayList<Product>();
        return test;
    }
}
