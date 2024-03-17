import React, { useEffect, useState } from 'react';
import { useCategory } from '@/hooks/useCategory';
import { Card, List, Label, TextInput, Textarea, Select, Button, Table, Checkbox } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import ModalBase from '../../Modals/ModalBase';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const ListCardsCategory = ({ settingsList = {
    title: false
} }) => {

    const { categories, createCategory, deleteCategory, getAllCategories, updateCategory } = useCategory();

    useEffect(() => {
        getAllCategories();
    }, []);

    const navigate = useNavigate();

    const [categoryId, setCategoryId] = useState(0);
    const [title, setTitle] = useState('Proteína Whey');
    const [description, setDescription] = useState('Compra nuestros polvos de proteína de suero de alta calidad, batidos y mezclas de suplementos diseñados para apoyar el crecimiento y el mantenimiento de tu masa muscular. Nuestra selección incluye suplementos de concentrado de suero, mezclas para ganar peso, snacks de proteínas y mucho más.');
    const [image, setImage] = useState('https://static.thcdn.com/images/xsmall/webp//productimg/original/10530943-4134889444511789.jpg');
    const [parent, setParent] = useState(0);
    const [active, setActive] = useState(false);

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

    function setUpdateValues(categ, title, description, img, parent_id) {
        if (categ != categoryId) {
            setCategoryId(categ);
            setTitle(title);
            setDescription(description);
            setImage(img);
            setParent(parent_id);
        }
    }

    function update(id) {
        const categoryData = {
            title,
            description,
            image,
        };

        if (parent !== 0) {
            categoryData.parent_id = parseInt(parent);
        } else {
            categoryData.parent_id = null;
        }

        updateCategory(id, categoryData);

        setTitle('');
        setDescription('');
        setImage('');
        setParent(0);
        setCategoryId(0);
    }

    const rows = categories.length > 0 ? categories.map((category, index) => {
        return (
            <Table.Row className={`bg-white dark:border-gray-700 dark:bg-gray-800 ${category.slug == active ? 'bg-gray-200' : ''}`} key={index}>
                <Table.Cell className="p-4">
                    <Checkbox />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {category.slug}
                </Table.Cell>
                <Table.Cell>{category.title}</Table.Cell>
                <Table.Cell className='hover:text-blue-500 hover:cursor-pointer' onClick={() => setActive(category.parent_category ? category.parent_category.slug : null)}>
                    {category.parent_category ? category.parent_category.slug : null}
                </Table.Cell>
                <Table.Cell>{category.products_count}</Table.Cell>
                <Table.Cell>
                    <Button color="light" onClick={() => navigate("/admin/categories/" + category.id)}>
                        <FontAwesomeIcon icon={faEye} />
                    </Button>
                    <ModalBase settings={{ type: "delete", titleButton: "Delete", color: "failure" }} sendData={() => deleteCategory(category.id)}>
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this incident?
                        </h3>
                    </ModalBase>
                    <div onClick={() => setUpdateValues(category.id, category.title, category.description, category.image, category.parent_id)}>
                        <ModalBase sendData={() => update(category.id)} settings={{ titleButton: 'Edit' }} >
                            <div className="text-start mb-3">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update Category</h3>
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
                                        <Label htmlFor="img" value="Image" />
                                    </div>
                                    <TextInput
                                        id="img"
                                        placeholder="Url Image"
                                        value={image}
                                        onChange={(event) => setImage(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className='my-6'>
                                    <div className="mb-2 block">
                                        <Label htmlFor="parent" value="Parent" />
                                    </div>
                                    <Select id="parent" value={parent} required onChange={(event) => setParent(event.target.value)}>
                                        <option value="0">None</option>
                                        {categories.filter((cat) => cat.id != category.id).map((categ) => (
                                            <option key={categ.id} value={categ.id}>{categ.title}</option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </ModalBase>
                    </div>
                </Table.Cell>
            </Table.Row>
        )
    }) : (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-4 text-center" colSpan="6">
                Not found categories
            </Table.Cell>
        </Table.Row>
    );

    return (
        <div>
            {settingsList.title && (
                <h1 className="m-4 text-2xl font-medium leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
                    Categories
                </h1>
            )}


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
                                <Label htmlFor="img" value="Image" />
                            </div>
                            <TextInput
                                id="img"
                                placeholder="Url Image"
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

            <Card className='h-auto'>
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell className="p-4">
                                <Checkbox />
                            </Table.HeadCell>
                            <Table.HeadCell>Slug</Table.HeadCell>
                            <Table.HeadCell>Title</Table.HeadCell>
                            <Table.HeadCell>Parent</Table.HeadCell>
                            <Table.HeadCell>Products</Table.HeadCell>
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

export default ListCardsCategory;
