package com.example.superprice.services;

import com.example.superprice.model.CartItem;
import com.example.superprice.model.Product;
import com.example.superprice.repositories.SuperpriceRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class SuperpriceServiceImpl implements SuperpriceService {

    SuperpriceRepository repo;


    @Override
    public List<Product> getProducts() {
        return repo.getProducts();
    }

    @Override
    public Collection<Product> findByKeyword(String keyword) {
        return repo.findByKeyword(keyword);
    }

    @Override
    public Optional<Product> findById(int id) {
        return repo.findById(id);
    }

    @Override
    public List<Product> getCartProducts(int id) {
        return repo.getCartProducts(id);
    }

    @Override
    public CartItem addToCart(CartItem item) {
        return repo.addToCart(item);
    }

    @Override
    public void removeFromCart(int cartId, int productId) {
        repo.removeFromCart(cartId, productId);
    }

    @Override
    public String getNotification(Product p) {
        return repo.getNotification(p);
    }

    @Override
    public float getDiscountedPrice(Product p) {
         return repo.getDiscountedPrice(p);
    }
}
