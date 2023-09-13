package com.example.superprice.controllers;

import com.example.superprice.model.Product;
import com.example.superprice.services.SuperpriceService;
import com.example.superprice.services.SuperpriceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value="v1/superprice")
public class SuperpriceController {
    private SuperpriceService service = new SuperpriceServiceImpl();
    @GetMapping
    public String all() {
        return "Hello World";
    }

    public ArrayList<Product> searchKeyword(String keyword) {
        return service.searchKeyword(keyword);
    }
}
