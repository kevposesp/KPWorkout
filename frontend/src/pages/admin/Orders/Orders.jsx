import React, { useEffect } from 'react';
import { Card, Checkbox, Label, Select, Table } from 'flowbite-react';
import { useOrder } from '@/hooks/useOrder';
import Modal from '@/components/Modals/ModalBase';

const Orders = () => {

    const { orders, getOrdersAdmin, updateOrder } = useOrder();

    useEffect(() => {
        getOrdersAdmin();
    }, []);

    const settings = {
        titleButton: 'Edit',
        type: 'create',
        color: 'blue',
        classButton: false,
        divClass: 'text-start'
    }

    const rows = orders.length > 0 ? orders.map((order, index) => {
        let status = 'cancelled';
        return (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                <Table.Cell className="p-4">
                    <Checkbox />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    # order-{order.id}
                </Table.Cell>
                <Table.Cell>{order.status}</Table.Cell>
                <Table.Cell>{order.products.length}</Table.Cell>
                <Table.Cell>{order.total_amount.toFixed(2)} €</Table.Cell>
                <Table.Cell>
                    <Modal settings={settings} sendData={() => updateOrder(order.id, status)}>

                        <div className="max-w-md">
                            <div className="mb-2 block">
                                <Label htmlFor="countries" value="Select your country" />
                            </div>
                            <Select id="countries" onChange={(e) => status = e.target.value} required>
                                <option value='cancelled'>cancelled</option>
                                <option value='pending'>pending</option>
                                <option value='processing'>processing</option>
                                <option value='accepted'>accepted</option>
                                <option value='sent'>sent</option>
                                <option value='delivery'>delivery</option>
                                <option value='delivered'>delivered</option>
                            </Select>
                        </div>

                    </Modal>
                </Table.Cell>
            </Table.Row>
        )
    }) : (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-4 text-center" colSpan="6">
                Not found orders
            </Table.Cell>
        </Table.Row>
    );

    return (
        <div className='container mx-auto mt-10'>

            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Orders
            </h1>

            <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />

            <Card className='h-auto'>

                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell className="p-4">
                                <Checkbox />
                            </Table.HeadCell>
                            <Table.HeadCell>Order Number</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            <Table.HeadCell>Packages</Table.HeadCell>
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

export default Orders;
