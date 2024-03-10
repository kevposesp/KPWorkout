import React, { useState, useEffect } from 'react'
import OrderService from '@/services/OrderService';
import JwtService from '@/services/JwtService';

const Context = React.createContext({})

export function OrderContext({ children }) {
    const [orders, setOrders] = useState([]);
    const [token, setToken] = useState(JwtService.getToken ? JwtService.getToken : false);

    useEffect(function () {
        if (token) {
            OrderService.Get()
                .then(({ data, status }) => {
                    if (status === 200) {
                        setOrders(data.data);
                    }
                })
                .catch(e => console.error(e));
        }
    }, [setOrders]);

    return <Context.Provider value={{ orders, setOrders }}>
        {children}
    </Context.Provider>
}

export default Context