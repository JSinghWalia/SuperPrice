import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Products, {fetchProducts} from '../app/products/page';
import { afterAll, afterEach, beforeAll } from 'vitest'
import {products, server} from './mocks/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

describe('Products page', () => {
    test('Displays header', () => {
        const wrapper = render(<Products />);
        expect(wrapper).toBeTruthy();

        // Get by h1
        const h1 = wrapper.container.querySelector('h1');
        expect(h1?.textContent).toBe('Products');
    });

    test('Displays search bar', () => {
        // Render the Products component
        render(<Products />);

        // Query for the search input element
        const searchBar = screen.getByPlaceholderText('Search...');

        // Assert that the search bar is present
        expect(searchBar).toBeTruthy();
    });
    test('fetch products works', async () => {
        const result = await fetchProducts()
        //expect to fetch all products
        expect(result).toHaveLength(products.length)
    })

    test('Search for basketball returns the correct product', async () => {
        // Render the Products component
        render(<Products />);

        // Query for the search input element
        const searchBar = screen.getByPlaceholderText('Search...');

        // Simulate typing "basketball" into the search bar
        fireEvent.change(searchBar, { target: { value: 'basketball' } });

        // Query for the submit button and click it
        const submitButton = screen.getByText('Submit');
        fireEvent.click(submitButton);

        // Wait for the server response
        await screen.findByText('Molten Basketball');

        // Query for the product card with the expected product name
        const productCard = screen.getByText('Molten Basketball');

        // Assert that the correct product card is displayed
        expect(productCard).toBeTruthy();
    });
});