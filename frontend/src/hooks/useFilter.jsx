import { useCallback, useContext } from 'react';
import FilterContext from '@/context/FilterContext';
import { useToastr } from './useToastr';
import FilterService from '@/services/FilterService';

export function useFilter() {

    const { filtersHook, setFiltersHook } = useContext(FilterContext)
    const { useCreateToastr } = useToastr();

    const createFilter = useCallback(async (data) => {
        FilterService.Create(data)
            .then(({ data, status }) => {
                setFiltersHook(data);
                useCreateToastr({ status: true })
            })
            .catch(e => {
                useCreateToastr({ status: true, message: e.response.data.message, error: 'error' })
            });
    }, [setFiltersHook]);

    const updateFilter = useCallback(async (data) => {
        FilterService.Update(data)
            .then(({ data, status }) => {
                setFiltersHook(data);
                useCreateToastr({ status: true })
            })
            .catch(e => {
                useCreateToastr({ status: true, message: e.response.data.message, error: 'error' })
            });
    }, [setFiltersHook]);

    const deleteFilter = useCallback(async (id) => {
        FilterService.Delete(id)
            .then(({ data, status }) => {
                setFiltersHook(data);
                useCreateToastr({ status: true })
            })
            .catch(e => {
                useCreateToastr({ status: true, message: e.response.data.message, error: 'error' })
            });
    }, [setFiltersHook]);

    return { filtersHook, setFiltersHook, createFilter, deleteFilter, updateFilter };

}
