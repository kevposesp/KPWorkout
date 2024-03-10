import { useCallback, useContext } from 'react';
import FilterContext from '@/context/FilterContext';
import { useToastr } from './useToastr';
import FilterService from '@/services/FilterService';

export function useFilter() {

    const { filtersHook, setFiltersHook } = useContext(FilterContext)
    const { useCreateToastr } = useToastr();

    
    return { filtersHook, setFiltersHook };

}
