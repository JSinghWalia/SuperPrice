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