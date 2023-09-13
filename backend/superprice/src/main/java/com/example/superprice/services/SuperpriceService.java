package com.example.superprice.services;

import com.example.superprice.model.Product;

import java.util.ArrayList;

public interface SuperpriceService {
    public ArrayList<Product> searchKeyword(String keyword);
}
