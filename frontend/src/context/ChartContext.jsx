import React, { useState, useEffect, useCallback } from 'react'
import ChartService from '@/services/ChartService';
import JwtService from '@/services/JwtService';

const Context = React.createContext({})

export function ChartContext({ children }) {
    const [productsChart, setProductsChart] = useState([]);
    const [token, setToken] = useState(JwtService.getToken ? JwtService.getToken : false);

    useEffect(function () {
        if (token) {
            getProductsChart()
        }
    }, [setProductsChart]);

    const getProductsChart = useCallback(() => {
        ChartService.Get()
            .then(({ data, status }) => {
                if (status === 200) {
                    setProductsChart(data.data);
                }
            })
            .catch(e => console.error(e));
    }, [setProductsChart]);

    return <Context.Provider value={{ productsChart, setProductsChart, getProductsChart }}>
        {children}
    </Context.Provider>
}

export default Context