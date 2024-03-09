import Api from './Api';
import JwtService from './JwtService';

const ProductService = {

    Get() {
        const A = JwtService.getToken() ? 'A' : '';
        return Api().get(`products${A}`);
    },

    GetOne(id) {
        return Api().get(`products/${id}`);
    },

    GetFiltered(filters) {
        const A = JwtService.getToken() ? 'A' : '';
        return Api().post(`products${A}/filtered`, filters);
    },

    GetWishlist() {
        return Api().get('user/favorite-products');
    },

    Create(productData) {
        return Api().post('products', productData);
    },

    ToggleFavorite(id) {
        return Api().post(`products/${id}/favorite`);
    },

    Delete(id) {
        return Api().delete(`products/${id}`);
    }

}

export default ProductService;