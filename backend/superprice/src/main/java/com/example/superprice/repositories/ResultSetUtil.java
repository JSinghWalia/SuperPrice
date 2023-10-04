package com.example.superprice.repositories;

import com.example.superprice.model.Product;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ResultSetUtil {
    public Product extractProduct(ResultSet rs) throws SQLException {
        return new Product(rs.getLong(1), rs.getString(2), rs.getString(3),
                rs.getString(4), rs.getString(5), rs.getDouble(6), rs.getInt(7),
                rs.getDouble(8), rs.getBoolean(9));
    }
}
