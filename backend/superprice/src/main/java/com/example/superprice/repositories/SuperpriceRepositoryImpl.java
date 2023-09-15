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
            throw new RuntimeException("Error in getAllProducts()", e);
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

    @Override
    public List<Product> getCartProducts(Long inputId) {
        try {
            Connection connection = dataSource.getConnection();
            String cartProductQuery = "SELECT\n" +
                    "    p.productId,\n" +
                    "    p.name,\n" +
                    "    p.description,\n" +
                    "    p.store,\n" +
                    "    p.imageURL,\n" +
                    "    p.price,\n" +
                    "    p.productQuantity\n" +
                    "FROM products p\n" +
                    "JOIN cartitem ci ON p.productId = ci.productId\n" +
                    "WHERE ci.cartId = ?;\n";
            PreparedStatement stm = connection.prepareStatement(cartProductQuery);
            stm.setLong(1, inputId);
            List<Product> products = new ArrayList<>();
            ResultSet rs = stm.executeQuery();
            while (rs.next()) {
                Product p = extractProduct(rs);
                products.add(p);
            }
            connection.close();
            return products;
        } catch (SQLException e) {
            throw new RuntimeException("Error in getAllProducts()", e);
        }
    }

    @Override
    public CartItem addItemToCart(Long quantity, Long cartId, Long productId) {
        try {
            String addQuery =
                    "INSERT INTO cartitem (cartItemQuantity, cartId, productId)\n" +
                            "VALUES (?, ?, ?)";
            PreparedStatement stm = this.dataSource.getConnection().prepareStatement(
                    addQuery,
                    Statement.RETURN_GENERATED_KEYS);

            stm.setLong(1, quantity);
            stm.setLong(2, cartId);
            stm.setLong(3, productId);
            int row = stm.executeUpdate();

            if (getCartProducts(cartId).isEmpty()) {
                throw new RuntimeException("Cart does not exist.");
            }

            ResultSet generatedKeys = stm.getGeneratedKeys();
            if (generatedKeys.next()) {
                Long id = generatedKeys.getLong(1);
                System.out.println("Successfully added item.");
                return new CartItem(quantity, cartId, productId);
            } else {
                throw new SQLException("Creating book failed, no ID obtained.");
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error in create", e);
        }
    }


    @Override
    public Product removeProductFromCart(Long id) {
        return null;
    }


}
