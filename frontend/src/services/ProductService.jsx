import Api from './Api';

const ProductService = {

    Get() {
        return Api().get('products');
    },

    Create(productData) {
        return Api().post('products', productData);
    },

    Delete(id) {
        return Api().delete(`products/${id}`);
    }

}

export default ProductService;