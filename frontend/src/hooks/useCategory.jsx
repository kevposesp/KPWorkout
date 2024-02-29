import { useCallback, useContext } from 'react';
import CategoryContext from '@/context/CategoryContext';
import { useToastr } from './useToastr';
import CategoryService from '@/services/CategoryService';

export function useCategory() {

    const { categories, setCategories } = useContext(CategoryContext)
    const { useCreateToastr } = useToastr();

    const createCategory = useCallback((categoryData) => {
        CategoryService.Create(categoryData)
            .then(({ data, status }) => {
                if (status === 201) {
                    if (!categoryData.parent_id) {
                        data['children_categories'] = []
                        setCategories([...categories, data])
                    } else {
                        setCategories(categories.map(category => {
                            if (category.id === categoryData.parent_id) {
                                category.children_categories.push(data);
                            }
                            return category;
                        }))
                    }
                    useCreateToastr({ status: true })
                }
            })
            .catch(e => {
                useCreateToastr({ status: true, message: e.response.data.message, error: 'error' })
            });
    }, [categories]);

    const deleteCategory = useCallback((id) => {
        CategoryService.Delete(id)
            .then(({ status }) => {
                if (status === 204) {
                    setCategories(categories.filter(category => category.id !== id))
                    useCreateToastr({ status: true })
                }
            })
            .catch(e => {
                useCreateToastr({ status: true, message: e.response.data.message, error: 'error' })
            });
    }, [categories]);
    
    return { categories, setCategories, createCategory, deleteCategory };

}
