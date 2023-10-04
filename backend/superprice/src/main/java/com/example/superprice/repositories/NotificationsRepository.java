package com.example.superprice.repositories;

import com.example.superprice.model.Product;

import java.util.List;

public interface NotificationsRepository {

    List<Product> getProducts();

    List<Product> findByKeyword(String keyword);
}
