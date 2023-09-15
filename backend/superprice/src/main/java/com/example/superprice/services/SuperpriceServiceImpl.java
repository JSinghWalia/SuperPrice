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

    public SuperpriceServiceImpl(SuperpriceRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Product> getAllProducts() {
        return repo.getAllProducts();
    }

    @Override
    public Collection<Product> searchKeyword(String keyword) {
        return repo.searchForItem(keyword);
    }

    @Override
    public List<Product> getCartProducts(Long inputId) {
        return repo.getCartProducts(inputId);
    }

    @Override
    public CartItem addItemToCart(Long quantity, Long cartId, Long productId) {
        return repo.addItemToCart(quantity, cartId, productId);
    }

    @Override
    public void removeProductFromCart(Long cartId, Long productId) {
        repo.removeProductFromCart(cartId, productId);
    }
}
