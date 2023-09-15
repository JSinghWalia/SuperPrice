import { setupServer } from 'msw/node'
import { rest } from 'msw'


export const productsData = [
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
        store: 'Woolworhts',
        imageURL: '/basketball.png',
        price: 69,
        quantity: 6
    },
    {
        id: 4,
        name: 'Samsung Watch',
        description: 'A new smart watch which is totally necessary.',
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


export const handlers = [
    rest.get('http://localhost:8080/v1/superprice', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(productsData))
    }),
]

// This configures a Service Worker with the given request handlers.
export const server = setupServer(...handlers)