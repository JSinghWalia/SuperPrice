package com.example.superprice.model;

public record Product(int id, String name, String description, String store,
                      String imageURL, double price, int quantity, double discount, boolean notification,
                      String currDate, String promoStartDate, String promoEndDate) {
}
