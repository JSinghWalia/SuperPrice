import { setupServer } from 'msw/node'
import { rest } from 'msw'

export const products = [
    {
        id: 1,
        name: 'T-Shirt',
        description: 'This is a pretty cool shirt.',
        store: 'Coles',
        imageURL: '/tshirt.png',
        price: 20,
        quantity: 20
    },
    {
        id: 2,
        name: 'Coke',
        description: 'A totally healthy beverage that is very tasty.',
        store: 'Woolworths',
        imageURL: '/cokeBottle.png',
        price: 4,
        quantity: 18
    },
    {
        id: 3,
        name: 'Molten Basketball',
        description: 'A nice basketball that is not overpriced at all.',
        store: 'Woolworths',
        imageURL: '/basketball.png',
        price: 69,
        quantity: 6
    },
    {
        id: 4,
        name: 'Samsung Watch',
        description: 'A new smartwatch which is totally necessary.',
        store: 'Coles',
        imageURL: '/watch.webp',
        price: 200,
        quantity: 3
    },
    {
        id: 5,
        name: 'Coke',
        description: 'A totally healthy beverage that is very tasty.',
        store: 'Coles',
        imageURL: '/cokeBottle.png',
        price: 4,
        quantity: 18
    }
]
export const basketballSearch = [
    {
        id: 3,
        name: 'Molten Basketball',
        description: 'A nice basketball that is not overpriced at all.',
        store: 'Woolworths',
        imageURL: '/basketball.png',
        price: 69,
        quantity: 6
    },
]

export const handlers = [
    rest.get('http://localhost:8080/:searchTerm', (req, res, ctx) => {
        // You can use req.params.searchTerm to access the searchTerm if needed
        return res(ctx.status(200), ctx.json(products));
    }),
    rest.get('http://localhost:8080/:basketball', (req, res, ctx) => {
        // You can use req.params.searchTerm to access the searchTerm if needed
        return res(ctx.status(200), ctx.json(basketballSearch));
    }),
    rest.get('http://localhost:8080', (req, res, ctx) => {
        // You can use req.params.searchTerm to access the searchTerm if needed
        return res(ctx.status(200), ctx.json(products));
    })

]

// This configures a Service Worker with the given request handlers.
export const server = setupServer(...handlers)