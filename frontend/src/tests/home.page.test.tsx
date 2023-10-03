import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home , {fetchRandomProductImages} from '../app/page';
import { afterAll, afterEach, beforeAll } from 'vitest'
import {products, server} from './mocks/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())


describe('Home page', () => {
    test('Displays header', async () => {
        const wrapper = render(<Home />);
        expect(wrapper).toBeTruthy();

        // Get by h1
        const h1 = await wrapper.container.querySelector('h1');
        expect(h1?.textContent).toBe('Welcome to SuperPrice');
    });
    test('fetch random product images works', async () => {
        const result = await fetchRandomProductImages()
        //expect to fetch all products
        expect(result).toHaveLength(products.length)
    })
});
describe('Home page', () => {
    test('Displays previous product button', () => {
        // Render the Home page component
        render(<Home />);

        // Query for the previous product button
        const prevProduct = screen.getByText('< Prev');

        // Assert that the previous product button is present
        expect(prevProduct).toBeTruthy();
    })
});
describe('Home page', () => {
    test('Displays next product button', () => {
        // Render the Home page component
        render(<Home />);

        // Query for the next product button
        const prevProduct = screen.getByText('Next >');

        // Assert that the next product button is present
        expect(prevProduct).toBeTruthy();
    })
});
describe('Home page', () => {
    test('Displays shop now button', () => {
        // Render the Home page component
        render(<Home />);

        // Query for the shop now button
        const shopNowButton = screen.getByText('Shop Now');

        // Assert that the shop now button is present
        expect(shopNowButton).toBeTruthy();
    })
});