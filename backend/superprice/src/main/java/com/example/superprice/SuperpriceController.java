package com.example.superprice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="v1/superprice")
public class SuperpriceController {

    @GetMapping
    public String all() {
        return "Hello World";
    }
}
