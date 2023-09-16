import { setupServer } from 'msw/node'
import { rest } from 'msw'

export const products = [
    {
        id: 't1',
        name: 'T-Shirt',
        imageSrc: '/tshirt.png',
        images: ['/tshirt.png', '/tshirt2.png'],
        description: 'This is a T-Shirt',
        price: '$19.99'
    },
    {
        id: 't2',
        name: 'Coke',
        imageSrc: '/cokeBottle.png',
        images: ['/cokeBottle.png', '/cokeBottle2.png'],
        description: 'This is a Coke',
        price: '$3.99'
    },
    {
        id: 't3',
        name: 'Molten Basketball',
        imageSrc: '/basketball.png',
        images: ['/basketball.png', '/basketball2.png'],
        description: 'This is a Molten Basketball',
        price: '$69'
    },
    {
        id: 't4',
        name: 'Samsung Watch',
        imageSrc: '/watch.webp',
        images: ['/watch.webp', '/watch2.webp'],
        description: 'This is a Samsung Watch',
        price: '$200'
    },
    {
        id: 't5',
        name: 'Boost Chocolate',
        imageSrc: '/boostchocolate.webp',
        images: ['/boostchocolate.webp', '/boostchocolate2.webp'],
        description: 'This is a Boost Chocolate',
        price: '$2.99'
    },
    {
        id: 't6',
        name: 'Banana',
        imageSrc: '/banana.png',
        images: ['/banana.png', '/banana2.png'],
        description: 'This is a Banana',
        price: '$1.00'
    }

]

export const handlers = [
    rest.get('http://localhost:3000/products', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(products))
    }),
]

// This configures a Service Worker with the given request handlers.
export const server = setupServer(...handlers)