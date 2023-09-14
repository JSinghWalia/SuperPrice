package com.example.superprice.services;

import com.example.superprice.model.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface SuperpriceService {

    List<Product> getAllProducts();
    public Collection<Product> searchKeyword(String keyword);


}
