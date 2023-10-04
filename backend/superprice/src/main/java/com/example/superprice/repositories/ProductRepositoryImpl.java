package com.example.superprice.repositories;

import com.example.superprice.model.Product;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public class ProductRepositoryImpl implements ProductRepository {

    private final DataSource dataSource;

    public ProductRepositoryImpl(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    private Product extractProduct(ResultSet rs) throws SQLException {
        return new Product(rs.getLong(1), rs.getString(2), rs.getString(3),
                rs.getString(4), rs.getString(5), rs.getDouble(6), rs.getInt(7),
                rs.getDouble(8), rs.getBoolean(9));
    }

    @Override
    public List<Product> getProducts() {
        try {
            Connection connection = dataSource.getConnection();
            // Execute query
            String query = "SELECT * FROM products;";
            PreparedStatement stm = connection.prepareStatement(query);
            ResultSet rs = stm.executeQuery();

            // Get product objects and add them into ArrayList
            List<Product> products = new ArrayList<>();
            while (rs.next()) {
                Product p = extractProduct(rs);
                products.add(p);
            }

            // Close the connection and return list of products
            connection.close();
            return products;
        } catch (SQLException e) {
            throw new RuntimeException("Error in getting products", e);
        }
    }

    @Override
    public Collection<Product> findByKeyword(String keyword) {
        try {
            // Execute query
            // source: W3schools, https://www.w3schools.com/sql/sql_like.asp
            String query = "SELECT * FROM products WHERE LOWER(name) LIKE '%' || LOWER(?) || '%';";
            PreparedStatement stm = this.dataSource.getConnection().prepareStatement(query);
            stm.setString(1, "%" + keyword + "%");
            ResultSet rs = stm.executeQuery();

            // Get the product objects and add them into ArrayList
            List<Product> products = new ArrayList<>();
            while (rs.next()) {
                products.add(extractProduct(rs));
            }

            return products;

        } catch (SQLException e) {
            throw new RuntimeException("Error in product search", e);
        }
    }

    @Override
    public Optional<Product> findById(int id) {
        try {
            PreparedStatement stm = this.dataSource.getConnection().prepareStatement(
                    "SELECT * FROM products WHERE productId = ?");
            stm.setInt(1, id);
            ResultSet rs = stm.executeQuery();
            if (rs.next()) {
                return Optional.of(extractProduct(rs));
            }
            return Optional.empty();
        } catch (SQLException e) {
            throw new RuntimeException("Error in findById", e);
        }
    }
}
