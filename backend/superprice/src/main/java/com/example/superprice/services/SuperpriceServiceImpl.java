package com.example.superprice.services;

import com.example.superprice.model.CartItem;
import com.example.superprice.model.Product;
import com.example.superprice.repositories.CartRepository;
import com.example.superprice.repositories.NotiRepository;
import com.example.superprice.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class SuperpriceServiceImpl implements SuperpriceService {

    ProductRepository productRepository;
    NotiRepository notiRepository;
    CartRepository cartRepository;

    public SuperpriceServiceImpl(ProductRepository pr, NotiRepository nr, CartRepository cr) {
        productRepository = pr;
        notiRepository = nr;
        cartRepository = cr;
    }

    // ProductsRepository
    @Override
    public List<Product> getProducts() {
        return productRepository.getProducts();
    }

    @Override
    public Collection<Product> findByKeyword(String keyword) {
        return productRepository.findByKeyword(keyword);
    }

    @Override
    public Optional<Product> findById(int id) {
        return productRepository.findById(id);
    }

    // CartRepository
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

    // NotificationsRepository
    @Override
    public List<Product> getPromoProducts() {
        return notiRepository.getProducts();
    }

    @Override
    public List<Product> findByKeywordPromo(String keyword) {
        return notiRepository.findByKeyword(keyword);
    }

    @Override
    public void toggleNotification(int id, String command) throws SQLException {
        productRepository.toggleNotification(id, command);
    }
}
