package com.example.superprice.repositories;

import com.example.superprice.model.CartItem;
import com.example.superprice.model.Product;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
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
    public Collection<Product> searchForItem(String keyword) {
        try {
            // Execute query
            // source: W3schools, https://www.w3schools.com/sql/sql_like.asp
            String query = "SELECT * FROM products WHERE name LIKE ?";
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
    public List<Product> getCartProducts(Long inputId) {
        try {
            // Execute Query
            Connection connection = dataSource.getConnection();
            String query = "SELECT\n" +
                    "p.productId,\n" +
                    "p.name,\n" +
                    "p.description,\n" +
                    "p.store,\n" +
                    "p.imageURL,\n" +
                    "p.price,\n" +
                    "p.productQuantity\n" +
                    "FROM products p\n" +
                    "JOIN cartitem ci ON p.productId = ci.productId\n" +
                    "WHERE ci.cartId = ?;\n";
            PreparedStatement stm = connection.prepareStatement(query);
            stm.setLong(1, inputId);
            ResultSet rs = stm.executeQuery();

            // Get the product objects and add them into ArrayList
            List<Product> products = new ArrayList<>();
            while (rs.next()) {
                Product p = extractProduct(rs);
                products.add(p);
            }

            // Close the connection and return list of products
            connection.close();
            return products;
        } catch (SQLException e) {
            throw new RuntimeException("Error in getting cart products", e);
        }
    }

    @Override
    public CartItem addItemToCart(Long quantity, Long cartId, Long productId) {
        try {
            // Execute Query
            String query = "INSERT INTO cartitem (cartItemQuantity, cartId, productId)\n" +
                    "VALUES (?, ?, ?)";
            PreparedStatement stm = this.dataSource.getConnection().prepareStatement
                    (query, Statement.RETURN_GENERATED_KEYS);

            stm.setLong(1, quantity);
            stm.setLong(2, cartId);
            stm.setLong(3, productId);
            int row = stm.executeUpdate();

            // If the cartId does not exist, throw exception
            if (getCartProducts(cartId).isEmpty()) {
                throw new RuntimeException("Cart does not exist.");
            }

            // Check if item was added successfully
            ResultSet generatedKeys = stm.getGeneratedKeys();
            if (generatedKeys.next()) {
                Long id = generatedKeys.getLong(1);
                return new CartItem(quantity, cartId, productId);
            } else {
                throw new SQLException("SQL Error in adding item");
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error in trying to add item to cart", e);
        }
    }


    @Override
    public Product removeProductFromCart(Long id) {
        return null;
    }


}
