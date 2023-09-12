package com.example.superprice.repositories;

import com.example.superprice.model.Product;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.Optional;

@Repository
public class SuperpriceRepositoryImpl implements SuperpriceRepository {

    private final DataSource dataSource;
    public SuperpriceRepositoryImpl(DataSource dataSource) {
        this.dataSource = dataSource;
    }
    @Override
    public Optional<Product> searchForItem(String keyword) {
        return Optional.empty();
    }
}
