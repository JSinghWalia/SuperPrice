INSERT INTO products (name, description, store, imageURL, price, productQuantity, promotion, notification)
VALUES
    ('T-Shirt', 'This is a pretty cool shirt.', 'Coles', '/tshirt.png', 19.99, 20, false, false),
    ('Coke', 'A totally healthy beverage that is very tasty.', 'Woolworths', '/cokeBottle.png', 3.99, 18, false, true),
    ('Molten Basketball', 'A nice basketball that is not overpriced at all.', 'Woolworhts', '/basketball.png', 69, 6, true, false),
    ('Samsung Watch', 'A new smart watch which is totally necessary.', 'Coles', '/watch.webp', 200, 3, true, true),
    ('Coke', 'A totally healthy bevemvnrage that is very tasty.', 'Coles', '/cokeBottle.png', 3.99, 18, false, false)
;

INSERT INTO cart (cartId)
VALUES
    (1),
    (2),
    (3),
    (4)
;

INSERT INTO cartitem (cartItemQuantity, cartId, productId)
VALUES
    -- CART 1
    (2, 1, 1), -- 2 t-shirts
    (3, 1, 2), -- 3 cokes (woolies)
    (1, 1, 3), -- 1 Molten Basketball
    (4, 1, 4), -- 4 Samsung Watch
    (2, 1, 5), -- 2 cokes from coles o_O

    -- CART 2
    (1, 2, 1), -- 1 t-shirt
    (500, 2, 3), -- 500 Molten Basketball

    -- CART 3
    (5, 3, 1), -- 5 t-shirts
    (10, 3, 5), -- 10 cokes (coles)
    (7, 3, 2) -- 7 cokes (woolies)
;