package com.example.superprice.services;

import com.example.superprice.model.CartItem;
import com.example.superprice.model.Product;
import com.example.superprice.repositories.CartRepository;
import com.example.superprice.repositories.NotificationsRepository;
import com.example.superprice.repositories.SuperpriceRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class SuperpriceServiceImpl implements SuperpriceService {

    SuperpriceRepository superpriceRepository;
    NotificationsRepository notificationsRepository;
    CartRepository cartRepository;

    public SuperpriceServiceImpl(SuperpriceRepository sr, NotificationsRepository nr, CartRepository cr) {
        superpriceRepository = sr;
        notificationsRepository = nr;
        cartRepository = cr;
    }

    @Override
    public List<Product> getProducts() {
        return superpriceRepository.getProducts();
    }

    @Override
    public Collection<Product> findByKeyword(String keyword) {
        return superpriceRepository.findByKeyword(keyword);
    }

    @Override
    public Optional<Product> findById(int id) {
        return superpriceRepository.findById(id);
    }

    @Override
    public List<Product> getCartProducts(int id) {
        return cartRepository.getCartProducts(id);
    }

    @Override
    public CartItem addToCart(CartItem item) {
        return cartRepository.addToCart(item);
    }

    @Override
    public void removeFromCart(int cartId, int productId) {
        cartRepository.removeFromCart(cartId, productId);
    }

    @Override
    public List<Product> getPromoProducts() {
        return notificationsRepository.getProducts();
    }

    @Override
    public List<Product> findByKeywordPromo(String keyword) {
        return notificationsRepository.findByKeyword(keyword);
    }
}
