
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../app/page';

describe('Home page', () => {
    test('Displays header', () => {
        const wrapper = render(<Home />)
        expect(wrapper).toBeTruthy()

        // Get by h1
        const h1 = wrapper.container.querySelector('h1')
        expect(h1?.textContent).toBe('Welcome to SuperPrice')
    })
});