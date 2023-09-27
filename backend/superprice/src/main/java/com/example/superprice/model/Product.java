package com.example.superprice.model;

// promotion: true if product has a promotion, false if there is no promotion
// notification: true if user has notifications on, false if user does not have notification on.
public record Product(Long id, String name, String description, String store, String imageURL, float price, Long quantity, float promotion, boolean notification) {
}
