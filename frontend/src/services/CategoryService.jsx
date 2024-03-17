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
    },

    GetAll() {
        return Api().get('categories/all');
    },

    Update(id, categoryData) {
        return Api().put(`categories/${id}`, categoryData);
    }
    
}

export default CategoryService;