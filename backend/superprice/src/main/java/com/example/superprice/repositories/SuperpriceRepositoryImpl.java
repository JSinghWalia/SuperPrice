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
                rs.getString(4), rs.getString(5), rs.getDouble(6), rs.getInt(7));
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
                    "SELECT * FROM products WHERE id = ?");
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

    @Override
    public List<Product> getCartProducts(int id) {
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
                    "ci.cartItemQuantity\n" +
                    "FROM products p\n" +
                    "JOIN cartitem ci ON p.productId = ci.productId\n" +
                    "WHERE ci.cartId = ?;\n";
            PreparedStatement stm = connection.prepareStatement(query);
            stm.setLong(1, id);
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
    public CartItem addToCart(CartItem item) {
        try {
            // Execute Query
            String query = "INSERT INTO cartitem (cartItemQuantity, cartId, productId)\n" +
                    "VALUES (?, ?, ?)";
            PreparedStatement stm = this.dataSource.getConnection().prepareStatement
                    (query, Statement.RETURN_GENERATED_KEYS);

            stm.setLong(1, item.quantity());
            stm.setLong(2, item.cartId());
            stm.setLong(3, item.productId());
            int row = stm.executeUpdate();

            // If the cartId does not exist, throw exception
            if (getCartProducts(item.cartId()).isEmpty()) {
                throw new RuntimeException("Cart does not exist.");
            }

            // Check if item was added successfully
            ResultSet generatedKeys = stm.getGeneratedKeys();


            if (generatedKeys.next()) {
                Long id = generatedKeys.getLong(1);
                return new CartItem(item.quantity(), item.cartId(), item.productId());
            } else {
                throw new SQLException("SQL Error in adding item");
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error in trying to add item to cart", e);
        }
    }
    @Override
    public void removeFromCart(int cartId, int productId) {
        try {
            // Execute Query
            String query = "DELETE FROM cartitem\n" +
                    "WHERE cartId = ? AND productId = ?";
            PreparedStatement stm = dataSource.getConnection().prepareStatement
                    (query, Statement.RETURN_GENERATED_KEYS);
            stm.setLong(1, cartId);
            stm.setLong(2, productId);

            int row = stm.executeUpdate();

            if (row == 0) {
                throw new SQLException("Failed to remove " + productId + " from cart " + cartId);
            }

        } catch (SQLException e) {
            throw new RuntimeException("Error in remove from cart.", e);
        }
    }


}
