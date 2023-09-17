import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CheckOut from '../app/checkout/page';

describe('Shopping Cart page', () => {
    test('Displays header', () => {
        const wrapper = render(<CheckOut />)
        expect(wrapper).toBeTruthy()

        // Get by h1
        const h1 = wrapper.container.querySelector('h1')
        expect(h1?.textContent).toBe('Shopping Cart')
    })
});