import { useCallback, useContext } from 'react';
import ChartContext from '@/context/ChartContext';
import { useToastr } from './useToastr';
import ChartService from '@/services/ChartService';

export function useChart() {

    const { productsChart, setProductsChart } = useContext(ChartContext)
    const { useCreateToastr } = useToastr();

    const addProduct = useCallback((id, qty = 1) => {
        ChartService.AddProduct(id, qty)
            .then(({ data, status }) => {
                if (status === 200) {
                    if (productsChart.find(product => product.id === data.product.pivot.product_id)) {
                        setProductsChart(productsChart.map(product => {
                            if (product.id === data.product.pivot.product_id) {
                                ++product.pivot.quantity;
                            }
                            return product;
                        }))
                    } else {
                        setProductsChart([...productsChart, data.product]);
                    }
                    
                    useCreateToastr({ status: true });
                }
            })
            .catch(e => console.error(e));
    }, [productsChart]);


    const removeProduct = useCallback((id) => {
        ChartService.RemoveProduct(id)
            .then(({ data, status }) => {
                if (status === 200) {
                    if (productsChart.find(product => product.id === id)) {
                        setProductsChart(productsChart.map(product => {
                            if (product.id === id) {
                                if (product.pivot.quantity > 1) {
                                    --product.pivot.quantity;
                                } else {
                                    return;
                                }
                            }
                            return product;
                        }).filter(product => product));
                    }
                    useCreateToastr({ status: true })
                }
            })
            .catch(e => console.error(e));
    }, [productsChart]);

    const removeLine = useCallback((id) => {
        ChartService.RemoveLine(id)
            .then(({ data, status }) => {
                if (status === 200) {
                    setProductsChart(productsChart.filter(product => product.id !== id));
                    useCreateToastr({ status: true })
                }
            })
            .catch(e => console.error(e));
    }, [productsChart]);

    return { productsChart, setProductsChart, addProduct, removeProduct, removeLine };

}
