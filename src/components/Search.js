import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, GeoAPIOption } from '../Api';

const Search = ({onSearchChange}) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`, GeoAPIOption
    )
      .then(response => response.json())
      .then(response => {
        return {
          options: response.data.map((city) => {
            console.log(response);
            return {
              value:`${city.latitude} ${city.longitude}`,
              label:`${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={500}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
}
export default Search;