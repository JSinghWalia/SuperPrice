"use client";
import * as React from 'react';
import Link from 'next/link';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// Function to fetch notification products count
async function fetchNotificationProductCount() {
    try {
        const baseUrl =  process.env.NEXT_PUBLIC_API_URL + "/notifications"; // Define the base URL

        const res = await fetch(baseUrl);

        if (!res.ok) {
            throw new Error(`Network response was not ok (${res.status} - ${res.statusText})`);
        }

        const data = await res.json();
        return data.length; // Return the count of notification products
    } catch (error) {
        console.error("Error fetching notification product count:", error);
        return 0; // Return 0 if there's an error
    }
}


function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
}

interface NavbarProps {
    activePath: string;
}

export const Navbar = ({ activePath }: NavbarProps) => {

    const [activeNavItem, setActiveNavItem] = React.useState(activePath);
    const [notificationCount, setNotificationCount] = React.useState(0); // State for notification count

    const navigation = [
        { name: 'Home', href: '/', current: activeNavItem === 'Home' },
        { name: 'Products', href: '/products', current: activeNavItem === 'Products' },
    ];

    React.useEffect(() => {
        // Fetch notification count when the component mounts
        async function fetchCount() {
            const count = await fetchNotificationProductCount();
            setNotificationCount(count);
        }
        fetchCount();
    }, []);

    function handleNavItemClick(name: string) {
        setActiveNavItem(name);
    }

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link href="/">
                                        <img
                                            className="h-8 w-auto"
                                            src="/logo.png"
                                            alt="Logo"
                                        />
                                    </Link>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                onClick={() => handleNavItemClick(item.name)}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <Link href="/notifications">
                                    <button
                                        type="button"
                                        className="relative rounded-full bg-gray-800 p-1 ml-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        {notificationCount > 0 && (
                                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                            {notificationCount}
                                        </span>
                                        )}
                                    </button>
                                </Link>
                                <Link href="/shoppingcart">
                                    <button
                                        type="button"
                                        className="relative rounded-full bg-gray-800 p-1 ml-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Shopping Cart</span>

                                        <ShoppingCartIcon className="h-6 w-6" />

                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};
