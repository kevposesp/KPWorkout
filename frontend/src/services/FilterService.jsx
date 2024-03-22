import Api from './Api';

const FilterService = {

    Get() {
        return Api().get('filters');
    },

    Create(data) {
        return Api().post('filters', data);
    },

    Update(data) {
        return Api().put(`filters/${data.id}`, data);
    },

    Delete(id) {
        return Api().delete(`filters/${id}`);
    }

}

export default FilterService;