import Api from './Api';

const FilterService = {

    Get() {
        return Api().get('filters');
    }

}

export default FilterService;