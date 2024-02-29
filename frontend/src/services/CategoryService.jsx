import Api from './Api';

const CategoryService = {

    Get() {
        return Api().get('categories');
    },

    Create(categoryData) {
        return Api().post('categories', categoryData);
    },

    Delete(id) {
        return Api().delete(`categories/${id}`);
    }

}

export default CategoryService;