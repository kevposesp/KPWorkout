import React, { useEffect } from 'react';
import { useOrder } from '@/hooks/useOrder';

import { Button } from 'flowbite-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

const Orders = () => {

    const { orders, getOrders } = useOrder();

    useEffect(() => {
        getOrders();
    }, [getOrders]);
    
    const navigate = useNavigate();

    return (
        <div className="col-span-12 md:col-span-9 space-y-4">
            {orders.length === 0 ? (<div className="text-center text-gray-600">No orders found</div>)
                : orders.map(order => (
                    <div className="block items-center justify-between border gap-6 p-4 border-gray-200 rounded md:flex divide-y md:divide-y-0" key={order.id}>
                        <div className="flex items-center gap-4 mb-2 md:mb-0">
                            <div className="flex-grow">
                                <h4 className="text-gray-800 font-medium">{order.first_name} {order.last_name}</h4>
                                <p className="text-gray-600">{order.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-4 py-2 md:py-0">
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
                        <div className='flex items-end gap-4 justify-end pt-2 md:pt-0'>
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
