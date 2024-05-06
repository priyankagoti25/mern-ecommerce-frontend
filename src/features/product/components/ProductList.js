import React, {Fragment, useEffect, useState} from 'react';
import {Dialog, Disclosure, Menu, Transition} from '@headlessui/react'
import {ITEMS_PER_PAGE} from "../../../app/constant";
import {XMarkIcon} from '@heroicons/react/24/outline'
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    FunnelIcon,
    MinusIcon,
    PlusIcon,
    Squares2X2Icon,
    StarIcon
} from '@heroicons/react/20/solid'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchAllBrandsAsync, fetchAllCategoriesAsync,
    fetchAllProductAsync,
    fetchAllProductByFiltersAsync,
    fetchAllProductBySortAsync, selectAllBrands, selectAllCategories,
    selectAllProducts,
    selectPagination
} from "../productSlice";
const oldProducts = [
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        thumbnail: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 2,
        name: 'Basic Tee',
        href: '#',
        thumbnail: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 3,
        name: 'Basic Tee',
        href: '#',
        thumbnail: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 4,
        name: 'Basic Tee',
        href: '#',
        thumbnail: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    // More products...
]
const sortOptions = [
    { name: 'Best Rating', sort: 'rating', order:'desc',current: false },
    { name: 'Price: Low to High', sort: 'price', order:'asc', current: false },
    { name: 'Price: High to Low', sort: 'price', order:'desc', current: false },
]
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductList() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch()
    const products = useSelector(selectAllProducts)
    const pagination = useSelector(selectPagination)
    const brands = useSelector(selectAllBrands)
    const categories = useSelector(selectAllCategories)
    const filters = [
        {
            id: 'category',
            name: 'Category',
            options: brands
        },
        {
            id: 'brand',
            name: 'Brand',
            options: categories
        },
    ]
    useEffect(() => {
        const pagination = {_page:currentPage, _per_page:ITEMS_PER_PAGE}
        dispatch(fetchAllProductAsync(pagination))
    }, [dispatch,currentPage])
    useEffect(()=>{
        dispatch(fetchAllBrandsAsync())
        dispatch(fetchAllCategoriesAsync())
    },[])
    function handleFilter(event,section){
        const filterObj = {[section.id]:event.target.value,}
        console.log(event,section,filterObj)
        dispatch(fetchAllProductByFiltersAsync(filterObj))
    }

    function sortProducts(option){
        dispatch(fetchAllProductBySortAsync(option))
    }

    function handlePage(page){
        console.log({page})
        setCurrentPage(page)
    }
    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categories</h3>
                                        {/*<ul role="list" className="px-2 py-3 font-medium text-gray-900">*/}
                                        {/*    {subCategories.map((category) => (*/}
                                        {/*        <li key={category.name}>*/}
                                        {/*            <a href={category.href} className="block px-2 py-3">*/}
                                        {/*                {category.name}*/}
                                        {/*            </a>*/}
                                        {/*        </li>*/}
                                        {/*    ))}*/}
                                        {/*</ul>*/}

                                        {filters.map((section) => (
                                            <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex items-center">
                                  {open ? (
                                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            defaultChecked={option.checked}
                                                                            onChange={event=>console.log(event.target.value)}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={option.href}
                                                            className={classNames(
                                                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                            onClick={()=> sortProducts(option)}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                {/*<ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">*/}
                                {/*    {subCategories.map((category) => (*/}
                                {/*        <li key={category.name}>*/}
                                {/*            <a href={category.href}>{category.name}</a>*/}
                                {/*        </li>*/}
                                {/*    ))}*/}
                                {/*</ul>*/}

                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                              {open ? (
                                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    onChange={event=>handleFilter(event, section)}
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-600"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
                                    {/*<h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>*/}

                                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                        {products.map((product) => (
                                            <Link to={`product-detail/${product.id}`} key={product.id}>
                                                <div className="group relative border border-gray-200 p-2 rounded-md">
                                                    <div
                                                        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                                                        <img
                                                            src={product.thumbnail}
                                                            alt={product.title}
                                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                        />
                                                    </div>
                                                    <div className="mt-4 flex justify-between">
                                                        <div>
                                                            <h3 className="text-sm text-gray-700">
                                                                {/*<a href={product.thumbnail}>*/}
                                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                                    {product.title}
                                                                {/*</a>*/}
                                                            </h3>
                                                            <div className="flex gap-1 items-center">
                                                                <StarIcon className="w-5 h-5 text-orange-600"></StarIcon>
                                                                <p className="mt-1 text-sm text-gray-500">{product.rating}</p>
                                                            </div>

                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">${(product.price*(1-product.discountPercentage/100)).toFixed(2)}</p>
                                                            <p className="text-sm font-medium text-gray-500 line-through text-right">${product.price}</p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 bg-white mt-20 px-4 py-3 sm:px-6">
                                    <div className="flex flex-1 justify-between sm:hidden">
                                             <div
                                                 onClick={()=> {
                                                     if(pagination.prev) {
                                                         handlePage(pagination.prev)
                                                     }
                                                     return false;
                                                 }}                                                 className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                             >
                                                 Previous
                                             </div>
                                             <div
                                                 onClick={()=> {
                                                     if(pagination.next) {
                                                         handlePage(pagination.next)
                                                     }
                                                     return false;
                                                 }}                                                 className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                             >
                                                 Next
                                             </div>
                                         </div>
                                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                             <div>
                                                 <p className="text-sm text-gray-700">
                                                     Showing <span className="font-medium">{(currentPage-1)*ITEMS_PER_PAGE+1}</span> to <span className="font-medium">{currentPage*ITEMS_PER_PAGE > pagination.items?pagination.items:currentPage*ITEMS_PER_PAGE}</span> of{' '}
                                                     <span className="font-medium">{pagination.items}</span> results
                                                 </p>
                                             </div>
                                             <div>
                                                 <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                                     <div
                                                         onClick={()=> {
                                                             if(pagination.prev) {
                                                                 handlePage(pagination.prev)
                                                             }
                                                             return false;
                                                         }}
                                                         className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                                     >
                                                         <span className="sr-only">Previous</span>
                                                         <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                                     </div>
                                                     {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                                                     {
                                                         Array.from({length:pagination.pages},(_,index)=>index+1).map((page)=>(
                                                             <a
                                                                 key={page}
                                                                 href="#"
                                                                 aria-current="page"
                                                                 onClick={()=>handlePage(page)}
                                                                 className={`relative z-10 inline-flex items-center ${page===currentPage?'bg-indigo-600 text-white':'text-gray-900'} px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                                             >
                                                                 {page}
                                                             </a>
                                                         ))
                                                     }


                                                     <div
                                                         onClick={()=> {
                                                             if(pagination.next) {
                                                                 handlePage(pagination.next)
                                                             }
                                                             return false;
                                                         }}
                                                         className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                                     >
                                                         <span className="sr-only">Next</span>
                                                         <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                                     </div>
                                                 </nav>
                                             </div>
                                         </div>
                                </div>
                            </div>
                            {/*Product grid end*/}
                        </div>

                    </section>
                </main>
            </div>
        </div>
    )
}
