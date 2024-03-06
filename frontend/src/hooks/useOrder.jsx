import { useCallback, useEffect, useState } from 'react';
import { useToastr } from './useToastr';
import OrderService from '@/services/OrderService';

export function useOrder() {

    const [orders, setOrders] = useState([])
    const [order, setOrder] = useState({})
    const { useCreateToastr } = useToastr();

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = useCallback(() => {
        OrderService.Get()
            .then(({ data, status }) => {
                if (status === 200) {
                    setOrders(data.data);
                }
            })
            .catch(e => console.error(e));
    }, [setOrders]);

    const getOrder = useCallback((id) => {
        OrderService.GetOne(id)
            .then(({ data, status }) => {
                if (status === 200) {
                    setOrder(data);
                }
            })
            .catch(e => console.error(e));
    }, [setOrder]);

    return { orders, order, setOrders, getOrders, getOrder };

}
