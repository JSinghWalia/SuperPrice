//package com.example.superprice.controllers;
//
//
//import com.example.superprice.model.CartItem;
//import com.example.superprice.model.Product;
//import com.example.superprice.services.SuperpriceService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//
//import java.sql.SQLException;
//import java.util.ArrayList;
//import java.util.Collection;
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//import static org.mockito.Mockito.*;
//
//@SpringBootTest
//public class SuperpriceControllerTest {
//    SuperpriceController controller;
//    SuperpriceService service;
//
//    @BeforeEach
//    void setUp() {
//        this.service = mock(SuperpriceService.class);
//        this.controller = new SuperpriceController(this.service);
//    }
//
//    // Search keyword tests
//    @Test
//    void should_returnEmpty_When_noRelatedProducts() {
//        // Mocking the service to return an empty list when searching for a completely unrelated keyword
//        when(this.service.findByKeyword("completelyunrelatedword")).thenReturn(new ArrayList<>());
//
//        // Calling the controller to search for a product with a completely unrelated keyword
//        // and asserting that the result is an empty list
//        assertEquals(0, this.controller.searchForProduct("completelyunrelatedword").size());
//    }
//
//    @Test
//    void should_returnProduct_When_relatedProducts() {
//        // Mocking the service to return one product when searching for "Coke"
//        Product p1 = new Product(4, "Coke",
//                "A totally healthy beverage that is very tasty.", "Woolworths",
//                "/cokeBottle.png", 69, 6, 0, true,
//                "currDate", "promoStartDate", "promoEndDate");
//
//        // Mocking the service to return a list with one product (similar to p1) when searching for "Coke"
//        when(this.service.findByKeyword("Coke")).thenReturn(
//                List.of(new Product(4, "Coke",
//                        "A totally healthy beverage that is very tasty.", "Woolworths",
//                        "/cokeBottle.png", 69, 6, 0.5, true,
//                        "currDate", "promoStartDate", "promoEndDate")));
//
//        // Calling the controller to search for a product with the keyword "Coke"
//        Collection<Product> p = this.controller.searchForProduct("Coke");
//
//        // Check if the product is not null
//        assertNotNull(p);
//
//        // Check if result contains one product
//        assertEquals(1, p.size());
//    }
//
//    // Get all tests
//    @Test
//    void should_returnCollection_When_getProducts() {
//        // Create sample product instances
//        Product p1 = new Product(1, "T-Shirt",
//                "This is a pretty cool shirt.", "Coles",
//                "/tshirt.png", 19.99, 20, 0, false,
//                "currDate", "promoStartDate", "promoEndDate");
//
//        Product p2 = new Product(2, "Coke",
//                "A totally healthy beverage that is very tasty.", "Woolworths",
//                "/cokeBottle.png", 3.99, 18, 0.5, false,
//                "currDate", "promoStartDate", "promoEndDate");
//
//        Product p3 = new Product(3, "Molten Basketball",
//                "A nice basketball that is not overpriced at all.", "Woolworths",
//                "/basketball.png", 69, 6, 0.2, true,
//                "currDate", "promoStartDate", "promoEndDate");
//
//        Product p4 = new Product(4, "Samsung",
//                "A new smart watch which is totally necessary.", "Coles",
//                "/watch.webp", 200, 3, 0, true,
//                "currDate", "promoStartDate", "promoEndDate");
//
//        Product p5 = new Product(5, "Coke",
//                "A totally healthy beverage that is very tasty.", "Woolworths",
//                "/cokeBottle.png", 3.99, 18, 0, true,
//                "currDate", "promoStartDate", "promoEndDate");
//
//        // Mocking the service to return a list of products when requested
//        when(this.service.getProducts()).thenReturn(
//                List.of(p1, p2, p3, p4, p5));
//
//        // Calling controller to get list of products
//        Collection<Product> p = this.controller.getProducts();
//
//        // Checking results are not null
//        assertNotNull(p);
//
//        // Checking the result contains 5 products
//        assertEquals(5, p.size());
//    }
//
//    @Test
//    void emptyDatabase_DisplayBlankResults() {
//        // Mocking the service to return an empty list when getting all products
//        when(this.service.getProducts()).thenReturn(new ArrayList<>());
//        // Calling controller to get list of products
//        Collection<Product> p = this.controller.getProducts();
//        // Check if the result is empty
//        assertEquals(0, p.size());
//    }
//
//    // Get cart products
//    @Test
//    void emptyCart_DisplayBlankResults() {
//        // Mocking the service to return an empty list when getting cart products
//        when(this.service.getCartProducts(1)).thenReturn(new ArrayList<>());
//        // Calling controller to get cart products
//        Collection<Product> p = this.controller.getCartProducts(1);
//        // Check if result is empty
//        assertEquals(0, p.size());
//    }
//
//    @Test
//    void should_returnProducts_When_cartNonEmpty() {
//        // Mocking the service to return a list with one product when
//        // getting cart products
//        when(this.service.getCartProducts(1)).thenReturn(
//                List.of(new Product(4, "Coke",
//                        "A totally healthy beverage that is very tasty.", "Woolworths",
//                        "/cokeBottle.png", 69, 6, 0.2, true,
//                        "currDate", "promoStartDate", "promoEndDate")));
//        // Calling controller to get cart products
//        Collection<Product> p = this.controller.getCartProducts(1);
//        // Check if result has one item
//        assertEquals(1, p.size());
//    }
//
//    // addToCart Tests
//    @Test
//    void should_returnResponseEntity_addProductToCart() {
//        // Create a CartItem instance
//        CartItem ci = new CartItem(1, 1, 1);
//        // Mocking service to return 'ci' when adding it to the cart.
//        when(this.service.addToCart(ci)).thenReturn(ci);
//        // Calling the controller to add the CartItem to the cart
//        ResponseEntity response = this.controller.addToCart(ci);
//        // Asserting that the response body is equal to the CartItem 'ci'
//        assertEquals(ci, response.getBody());
//    }
//
//    // removeFromCart Tests
//    @Test
//    void should_return_ACCEPTEDHttpStatus() {
//        // Creating a ResponseEntity with HttpStatus ACCEPTED
//        ResponseEntity<HttpStatus> response = new ResponseEntity<HttpStatus>(HttpStatus.ACCEPTED);
//        // Checking that the response matches the expected response with HttpStatus ACCEPTED
//        assertEquals(response, this.controller.removeFromCart(1, 1));
//    }
//
//    // Notification tests
//
//    @Test
//    void getPromoProducts_Success() {
//        // Creating sample Product instances
//        Product p1 = new Product(1, "T-Shirt",
//                "This is a pretty cool shirt.", "Coles",
//                "/tshirt.png", 19.99, 20, 0, true,
//                "currDate", "promoStartDate", "promoEndDate");
//
//        Product p2 = new Product(2, "Coke",
//                "A totally healthy beverage that is very tasty.", "Woolworths",
//                "/cokeBottle.png", 3.99, 18, 0.5, true,
//                "currDate", "promoStartDate", "promoEndDate");
//
//        Product p3 = new Product(3, "Molten Basketball",
//                "A nice basketball that is not overpriced at all.", "Woolworths",
//                "/basketball.png", 69, 6, 0.2, true,
//                "currDate", "promoStartDate", "promoEndDate");
//
//        // Mocking the service to return a list of products when requested
//        when(this.service.getPromoProducts()).thenReturn(
//                List.of(p1, p2, p3));
//
//        // Calling the controller to get the list of products on promotion
//        Collection<Product> p = this.controller.getPromoProducts();
//
//        // Check if the result is not null AND the there are 3 items in the list
//        assertNotNull(p);
//        assertEquals(3, p.size());
//    }
//
//    @Test
//    public void testUpdateProductNotification_WhenProductExists() throws SQLException {
//        // Mock data
//        int productId = 1;
//        String command = "ON";
//        Product mockProduct = new Product(productId, "Test Product", "Description", "Store", "image.png", 100.0, 10, 0.0, false, "currDate", "promoStartDate", "promoEndDate");
//
//        // Mock service.findById
//        when(service.findById(productId)).thenReturn(Optional.of(mockProduct));
//
//        // Call the method
//        ResponseEntity<Product> responseEntity = controller.updateProductNotification(productId, command, mockProduct);
//
//        // Verify the response
//        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
//        assertEquals(mockProduct, responseEntity.getBody());
//
//        // Verify that toggleNotification was called with correct parameters
//        verify(service).toggleNotification(productId, command);
//    }
//
//    @Test
//    public void testUpdateProductNotification_WhenProductDoesNotExist() throws SQLException {
//        // Mock data
//        int productId = 1;
//        String command = "ON";
//
//        // Mock service.findById to return empty Optional
//        when(service.findById(productId)).thenReturn(Optional.empty());
//
//        // Call the method
//        ResponseEntity<Product> responseEntity = controller.updateProductNotification(productId, command, null);
//
//        // Verify the response
//        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
//    }
//}
