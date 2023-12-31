package com.example.superprice.services;

import com.example.superprice.model.CartItem;
import com.example.superprice.model.Product;

import java.sql.SQLException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface SuperpriceService {

    List<Product> getProducts();

    Collection<Product> findByKeyword(String keyword);

    Optional<Product> findById(int id);

    List<Product> getCartProducts(int id);

    CartItem addToCart(CartItem item);

    void removeFromCart(int cartId, int productId);

    List<Product> getPromoProducts();

    List<Product> findByKeywordPromo(String keyword);

    void toggleNotification(int id, String command) throws SQLException;


}
