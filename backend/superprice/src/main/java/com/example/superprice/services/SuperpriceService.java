package com.example.superprice.services;

import com.example.superprice.model.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

public interface SuperpriceService {

    public ArrayList<Product> searchKeyword(String keyword);
}
