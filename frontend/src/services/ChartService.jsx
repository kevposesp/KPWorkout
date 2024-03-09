import Api from './Api';

const ChartService = {

    Get() {
        return Api().get('user/chart');
    },

    AddProduct(id, qty) {
        return Api().post(`chart/${id}/add/${qty}`);
    },

    RemoveProduct(id) {
        return Api().post(`chart/${id}/remove`);
    },

    RemoveLine(id) {
        return Api().post(`chart/${id}/removeOne`);
    }

}

export default ChartService;