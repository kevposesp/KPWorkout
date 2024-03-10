import React, { useState } from 'react';
import { useCategory } from '@/hooks/useCategory';
import { Card, List, Label, TextInput, Textarea, Select, Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import ModalBase from '../../Modals/ModalBase';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const ListCardsCategory = ({ }) => {

    const { categories, createCategory, deleteCategory } = useCategory();

    const navigate = useNavigate();

    const [title, setTitle] = useState('Proteína Whey');
    const [description, setDescription] = useState('Compra nuestros polvos de proteína de suero de alta calidad, batidos y mezclas de suplementos diseñados para apoyar el crecimiento y el mantenimiento de tu masa muscular. Nuestra selección incluye suplementos de concentrado de suero, mezclas para ganar peso, snacks de proteínas y mucho más.');
    const [image, setImage] = useState('https://static.thcdn.com/images/xsmall/webp//productimg/original/10530943-4134889444511789.jpg');
    const [parent, setParent] = useState(0);

    function create() {
        const categoryData = {
            title,
            description,
            image,
        };

        if (parent !== 0) {
            categoryData.parent_id = parseInt(parent);
        }

        createCategory(categoryData);
    }

    return (
        <div>
            <h1 className="m-4 text-2xl font-medium leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
                Categories
            </h1>

            <div className='m-4'>
                <ModalBase sendData={() => create()}>
                    <div className="text-start mb-3">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create Category</h3>
                        <div className='my-6'>
                            <div className="mb-2 block">
                                <Label htmlFor="title" value="Title" />
                            </div>
                            <TextInput
                                id="title"
                                placeholder="Incident Title"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
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
                                <Label htmlFor="status" value="Status" />
                            </div>
                            <TextInput
                                id="status"
                                placeholder="Incident Status"
                                value={image}
                                onChange={(event) => setImage(event.target.value)}
                                required
                            />
                        </div>
                        <div className='my-6'>
                            <div className="mb-2 block">
                                <Label htmlFor="parent" value="Parent" />
                            </div>
                            <Select id="countries" required onChange={(event) => setParent(event.target.value)}>
                                <option value="0">None</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.title}</option>
                                ))}
                            </Select>
                        </div>
                    </div>
                </ModalBase>
            </div>


            <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />

            <div className="container w-4/5 sm:w-auto mx-auto my-3 grid auto-rows-auto grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4">
                {categories.map((category) => (
                    <Card key={category.id} className="bg-white dark:bg-gray-800">
                        <div className='h-full'>
                            <p className="font-bold text-xl text-gray-700 dark:text-gray-400">
                                {category.title}
                            </p>
                            <List unstyled className='ps-5 text-sm'>
                                {category.children_categories.map((child) => (
                                    <List.Item key={child.id}>{child.title}</List.Item>
                                ))}
                            </List>
                        </div>
                        <div className='flex'>
                            <Button className='mx-4' color="light" onClick={() => navigate("/admin/categories/" + category.id)}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z" />
                                    <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </Button>
                            <ModalBase key={category.id} settings={{ type: "delete", titleButton: "Delete", color: "failure" }} sendData={() => deleteCategory(category.id)}>
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

export default ListCardsCategory;
