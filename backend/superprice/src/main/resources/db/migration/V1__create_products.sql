DROP TABLE IF EXISTS products;
CREATE TABLE products
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(255)    NOT NULL,
    description VARCHAR(255)    NOT NULL,
    store       VARCHAR(255)    NOT NULL,
    imageURL    VARCHAR(255)    NOT NULL,
    price       FLOAT           NOT NULL,
    quantity    INT             NOT NULL
);

INSERT INTO products (name, description, store, imageURL, price, quantity)
VALUES ('T-Shirt', 'This is a pretty cool shirt.', 'Coles', '/tshirt.png', 19.99, 20);

INSERT INTO products (name, description, store, imageURL, price, quantity)
VALUES ('Coke', 'A totally healthy beverage that is very tasty.', 'Woolworths', '/cokeBottle.png', 3.99, 18);

INSERT INTO products (name, description, store, imageURL, price, quantity)
VALUES ('Molten Basketball', 'A nice basketball that is not overpriced at all.', 'Woolworhts', '/basketball.png', 69, 6);

INSERT INTO products (name, description, store, imageURL, price, quantity)
VALUES ('Samsung Watch', 'A new smart watch which is totally necessary.', 'Coles', '/watch.webp', 200, 3);