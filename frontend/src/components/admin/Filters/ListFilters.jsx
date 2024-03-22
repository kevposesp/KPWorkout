import React, { useEffect, useState } from 'react';
import { useFilter } from '@/hooks/useFilter';
import { Card, Label, TextInput, Button, Table, Checkbox, List } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import ModalBase from '../../Modals/ModalBase';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFloppyDisk, faPen } from '@fortawesome/free-solid-svg-icons';

const ListFilters = ({ settingsList = {
    title: false
} }) => {

    const { filtersHook, createFilter, deleteFilter, updateFilter } = useFilter();

    const navigate = useNavigate();

    const [title, setTitle] = useState('Marca');
    const [name, setName] = useState('Mercedes');
    const [filterEdit, setFilterEdit] = useState(0);

    function create() {
        const filterData = {
            title,
            name
        };
        createFilter(filterData);
    }

    function update(id) {
        setFilterEdit(0);
        const filterData = {
            id,
            title,
            name
        };
        updateFilter(filterData);
    }

    const rows = Object.entries(filtersHook).length > 0 ? Object.entries(filtersHook).map(([category, filters], index) => {
        return (
            <Table.Row className={`bg-white dark:border-gray-700 dark:bg-gray-800`} key={index}>
                <Table.Cell className="p-4">
                    <Checkbox />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {category}
                </Table.Cell>
                <Table.Cell>
                    <List>
                        {filters.map(filter => (
                            <List.Item key={filter.id}>{filter.name}</List.Item>
                        ))}
                    </List>
                </Table.Cell>
                <Table.Cell>
                    <ModalBase settings={{ titleButton: 'Edit', okkayButton: false, closeButton: 'Close' }} sendData={() => update()}>
                        <div className="text-start mb-3">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update filter</h3>
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
                                    disabled
                                />
                            </div>
                            <div className='px-3 py-2'>
                                <List>
                                    {filters.map(filter => (
                                        <List.Item key={filter.id} className='flex justify-between items-center'>
                                            {filterEdit === filter.id ? (
                                                <TextInput
                                                    id="name"
                                                    placeholder="Incident Name"
                                                    value={name}
                                                    onChange={(event) => setName(event.target.value)}
                                                    required
                                                />
                                            ) : (
                                                filter.name
                                            )}
                                            <div className='flex'>
                                                {filterEdit != filter.id ? (
                                                    <Button color='green' className='mr-1' onClick={() => { setFilterEdit(filter.id); setTitle(category); setName(filter.name) }}>
                                                        <FontAwesomeIcon icon={faPen} />
                                                    </Button>
                                                ) : (
                                                    <Button color='green' className='mr-1' onClick={() => update(filter.id)}>
                                                        <FontAwesomeIcon icon={faFloppyDisk} />
                                                    </Button>
                                                )}
                                                <ModalBase settings={{ type: "delete", titleButton: "Delete", color: "failure" }} sendData={() => deleteFilter(filter.id)}>
                                                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                        Are you sure you want to delete this incident?
                                                        {filter.id}
                                                    </h3>
                                                </ModalBase>
                                            </div>
                                        </List.Item>
                                    ))}
                                </List>
                            </div>
                        </div>
                    </ModalBase>
                </Table.Cell>
            </Table.Row>
        )
    }) : (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-4 text-center" colSpan="6">
                Not found filters
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
                                list="titles-list"
                            />
                            <datalist id="titles-list" className="mt-1">
                                {Object.entries(filtersHook).map(([category, filters], index) => {
                                    return (
                                        <option key={index} value={category} />
                                    )
                                })}
                            </datalist>
                        </div>
                        <div className='my-6'>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Name" />
                            </div>
                            <TextInput
                                id="name"
                                placeholder="Incident Name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
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
                            <Table.HeadCell>Title</Table.HeadCell>
                            <Table.HeadCell>Filters</Table.HeadCell>
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

export default ListFilters;
