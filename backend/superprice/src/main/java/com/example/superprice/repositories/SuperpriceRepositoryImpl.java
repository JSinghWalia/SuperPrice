package com.example.superprice.repositories;

import com.example.superprice.model.Product;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public class SuperpriceRepositoryImpl implements SuperpriceRepository {

    private final DataSource dataSource;

    public SuperpriceRepositoryImpl(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    private Product extractProduct(ResultSet rs) throws SQLException {
        return new Product(rs.getLong(1), rs.getString(2), rs.getString(3),
                rs.getString(4), rs.getString(5), rs.getLong(6), rs.getLong(7));
    }

    @Override
    public List<Product> getAllProducts() {
        try {
            Connection connection = dataSource.getConnection();
            PreparedStatement stm = connection.prepareStatement("SELECT * FROM products;");
            List<Product> products = new ArrayList<>();
            ResultSet rs = stm.executeQuery();
            while (rs.next()) {
                Product p = extractProduct(rs);
                products.add(p);
            }
            connection.close();
            return products;
        } catch (SQLException e) {
            throw new RuntimeException("Error in findAll", e);
        }
    }

    @Override
    public Collection<Product> searchForItem(String keyword) {
        try {
            // source: W3schools, https://www.w3schools.com/sql/sql_like.asp
            PreparedStatement stm = this.dataSource.getConnection().prepareStatement(
                    "SELECT * FROM products WHERE name LIKE ?");
            stm.setString(1, "%" + keyword + "%");
            ResultSet rs = stm.executeQuery();
            List<Product> products = new ArrayList<>();
            while (rs.next()) {
                products.add(extractProduct(rs));
            }

            return products;

        } catch (SQLException e) {
            throw new RuntimeException("Error in searchForItem(keyword)", e);
        }
    }
}
