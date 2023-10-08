INSERT INTO products (name, description, store, imageURL, price, productQuantity, promotion, notification, currDate,
                      promoStartDate, promoEndDate)
VALUES ('T-Shirt', 'This is a pretty cool shirt.', 'Coles', '/tshirt.png', 19.99, 20, 0, false, '07-07-2000',
        '01-07-2000', '15-07-2000'),                           -- currently promo
       ('Coke', 'A totally healthy beverage that is very tasty.', 'Woolworths', '/cokeBottle.png', 3.99, 18, 0, true,
        '07-07-2000', '01-07-2000', '06-07-2000'),             -- past promo
       ('Molten Basketball', 'A nice basketball that is not overpriced at all.', 'Woolworths', '/basketball.png', 69, 6,
        0.05, true, '07-07-2000', '10-07-2000', '24-07-2000'), -- future promo
       ('Samsung Watch', 'A new smartwatch which is totally necessary.', 'Coles', '/watch.webp', 200, 3, 0.10, true,
        '07-07-2000', '20-06-2000', '10-07-2000'),             -- currently promo started diff month
       ('Coke', 'A totally healthy beverage that is very tasty.', 'Coles', '/cokeBottle.png', 3.99, 18, 0, false,
        '07-07-2000', '05-07-2000', '01-08-2000') -- currently promo ending next month
;

INSERT INTO cart (cartId)
VALUES (1)
;

INSERT INTO cartitem (cartItemQuantity, cartId, productId)
VALUES
    -- CART 1
    (2, 1, 1), -- 2 t-shirts
    (3, 1, 2), -- 3 cokes (woolies)
    (1, 1, 3), -- 1 Molten Basketball
    (4, 1, 4), -- 4 Samsung Watch
    (2, 1, 5)  -- 2 cokes from coles o_O
;