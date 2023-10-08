import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Products from '../app/products/page';
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

});