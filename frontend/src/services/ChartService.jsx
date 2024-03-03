import Api from './Api';

const ChartService = {

    Get() {
        return Api().get('user/chart');
    },

    AddProduct(id) {
        return Api().post(`chart/${id}/add`);
    },

    RemoveProduct(id) {
        return Api().post(`chart/${id}/remove`);
    },

}

export default ChartService;