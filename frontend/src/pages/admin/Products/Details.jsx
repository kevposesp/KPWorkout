import React, { useEffect } from 'react';
import { Card } from 'flowbite-react';
import { useParams } from 'react-router-dom';
import { useProduct } from '@/hooks/useProduct';
import { useCategory } from '@/hooks/useCategory';
import { useFilter } from '@/hooks/useFilter';
import CarouselDetails from '@/components/product/CarouselDetails';

const ProductDetails = () => {

    const { id } = useParams();
    const { product, getProduct, toggleCategory, toggleFilter } = useProduct();
    const { categories, getAllCategories } = useCategory();
    const { filtersHook } = useFilter();

    useEffect(() => {
        getProduct(id);
        getAllCategories();
    }, [id]);

    console.log(product);
    console.log(categories);
    console.log(filtersHook);

    function numeroEstaPresente(product, id) {
        for (let i = 0; i < product.categories.length; i++) {
            const objetoInterior = product.categories[i];
            if (objetoInterior.id === id) {
                return true;
            }
        }
        return false;
    }

    function addFilterToProduct(product, filter, type = 'category') {

        if (type == 'category') {
            toggleCategory(product, filter);
        } else {
            toggleFilter(product, filter);
        }

        getProduct(product);

    }


    return (
        <div className='container mx-auto mt-10'>
            {Object.keys(product).length > 0 && (
                <Card >
                    <div className="lg:flex items-start justify-center py-12 2xl:px-20 lg:px-6 px-4">
                        <CarouselDetails images={product.images} />
                        <div className="xl:w-2/5 lg:w-1/2 lg:ml-8 lg:ml-6 lg:mt-0 mt-6">
                            <div className="border-b border-gray-200 pb-6 flex justify-between">
                                <div>
                                    <p className="text-sm leading-none text-gray-600 dark:text-gray-300 ">{product.slug || product.name}</p>
                                    <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">{product.name}</h1>
                                    <p className="text-base leading-4 text-gray-800 dark:text-gray-300 mt-3">{product.price} €</p>
                                </div>
                                <p className="text-base leading-4 text-gray-800 dark:text-gray-300">Stock: {product.stock}</p>
                            </div>
                            <div className="py-4 border-b border-gray-200">
                                <p className="text-base leading-4 text-gray-800 dark:text-gray-300 mb-4">Categories</p>
                                <div className="flex items-center flex-wrap">
                                    {categories.map((category) => (
                                        <>
                                            {numeroEstaPresente(product, category.id) ? (
                                                <button
                                                    type="button"
                                                    class="
                                                        text-white
                                                        bg-green-500
                                                        border border-green-500
                                                        hover:bg-white hover:text-green-500
                                                        font-bold
                                                        rounded-lg 
                                                        text-sm text-center 
                                                        px-5 py-2.5 me-2 mb-2
                                                    "
                                                    onClick={() => addFilterToProduct(product.id, category.id)}
                                                >
                                                    {category.title}
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    class="
                                                        text-green-500 
                                                        hover:text-white 
                                                        border border-green-500 
                                                        hover:bg-green-500 
                                                        font-bold
                                                        rounded-lg 
                                                        text-sm text-center 
                                                        px-5 py-2.5 me-2 mb-2
                                                    "
                                                    onClick={() => addFilterToProduct(product.id, category.id)}
                                                >
                                                    {category.title}
                                                </button>
                                            )}
                                        </>
                                    ))}
                                </div>
                            </div>

                            {Object.entries(filtersHook).length > 0 && (
                                <>
                                    {Object.entries(filtersHook).map(([category, filters]) => (
                                        <div className="py-4 border-b border-gray-200">
                                            <p className="text-base leading-4 text-gray-800 dark:text-gray-300 mb-4">{category}</p>
                                            <div className="flex items-center flex-wrap">
                                                {filters.map((filter) => (
                                                    <>
                                                        {product.filters.includes(filter.id) ? (
                                                            <button
                                                                type="button"
                                                                class="
                                                                text-white
                                                                bg-green-500
                                                                border border-green-500
                                                                hover:bg-white hover:text-green-500
                                                                font-bold
                                                                rounded-lg 
                                                                text-sm text-center 
                                                                px-5 py-2.5 me-2 mb-2
                                                            "
                                                                onClick={() => addFilterToProduct(product.id, filter.id, 'filter')}
                                                            >
                                                                {filter.name}
                                                            </button>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                class="
                                                                text-green-500 
                                                                hover:text-white 
                                                                border border-green-500 
                                                                hover:bg-green-500 
                                                                font-bold
                                                                rounded-lg 
                                                                text-sm text-center 
                                                                px-5 py-2.5 me-2 mb-2
                                                            "
                                                                onClick={() => addFilterToProduct(product.id, filter.id, 'filter')}
                                                            >
                                                                {filter.name}
                                                            </button>
                                                        )}
                                                    </>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}

                            <div>
                                <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7">{product.description}</p>
                            </div>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default ProductDetails;
