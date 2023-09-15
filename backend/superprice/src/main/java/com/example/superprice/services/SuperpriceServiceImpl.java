package com.example.superprice.services;

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

    // To be fixed
    @Override
    public Collection<Product> searchKeyword(String keyword) {
        return repo.searchForItem(keyword);
    }

    @Override
    public List<Product> getCartProducts() {
        return repo.getCartProducts();
    }

    @Override
    public Product addItemToCart(Product product) {
        return repo.addItemToCart(product);
    }

    @Override
    public Product removeProductFromCart(Long id) {
        return null;
    }
}
