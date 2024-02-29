import React, { useEffect, useState } from 'react';
import '@/assets/css/template.scss';
import { useProduct } from '@/hooks/useProduct';
import { useCategory } from '@/hooks/useCategory';

import Menu from '@/components/client/Menu';

import ProductCard from '@/components/client/cards/ProductCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faGripVertical, faFilter } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {

    const { products, getProductsFiltered } = useProduct();
    const { categories } = useCategory();
    const [categoryFilters, setCategoryFilters] = useState([]);
    const [priceFilters, setPriceFilters] = useState({
        min: 0,
        max: 0
    });

    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('');

    const [act, setAct] = useState('-translate-x-full');

    useEffect(() => {
        getProductsFiltered(formatFilters());
    }, [getProductsFiltered, categoryFilters, priceFilters, orderBy, order]);

    // Manejador de eventos para marcar/desmarcar categorías
    const handleCategoryChange = (categoryId, isChecked) => {
        if (isChecked) {
            // Si está marcado, añadir la categoría al array
            setCategoryFilters(prevFilters => [...prevFilters, categoryId]);
        } else {
            // Si está desmarcado, eliminar la categoría del array
            setCategoryFilters(prevFilters => prevFilters.filter(id => id !== categoryId));
        }
    };

    // Manejador de eventos para cambiar los precios
    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setPriceFilters(prevFilters => ({
            ...prevFilters,
            [name]: parseInt(value)
        }));
    };

    // Manejador de eventos para cambiar el orden
    const handleSortChange = (event) => {
        const selectedSort = event.target.value;
        let newOrderBy = '';
        let newOrder = '';

        switch (selectedSort) {
            case 'price-low-to-high':
                newOrderBy = 'price';
                newOrder = 'asc';
                break;
            case 'price-high-to-low':
                newOrderBy = 'price';
                newOrder = 'desc';
                break;
            case 'latest':
                newOrderBy = 'created_at';
                newOrder = 'desc';
                break;
            default:
                newOrderBy = '';
                newOrder = '';
        }

        setOrderBy(newOrderBy);
        setOrder(newOrder);
    };

    function formatFilters() {
        return {
            categories: categoryFilters,
            minPrice: priceFilters.min,
            maxPrice: priceFilters.max,
            orderBy,
            order
        }
    }

    return (
        <div className=''>
            <div className='temp'>
                <Menu />
                <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-16 pb-16 items-start">
                    <div className="text-center md:hidden">
                        <button
                            className="text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block md:hidden"
                            type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example"
                            aria-controls="drawer-example" onClick={() => setAct('')}>
                            <FontAwesomeIcon icon={faFilter} />
                        </button>
                    </div>

                    <div id="drawer-example"
                        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 ${act}`}
                        tabIndex="-1" aria-labelledby="drawer-label">
                        <h5 id="drawer-label"
                            className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
                            <svg
                                className="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"></path>
                            </svg>Info</h5>
                        <button onClick={() => setAct('-translate-x-full')} type="button" data-drawer-hide="drawer-example" aria-controls="drawer-example"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Close menu</span>
                        </button>
                        <div className="divide-y divide-gray-200 space-y-5">
                            <div>
                                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Categories</h3>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <div className="flex items-center" key={category.id}>
                                            <input type="checkbox" name={`cat-${category.id}`} id={`cat-${category.id}`} onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
                                                className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                                            <label htmlFor={`cat-${category.id}`} className="text-gray-600 ml-3 cusror-pointer">{category.title}</label>
                                            <div className="ml-auto text-gray-600 text-sm">({category.products_count})</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4">
                                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Price</h3>
                                <div className="mt-4 flex items-center">
                                    <input type="number" name="min" id="min"
                                        className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                                        placeholder="min" onChange={handlePriceChange} />
                                    <span className="mx-3 text-gray-500">-</span>
                                    <input type="number" name="max" id="max"
                                        className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                                        placeholder="max" onChange={handlePriceChange} />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
                        <div className="divide-y divide-gray-200 space-y-5 py-5 px-2">
                            <div>
                                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Categories</h3>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <div className="flex items-center" key={category.id}>
                                            <input type="checkbox" name={`cat-${category.id}`} id={`cat-${category.id}`} onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
                                                className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                                            <label htmlFor={`cat-${category.id}`} className="text-gray-600 ml-3 cusror-pointer">{category.title}</label>
                                            <div className="ml-auto text-gray-600 text-sm">({category.products_count})</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4">
                                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Price</h3>
                                <div className="mt-4 flex items-center">
                                    <input type="number" name="min" id="min"
                                        className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                                        placeholder="min" onChange={handlePriceChange} />
                                    <span className="mx-3 text-gray-500">-</span>
                                    <input type="number" name="max" id="max"
                                        className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                                        placeholder="max" onChange={handlePriceChange} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-3">

                        <div className="flex items-center mb-4">
                            <select name="sort" id="sort" onChange={handleSortChange}
                                className="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary">
                                <option value="">Default sorting</option>
                                <option value="price-low-to-high">Price low to high</option>
                                <option value="price-high-to-low">Price high to low</option>
                                <option value="latest">Latest product</option>
                            </select>

                            <div className="flex gap-2 ml-auto">
                                <div
                                    className="border border-primary w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer">
                                    <FontAwesomeIcon icon={faGripVertical} />

                                </div>
                                <div
                                    className="border border-gray-300 w-10 h-9 flex items-center justify-center text-gray-600 rounded cursor-pointer">
                                    <FontAwesomeIcon icon={faList} />
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
                            {products.length > 0 ? (
                                products.map((product) => <ProductCard product={product} key={product.id} />)
                            ) : (
                                <div className="col-span-3 text-center text-gray-500">No products found</div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
            {act == '' && (
                <div
                    className="fixed inset-0 z-30 bg-black bg-opacity-50"
                    onClick={() => setAct('-translate-x-full')}
                ></div>
            )}
        </div>
    );
};

export default Shop;