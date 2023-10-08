package com.example.superprice.repositories;

import com.example.superprice.model.CartItem;
import com.example.superprice.model.Product;

import java.util.List;

public interface CartRepository {
    List<Product> getCartProducts(int id);

    CartItem addToCart(CartItem item);

    void removeFromCart(int cartId, int productId);
}
