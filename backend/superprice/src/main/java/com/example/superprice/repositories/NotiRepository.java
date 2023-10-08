package com.example.superprice.repositories;

import com.example.superprice.model.Product;

import java.sql.SQLException;
import java.util.List;

public interface NotiRepository {

    List<Product> getProducts();

    List<Product> findByKeyword(String keyword);
}
