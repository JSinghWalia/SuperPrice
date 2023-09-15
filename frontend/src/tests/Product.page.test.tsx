import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Products from '../app/products/page';

describe('Products page', () => {
    test('Displays header', () => {
        const wrapper = render(<Products />)
        expect(wrapper).toBeTruthy()

        // Get by h1
        const h1 = wrapper.container.querySelector('h1')
        expect(h1?.textContent).toBe('Products')
    })
});