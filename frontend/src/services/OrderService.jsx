import Api from './Api';

const OrderService = {

    Get() {
        return Api().get('user/orders');
    },

    GetOne(id) {
        return Api().get(`orders/${id}`);
    },

    GetAllOrders() {
        return Api().get('orders');
    },

    Update(id, data) {
        return Api().put(`orders/${id}`, data);
    }

}

export default OrderService;