import React, { useEffect, useState } from 'react';
import { useProduct } from '@/hooks/useProduct';
import { Card, List, Label, TextInput, Textarea, Select, Button, Table, Checkbox } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import ModalBase from '../../Modals/ModalBase';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const ListCardsProducts = ({ settingsList = {
    title: false
} }) => {

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

    const rows = products.length > 0 ? products.map((product, index) => {
        return (
            <Table.Row className={`bg-white dark:border-gray-700 dark:bg-gray-800`} key={index}>
                <Table.Cell className="p-4">
                    <Checkbox />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.slug}
                </Table.Cell>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell className='hover:text-blue-500 hover:cursor-pointer'>
                    {product.stock}
                </Table.Cell>
                <Table.Cell>{product.price}</Table.Cell>
                <Table.Cell>
                    <Button color="light" onClick={() => navigate("/admin/products/" + product.id)}>
                        <FontAwesomeIcon icon={faEye} />
                    </Button>
                    <ModalBase settings={{ type: "delete", titleButton: "Delete", color: "failure" }} sendData={() => deleteProduct(product.id)}>
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this incident?
                        </h3>
                    </ModalBase>
                </Table.Cell>
            </Table.Row>
        )
    }) : (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-4 text-center" colSpan="6">
                Not found products
            </Table.Cell>
        </Table.Row>
    );

    return (
        <div>
            {settingsList.title && (
                <h1 className="m-4 text-2xl font-medium leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
                    Products
                </h1>
            )}

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

            <Card className='h-auto'>
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell className="p-4">
                                <Checkbox />
                            </Table.HeadCell>
                            <Table.HeadCell>Slug</Table.HeadCell>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Stock</Table.HeadCell>
                            <Table.HeadCell>Price</Table.HeadCell>
                            <Table.HeadCell>Actions</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {rows}
                        </Table.Body>
                    </Table>
                </div>
            </Card>
        </div>

    );
};

export default ListCardsProducts;
