import Api from './Api';

const OrderService = {

    Get() {
        return Api().get('user/orders');
    },

    GetOne(id) {
        return Api().get(`orders/${id}`);
    },

}

export default OrderService;