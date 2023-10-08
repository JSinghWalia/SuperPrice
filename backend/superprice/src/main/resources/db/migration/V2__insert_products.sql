INSERT INTO products (name, description, store, imageURL, price, productQuantity, promotion, notification, currDate, promoStartDate, promoEndDate)
VALUES
    ('T-Shirt', 'This is a pretty cool shirt.', 'Coles', '/tshirt.png', 19.99, 20, 0, false, '07-07-2000', '01-07-2000', '15-07-2000'), -- currently promo
    ('Coke', 'A totally healthy beverage that is very tasty.', 'Woolworths', '/cokeBottle.png', 3.99, 18, 0, true, '07-07-2000', '01-07-2000', '06-07-2000'), -- past promo
    ('Molten Basketball', 'A nice basketball that is not overpriced at all.', 'Woolworths', '/basketball.png', 69, 6, 0.05, true, '07-07-2000', '10-07-2000', '24-07-2000'), -- future promo
    ('Samsung Watch', 'A new smartwatch which is totally necessary.', 'Coles', '/watch.webp', 200, 3, 0.10, true, '07-07-2000', '20-06-2000', '10-07-2000'), -- currently promo started diff month
    ('Coke', 'A totally healthy beverage that is very tasty.', 'Coles', '/cokeBottle.png', 3.99, 18, 0, false, '07-07-2000', '05-07-2000', '01-08-2000'), -- currently promo ending next month

    -- Sprite
    ('Sprite', 'A refreshing drink!', 'Coles', '/sprite.png', 4,20, 0, false, '07-07-2000', '01-07-2000', '15-07-2000'),
    ('Sprite', 'A refreshing drink!', 'Woolworths', '/sprite.png', 4.99, 18, 0, true, '07-07-2000', '01-07-2000', '06-07-2000'),
    ('Sprite', 'A refreshing drink!', 'Cosco', '/sprite.png', 4, 28, 0.05, true, '07-07-2000', '10-07-2000', '24-07-2000'),
    ('Sprite', 'A refreshing drink!', 'BWS', '/sprite.png', 5, 43, 0.10, true, '07-07-2000', '20-06-2000', '10-07-2000'),
    ('Sprite', 'A refreshing drink!', 'Coles Express', '/sprite.png', 4.50, 30, 0, false, '07-07-2000', '05-07-2000', '01-08-2000'),

    -- Apple Watch
    ('Apple Watch', 'A newer smarter watcher.', 'Apple', '/appleWatch.png', 499, 500, 0, false, '07-07-2000', '01-07-2000', '15-07-2000'),
    ('Apple Watch', 'A newer smarter watcher.', 'JB-Hi-Fi', '/appleWatch.png', 499, 50, 0, true, '07-07-2000', '01-07-2000', '06-07-2000'),
    ('Apple Watch', 'A newer smarter watcher.', 'Woolworths', '/appleWatch.png', 499, 20, 0.05, true, '07-07-2000', '10-07-2000', '24-07-2000'),
    ('Apple Watch', 'A newer smarter watcher.', 'Coles', '/appleWatch.png', 499, 20, 0.10, true, '07-07-2000', '20-06-2000', '10-07-2000'),
    ('Apple Watch', 'A newer smarter watcher.', 'Target', '/appleWatch.png', 499, 20, 0, false, '07-07-2000', '05-07-2000', '01-08-2000'),

    -- Singlet
    ('Singlet', 'Dripped.', 'Woolworths', '/singlet.png', 19.99, 55, 0, false, '07-07-2000', '01-07-2000', '15-07-2000'),
    ('Singlet', 'Dripped.', 'Coles', '/singlet.png', 18.99, 48, 0, true, '07-07-2000', '01-07-2000', '06-07-2000'),
    ('Singlet', 'Dripped.', 'Target', '/singlet.png', 21.99, 52, 0.05, true, '07-07-2000', '10-07-2000', '24-07-2000'),
    ('Singlet', 'Dripped.', 'Big W', '/singlet.png', 20.99, 29, 0.10, true, '07-07-2000', '20-06-2000', '10-07-2000'),
    ('Singlet', 'Dripped.', 'JB-Hi-Fi', '/singlet.png', 17.99, 50, 0, false, '07-07-2000', '05-07-2000', '01-08-2000'),

    -- Baseball
    ('Baseball', 'Can bounce to the moon! (legally cannot)', 'Big W', '/baseball.png', 30,20, 0, false, '07-07-2000', '01-07-2000', '15-07-2000'),
    ('Baseball', 'Can bounce to the moon! (legally cannot)', 'JB-Hi-Fi', '/baseball.png', 39.99, 18, 0, true, '07-07-2000', '01-07-2000', '06-07-2000'),
    ('Baseball', 'Can bounce to the moon! (legally cannot)', 'Woolworths', '/baseball.png', 34.99, 28, 0.05, true, '07-07-2000', '10-07-2000', '24-07-2000'),
    ('Baseball', 'Can bounce to the moon! (legally cannot)', 'Coles', '/baseball.png', 35, 43, 0.10, true, '07-07-2000', '20-06-2000', '10-07-2000'),
    ('Baseball', 'Can bounce to the moon! (legally cannot)', 'Target', '/baseball.png', 29, 30, 0, false, '07-07-2000', '05-07-2000', '01-08-2000'),

    -- Football
    ('Football', 'Used in the AFL.', 'Big W', '/football.png', 69.99,18, 0, false, '07-07-2000', '01-07-2000', '15-07-2000'),
    ('Football', 'Used in the AFL.', 'JB-Hi-Fi', '/football.png', 79.99, 40, 0, true, '07-07-2000', '01-07-2000', '06-07-2000'),
    ('Football', 'Used in the AFL.', 'Woolworths', '/football.png', 80, 28, 0.05, true, '07-07-2000', '10-07-2000', '24-07-2000'),
    ('Football', 'Used in the AFL.', 'Coles', '/football.png', 84.99, 28, 0.10, true, '07-07-2000', '20-06-2000', '10-07-2000'),
    ('Football', 'Used in the AFL.', 'Target', '/football.png', 75.50, 58, 0, false, '07-07-2000', '05-07-2000', '01-08-2000'),

    -- Fanta
    ('Fanta', 'Do not shake me!', 'Coles', '/fanta.png', 4,20, 0, false, '07-07-2000', '01-07-2000', '15-07-2000'),
    ('Fanta', 'Do not shake me!', 'Woolworths', '/fanta.png', 4.99, 18, 0, true, '07-07-2000', '01-07-2000', '06-07-2000'),
    ('Fanta', 'Do not shake me!', 'Cosco', '/fanta.png', 4, 28, 0.05, true, '07-07-2000', '10-07-2000', '24-07-2000'),
    ('Fanta', 'Do not shake me!', 'Big W', '/fanta.png', 5, 43, 0.10, true, '07-07-2000', '20-06-2000', '10-07-2000'),
    ('Fanta', 'Do not shake me!', 'Coles Express', '/fanta.png', 4.50, 30, 0, false, '07-07-2000', '05-07-2000', '01-08-2000')
;

INSERT INTO cart (cartId)
VALUES
    (1),
    (2),
    (3),
    (4)
;

-- INSERT INTO cartitem (cartItemQuantity, cartId, productId)
-- VALUES
-- --     -- CART 1
-- --     (2, 1, 1), -- 2 t-shirts
-- --     (3, 1, 2), -- 3 cokes (woolies)
-- --     (1, 1, 3), -- 1 Molten Basketball
-- --     (4, 1, 4), -- 4 Samsung Watch
-- --     (2, 1, 5), -- 2 cokes from coles o_O
-- --
-- --     -- CART 2
-- --     (1, 2, 1), -- 1 t-shirt
-- --     (500, 2, 3), -- 500 Molten Basketball
-- --
-- --     -- CART 3
-- --     (5, 3, 1), -- 5 t-shirts
-- --     (10, 3, 5), -- 10 cokes (coles)
-- --     (7, 3, 2) -- 7 cokes (woolies)
-- ;