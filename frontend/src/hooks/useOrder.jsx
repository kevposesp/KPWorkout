import { useCallback, useContext, useEffect, useState } from 'react';
import { useToastr } from './useToastr';
import OrderService from '@/services/OrderService';
import OrderContext from '@/context/OrderContext';

export function useOrder() {

    const { orders, setOrders } = useContext(OrderContext)
    const [order, setOrder] = useState({})
    const { useCreateToastr } = useToastr();

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

    const getOrdersAdmin = useCallback(() => {
        OrderService.GetAllOrders()
            .then(({ data, status }) => {
                if (status === 200) {
                    setOrders(data);
                }
            })
            .catch(e => console.error(e));
    }, [setOrders]);

    const updateOrder = useCallback((id, status_order) => {
        OrderService.Update(id, { status: status_order })
            .then(({ data, status }) => {
                if (status === 200) {
                    getOrdersAdmin();
                    useCreateToastr({ status: true });
                }
            })
            .catch(e => console.error(e));
    }, [setOrders]);

    return { orders, order, setOrders, getOrders, getOrder, getOrdersAdmin, updateOrder };

}
