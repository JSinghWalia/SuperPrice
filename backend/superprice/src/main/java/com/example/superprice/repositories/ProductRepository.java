package com.example.superprice.repositories;

import com.example.superprice.model.Product;

import java.sql.SQLException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface ProductRepository {

    List<Product> getProducts();

    Collection<Product> findByKeyword(String keyword);

    Optional<Product> findById(int id);

    void toggleNotification(int id, String command) throws SQLException;
}
