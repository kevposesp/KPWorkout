import React, { useEffect, useState } from 'react';
import { useProduct } from '@/hooks/useProduct';
import { Card, List, Label, TextInput, Textarea, Select, Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import ModalBase from '../../Modals/ModalBase';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const ListCardsProducts = ({ }) => {

    const { products, setProducts, getProducts, createProduct, deleteProduct } = useProduct();

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const navigate = useNavigate();

    const [name, setName] = useState('Zapatos');
    const [description, setDescription] = useState('Compra nuestros polvos de proteína de suero de alta calidad, batidos y mezclas de suplementos diseñados para apoyar el crecimiento y el mantenimiento de tu masa muscular. Nuestra selección incluye suplementos de concentrado de suero, mezclas para ganar peso, snacks de proteínas y mucho más.');
    const [price, setPrice] = useState(10.99);
    const [stock, setStock] = useState(100);

    function create() {
        const productData = {
            name,
            description,
            price,
            stock
        };

        createProduct(productData);
    }

    return (
        <div>
            <h1 className="m-4 text-2xl font-medium leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
                Products
            </h1>

            <div className='m-4'>
                <ModalBase sendData={() => create()}>
                    <div className="text-start mb-3">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create Product</h3>
                        <div className='my-6'>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="name" />
                            </div>
                            <TextInput
                                id="name"
                                placeholder="Incident Name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                        </div>
                        <div className='my-6'>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="Description" />
                            </div>

                            <Textarea
                                id="description"
                                placeholder="Incident Description"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                required
                                rows={4}
                            />
                        </div>
                        <div className='my-6'>
                            <div className="mb-2 block">
                                <Label htmlFor="price" value="Price" />
                            </div>
                            <TextInput
                                id="price"
                                placeholder="Incident Price"
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                                required
                            />
                        </div>
                        <div className='my-6'>
                            <div className="mb-2 block">
                                <Label htmlFor="stock" value="Stock" />
                            </div>
                            <TextInput
                                id="stock"
                                placeholder="Incident Stock"
                                value={stock}
                                onChange={(event) => setStock(event.target.value)}
                                required
                            />
                        </div>
                    </div>
                </ModalBase>
            </div>


            <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />

            <div className="container w-4/5 sm:w-auto mx-auto my-3 grid auto-rows-auto grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4">
                {products.map((product) => (
                    <Card key={product.id} className="bg-white dark:bg-gray-800">
                        <div className='h-full'>
                            <p className="font-bold text-xl text-gray-700 dark:text-gray-400">
                                {product.name}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400">
                                {product.description}
                            </p>
                            <hr className="my-3 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />

                            <div className="flex justify-between">
                                <p className="text-gray-500 dark:text-gray-400">
                                    {product.price}
                                </p>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Stock: {product.stock}
                                </p>
                            </div>
                        </div>
                        <div className='flex'>
                            <Button className='mx-4' color="light" onClick={() => navigate("/admin/products/" + product.id)}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z" />
                                    <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </Button>
                            <ModalBase key={product.id} settings={{ type: "delete", titleButton: "Delete", color: "failure" }} sendData={() => deleteProduct(product.id)}>
                                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete this incident?
                                </h3>
                            </ModalBase>
                        </div>
                    </Card>
                ))}
            </div>
        </div>

    );
};

export default ListCardsProducts;
