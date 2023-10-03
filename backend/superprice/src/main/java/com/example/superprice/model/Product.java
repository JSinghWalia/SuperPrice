package com.example.superprice.model;

public record Product(Long id, String name, String description, String store, String imageURL, Long price, Long quantity) {
}
