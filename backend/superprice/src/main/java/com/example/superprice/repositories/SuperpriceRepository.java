package com.example.superprice.repositories;

import com.example.superprice.model.CartItem;
import com.example.superprice.model.Product;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface SuperpriceRepository {

    List<Product> getProducts();

    Collection<Product> findByKeyword(String keyword);

    Optional<Product> findById(int id);

    List<Product> getCartProducts(int id);

    CartItem addToCart(CartItem item);

    void removeFromCart(int cartId, int productId);

    List<Product> getPromoProducts();


}
