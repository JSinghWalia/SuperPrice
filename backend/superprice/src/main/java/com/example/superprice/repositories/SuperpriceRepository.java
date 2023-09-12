package com.example.superprice.repositories;

import com.example.superprice.model.Product;

import java.util.Optional;

public interface SuperpriceRepository {

    Optional<Product> searchForItem(String keyword);
}
