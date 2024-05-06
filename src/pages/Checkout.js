import React from 'react';
import {Link} from "react-router-dom";
import {deleteCartItemAsync, selectCartItems, updateCartItemAsync} from "../features/cart/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {checkUserAsync} from "../features/auth/authSlice";
const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        price: '$90.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    {
        id: 3,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
]
const addresses = [
    {
        id:1,
        name: "Rohan Patel",
        street: "31, Main Road",
        city: "Delhi",
        state: "Uttarpradesh",
        country: "India",
        pinCode: "500256",
        email: "xyz@gmail.com",
        phone: 123455030
    },
    {
        id:2,
        name: "Priyanka Patel",
        street: "47, Bhaktinandan",
        city: "Surat",
        country: "India",
        state: "Uttarpradesh",
        pinCode: "395004",
        email: "abc@gmail.com",
        phone: 1232324030
    }
]

function Checkout(props) {
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const totalAmount = cartItems.reduce((amount, item)=>item.price*item.quantity+amount,0)
    const totalItems = cartItems.reduce((total,item)=>item.quantity+total,0)
    const {register, reset, handleSubmit, watch, formState: {errors}} = useForm()

    function handleQuantity(e,product){
        console.log('quantity',e.target.value)
        dispatch(updateCartItemAsync({...product,quantity:parseInt(e.target.value)}))
    }
    return (
        <div className="flex mx-auto max-w-2xl lg:max-w-7xl h-full flex-col my-5 p-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-8 gap-y-10">
                <div className="lg:col-span-3">
                    <div className="bg-white shadow-xl p-5">
                        <form noValidate onSubmit={handleSubmit((data)=>{
                            console.log('address-data',data)
                            // dispatch(checkUserAsync(data))
                        })}>
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Full name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register('name', {required:'Name is required'})}
                                                id="name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                {...register('email', {required:'email is required'})}
                                                type="email"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                            Phone number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="phone"
                                                {...register('phone', {required:'Phone number is required'})}
                                                type="number"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                            Country
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="country"
                                                {...register('country', {required:'country is required'})}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option>India</option>
                                                <option>United States</option>
                                                <option>Canada</option>
                                                <option>Mexico</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                                            Street address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register('street', {required:'Street address is required'})}
                                                id="street"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                            City
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register('city', {required:'City is required'})}
                                                id="city"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                            State / Province
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register('state', {required:'State is required'})}
                                                id="state"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                                            ZIP / Postal code
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register('pinCode', {required:'Pin code is required'})}
                                                id="pinCode"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button onClick={()=>reset()} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add Address
                                </button>
                            </div>
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Choose from existing address
                                </p>
                                <ul role="list" className="divide-y divide-gray-100">
                                    {addresses.map((address) => (
                                        <li key={address.id} className="flex justify-between gap-x-6 py-5">
                                            <div className="flex gap-x-4 border p-2 border-gray-300 rounded-md w-full">
                                                <input
                                                    id="address"
                                                    name="addresses"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <div className="min-w-0 flex-auto -mt-1.5">
                                                    <p className="text-sm font-semibold leading-6 text-gray-800">{address.name}</p>
                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-700">{address.street}, {address.city}, {address.state}, {address.pinCode}</p>
                                                    <p className="text-xs font-semibold leading-6 text-gray-700">{address.phone}</p>
                                                </div>
                                            </div>

                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-10 space-y-10">

                                    <fieldset>
                                        <legend className="text-sm font-semibold leading-6 text-gray-900">Payment methods</legend>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                                        <div className="mt-6 space-y-6">
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="cash_optiom"
                                                    name="payments"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="cash_optiom" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Cash on delivery
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="card_option"
                                                    name="payments"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="card_option" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Card
                                                </label>
                                            </div>
                                            {/*<div className="flex items-center gap-x-3">*/}
                                            {/*    <input*/}
                                            {/*        id="push-nothing"*/}
                                            {/*        name="push-notifications"*/}
                                            {/*        type="radio"*/}
                                            {/*        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
                                            {/*    />*/}
                                            {/*    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">*/}
                                            {/*        No push notifications*/}
                                            {/*    </label>*/}
                                            {/*</div>*/}
                                        </div>
                                    </fieldset>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between">
                                <h2 className="text-xl font-semibold">Cart</h2>

                            </div>

                            <div className="mt-8">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {cartItems?.map((product) => (
                                            <li key={product.id} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={product.thumbnail}
                                                        alt={product.title}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href={product.thumbnail}>{product.title}</a>
                                                            </h3>
                                                            <p className="ml-4">${product.price}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <div className="flex gap-2 items-center">
                                                            <p className="text-gray-500">Qty</p>
                                                            <select
                                                                value={product.quantity}
                                                                onChange={(e)=>handleQuantity(e,product)}
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                            >
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                            </select>
                                                        </div>

                                                        <div className="flex">
                                                            <button
                                                                onClick={()=>dispatch(deleteCartItemAsync(product.id))}
                                                                type="button"
                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Total items in cart</p>
                                <p>${totalItems}</p>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>${totalAmount}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6">
                                <Link
                                    to="/checkout"
                                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Checkout
                                </Link>
                            </div>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                    or{' '}
                                    <Link to="/">
                                        <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Continue Shopping
                                            <span aria-hidden="true"> &rarr;</span>
                                        </button>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


    );
}

export default Checkout;