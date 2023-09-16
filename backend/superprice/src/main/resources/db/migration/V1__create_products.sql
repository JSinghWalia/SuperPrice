DROP TABLE IF EXISTS products;
CREATE TABLE products
(
    productId          INT PRIMARY KEY AUTO_INCREMENT,
    name               VARCHAR(255)    NOT NULL,
    description        VARCHAR(255)    NOT NULL,
    store              VARCHAR(255)    NOT NULL,
    imageURL           VARCHAR(255)    NOT NULL,
    price              FLOAT           NOT NULL,
    productQuantity    INT             NOT NULL
);

CREATE TABLE cart (
    cartId INT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE cartitem (
    cartItemId        INT PRIMARY KEY AUTO_INCREMENT,
    cartItemQuantity  INT NOT NULL,
    cartId            INT,
    productId         INT,
    foreign key (cartId) references cart(cartId),
    foreign key (productId) references products(productId)
);