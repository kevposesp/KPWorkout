import React from 'react';
import { useOrder } from '@/hooks/useOrder';

import { Button } from 'flowbite-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

const Orders = () => {

    const { orders } = useOrder();
    const navigate = useNavigate();

    return (
        <div className="col-span-9 space-y-4">
            {orders.length === 0 ? (<div className="text-center text-gray-600">No products in Chart</div>)
                : orders.map(order => (
                    <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded" key={order.id}>
                        <div className="flex items-center gap-4">
                            <div className="flex-grow">
                                <h4 className="text-gray-800 font-medium">{order.first_name} {order.last_name}</h4>
                                <p className="text-gray-600">{order.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-end">
                                <p className="text-gray-600">Total amount</p>
                                <h4 className="text-gray-800 font-medium">{order.total_amount.toFixed(2)} €</h4>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-gray-600">Status</p>
                                <h4 className="text-gray-800 font-medium">{order.status}</h4>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-gray-600">Quantity</p>
                                <h4 className="text-gray-800 font-medium">{order.products.length}</h4>
                            </div>
                        </div>
                        <div className='flex items-end gap-4'>
                            <Button color="light" onClick={() => navigate(`order/${order.id}`)}>
                                <FontAwesomeIcon icon={faEye} className="text-gray-600" />
                            </Button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Orders;
