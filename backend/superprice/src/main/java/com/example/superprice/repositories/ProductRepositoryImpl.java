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
    private ResultSetUtil resultSetUtil = new ResultSetUtil();

    public ProductRepositoryImpl(DataSource dataSource) {
        this.dataSource = dataSource;
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
                Product p = resultSetUtil.extractProduct(rs);
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
                products.add(resultSetUtil.extractProduct(rs));
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
                return Optional.of(resultSetUtil.extractProduct(rs));
            }
            return Optional.empty();
        } catch (SQLException e) {
            throw new RuntimeException("Error in findById", e);
        }
    }

    @Override
    public void toggleNotification(int id, String command) throws SQLException {
        try {
            if (command.equals("ON")) {
                turnOnNotification(id);
                System.out.println("Turned on notification.");
            } else if (command.equals("OFF")) {
                turnOffNotification(id);
                System.out.println("Turned off notification.");
            } else
                throw new RuntimeException("Invalid command, ON/OFF only.");
        } catch (SQLException e) {
            throw new SQLException("Error in toggleNotification", e);
        }
    }

    @Override
    public void turnOnNotification(int id) throws SQLException {
        try {
            String query = "UPDATE products SET notification = TRUE WHERE productId = ?";
            PreparedStatement stm = this.dataSource.getConnection().prepareStatement(query);
            stm.setInt(1, id);
            int rowsUpdated = stm.executeUpdate();

            if (rowsUpdated > 0) {
                System.out.println("Notification updated successfully for productId: " + id);
            } else {
                System.out.println("No rows were updated for productId: " + id);
            }

        } catch (SQLException e) {
            throw new SQLException("Error in turning on notifications", e);
        }
    }

    @Override
    public void turnOffNotification(int id) throws SQLException {
        try {
            String query = "UPDATE products SET notification = FALSE WHERE productId = ?";
            PreparedStatement stm = this.dataSource.getConnection().prepareStatement(query);
            stm.setInt(1, id);
            int rowsUpdated = stm.executeUpdate();

            if (rowsUpdated > 0) {
                System.out.println("Notification updated successfully for productId: " + id);
            } else {
                System.out.println("No rows were updated for productId: " + id);
            }

        } catch (SQLException e) {
            throw new SQLException("Error in turning on notificaitons", e);
        }
    }
}
