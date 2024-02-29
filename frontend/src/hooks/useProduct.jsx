import { useCallback, useState } from 'react';
import { useToastr } from './useToastr';
import ProductService from '@/services/ProductService';

export function useProduct() {

    const [ products, setProducts ] = useState([])
    const { useCreateToastr } = useToastr();

    const getProducts = useCallback(() => {
        ProductService.Get()
            .then(({ data, status }) => {
                if (status === 200) {
                    setProducts(data);
                }
            })
            .catch(e => console.error(e));
    }, [setProducts]);

    const createProduct = useCallback((productData) => {
        ProductService.Create(productData)
            .then(({ data, status }) => {
                if (status === 201) {
                    setProducts([...products, data])
                    useCreateToastr({ status: true })
                }
            })
            .catch(e => {
                useCreateToastr({ status: true, message: e.response.data.message, error: 'error' })
            });
    }, [products]);

    const deleteProduct = useCallback((id) => {
        ProductService.Delete(id)
            .then(({ status }) => {
                if (status === 204) {
                    setProducts(products.filter(product => product.id !== id))
                    useCreateToastr({ status: true })
                }
            })
            .catch(e => {
                useCreateToastr({ status: true, message: e.response.data.message, error: 'error' })
            });
    }, [products]);
    
    return { products, setProducts, getProducts, createProduct, deleteProduct };

}
