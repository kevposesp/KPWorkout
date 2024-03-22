import React, { useEffect, useState } from 'react';
import '@/assets/css/template.scss';
import { useProduct } from '@/hooks/useProduct';

import Menu from '@/components/client/Menu';

import ProductCard from '@/components/client/cards/ProductCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faGripVertical, faFilter } from '@fortawesome/free-solid-svg-icons'
import Search from '@/components/client/filters/Search';
import Categories from '@/components/client/filters/Categories';
import Price from '@/components/client/filters/Price';
import Order from '@/components/client/filters/Order';
import Filters from '@/components/client/filters/Filters';
import Pagination from '@/components/client/filters/Pagination';

import { useParams } from 'react-router-dom';

const Shop = () => {

    const { products, getProductsFiltered, toggleFavorite, totalProducts } = useProduct();

    const [act, setAct] = useState('-translate-x-full');
    const { filters } = useParams();

    useEffect(() => {
        getProductsFiltered(formatFilters());
    }, [getProductsFiltered, filters]);

    function formatFilters() {
        let res = {};
        if (filters) {
            res = JSON.parse(atob(filters));
        }
        return res
    }

    return (
        <div className=''>
            <div className='temp'>
                <Menu />
                <div className="container text-center lg:!hidden mt-5 ms-5">
                    <button
                        className="text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block lg:!hidden"
                        type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example"
                        aria-controls="drawer-example" onClick={() => setAct('')}>
                        <FontAwesomeIcon icon={faFilter} />
                    </button>
                </div>
                <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-0 pb-5 items-start lg:mt-10">


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
                                <Categories />
                            </div>

                            <Filters />

                            <div className="pt-4">
                                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Price</h3>
                                <Price />
                            </div>

                        </div>
                    </div>

                    <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden lg:!block">
                        <div className="divide-y divide-gray-200 space-y-5 py-5 px-2">
                            <div>
                                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Categories</h3>
                                <Categories />
                            </div>

                            <Filters />

                            <div className="pt-4">
                                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Price</h3>
                                <Price />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-4 lg:!col-span-3">

                        <div className='p-3 max-w-96 m-auto'>
                            <Search />
                        </div>

                        <div className="flex items-center mb-4">
                            {/* <select name="sort" id="sort" onChange={handleSortChange}
                                className="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary">
                                <option value="">Default sorting</option>
                                <option value="price-low-to-high">Price low to high</option>
                                <option value="price-high-to-low">Price high to low</option>
                                <option value="latest">Latest product</option>
                            </select> */}
                            <Order />

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

                        <div className="grid grid-cols-1 sm:!grid-cols-2 md:!grid-cols-3 gap-6">
                            {products.length > 0 ? (
                                products.map((product) => <ProductCard product={product} key={product.id} toggleFavorite={toggleFavorite} />)
                            ) : (
                                <div className="col-span-3 text-center text-gray-500">No products found</div>
                            )}

                        </div>

                        <Pagination totalPages={totalProducts}/>

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
