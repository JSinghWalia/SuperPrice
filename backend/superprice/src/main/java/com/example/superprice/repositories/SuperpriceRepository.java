package com.example.superprice.repositories;

import com.example.superprice.model.Product;

import java.util.List;
import java.util.Optional;

public interface SuperpriceRepository {

    List<Product> getAllProducts();
    Optional<Product> searchForItem(String keyword);
}
