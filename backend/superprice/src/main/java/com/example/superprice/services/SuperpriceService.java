package com.example.superprice.services;

import com.example.superprice.model.CartItem;
import com.example.superprice.model.Product;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface SuperpriceService {

    List<Product> getAllProducts();

    Collection<Product> searchKeyword(String keyword);

    List<Product> getCartProducts(Long inputId);

    CartItem addItemToCart(Long quantity, Long cartId, Long productId);

    Product removeProductFromCart(Long id);


}
