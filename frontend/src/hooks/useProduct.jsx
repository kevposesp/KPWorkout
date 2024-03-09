import { useCallback, useState } from 'react';
import { useToastr } from './useToastr';
import ProductService from '@/services/ProductService';

export function useProduct() {

    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})
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

    const getProduct = useCallback((id) => {
        return ProductService.GetOne(id)
            .then(({ data, status }) => {
                if (status === 200) {
                    setProduct(data);
                }
            })
            .catch(e => console.error(e));
    }, [setProduct, setProducts]);

    const getProductsFiltered = useCallback((filters) => {
        ProductService.GetFiltered(filters)
            .then(({ data, status }) => {
                if (status === 200) {
                    setProducts(data);
                }
            })
            .catch(e => console.error(e));
    }, [setProducts]);

    const getWishlist = useCallback(() => {
        ProductService.GetWishlist()
            .then(({ data, status }) => {
                if (status === 200) {
                    setProducts(data.data);
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

    const toggleFavorite = useCallback((id, type = '') => {
        ProductService.ToggleFavorite(id)
            .then(({ data, status }) => {
                if (status === 200) {
                    if (type === 'wish') {
                        setProducts(products.filter(product => product.id !== id))
                    } else {
                        setProducts(products.map(product => product.id === id ? { ...product, is_favorite: !product.is_favorite } : product))
                    }
                    useCreateToastr({ status: true })
                }
            })
            .catch(e => console.error(e));
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

    return {
        products,
        product,
        setProducts,
        getProducts,
        getProduct,
        getProductsFiltered,
        createProduct,
        toggleFavorite,
        getWishlist,
        deleteProduct
    };

}
