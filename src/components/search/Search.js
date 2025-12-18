
import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { options, GEO_API_URL } from './api';

function Search({ searchDataHandler }) {
    const [search, handleSearch] = useState(null)
    const searchHandler = (searchData) => {
        handleSearch(searchData)
        searchDataHandler(searchData)
    }
    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, options)
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    }
                }),
                };
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <AsyncPaginate
                placeholder=" Search for a city"
                debounceTimeout={600}
                value={search}
                onChange={searchHandler}
                loadOptions={loadOptions} />
        </div>
    )

}

export default Search;