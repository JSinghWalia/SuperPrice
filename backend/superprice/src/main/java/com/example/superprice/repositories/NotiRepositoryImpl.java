package com.example.superprice.repositories;

import com.example.superprice.model.Product;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class NotiRepositoryImpl implements NotiRepository {
    private final DataSource dataSource;
    private ResultSetUtil resultSetUtil = new ResultSetUtil();

    public NotiRepositoryImpl(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public List<Product> getProducts() {
        try {
            Connection connection = dataSource.getConnection();
            // Execute query
            String query = "SELECT * FROM products WHERE notification = TRUE AND promotion > 0;";

            PreparedStatement stm = connection.prepareStatement(query);
            ResultSet rs = stm.executeQuery();

            // Get product objects and add them into ArrayList
            List<Product> products = new ArrayList<>();
            while (rs.next()) {
                Product p = resultSetUtil.extractProduct(rs);
                products.add(p);
            }

            // Close the connection and return list of products
            connection.close();
            return products;

        } catch (SQLException e) {
            throw new RuntimeException("Error in getting promo products", e);
        }
    }

    @Override
    public List<Product> findByKeyword(String keyword) {
        try {
            // Execute query
            // source: W3schools, https://www.w3schools.com/sql/sql_like.asp
            String query = "SELECT * \n" +
                    "FROM products \n" +
                    "WHERE LOWER(name) LIKE '%' || LOWER(?) || '%' \n" +
                    "AND notification = TRUE \n" +
                    "AND promotion > 0;";
            PreparedStatement stm = this.dataSource.getConnection().prepareStatement(query);
            stm.setString(1, "%" + keyword + "%");
            ResultSet rs = stm.executeQuery();

            // Get the product objects and add them into ArrayList
            List<Product> products = new ArrayList<>();
            while (rs.next()) {
                products.add(resultSetUtil.extractProduct(rs));
            }

            return products;

        } catch (SQLException e) {
            throw new RuntimeException("Error in product search", e);
        }
    }
}
