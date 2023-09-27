package com.example.superprice.repositories;

import com.example.superprice.model.CartItem;
import com.example.superprice.model.Product;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface SuperpriceRepository {

    List<Product> getAllProducts();

    Collection<Product> searchForItem(String keyword);

    List<Product> getCartProducts(Long inputId);

    CartItem addItemToCart(Long quantity, Long cartId, Long productId);

    void removeProductFromCart(Long cartId, Long productId);

    boolean getNotification(Product p);

}
