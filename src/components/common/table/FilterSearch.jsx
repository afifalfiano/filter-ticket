/* eslint-disable object-curly-newline */
/* eslint-disable array-callback-return */
/* eslint-disable operator-linebreak */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import PropTypes from 'prop-types';

function FilterSearch({ originData, searchBy, setRows, rows }) {
  const [search, setSearch] = useState('');

  const onHandleSearch = (event) => {
    setSearch(event.target.value);

    if (event.target.value.length > 0) {
      const regex = new RegExp(search, 'ig');
      const searchResult = rows.filter((item) => {
        searchBy.forEach((keyword) => item[keyword].match(regex));
      });
      setRows(searchResult);
    } else {
      setRows(originData.data);
    }
  };

  return (
    <div className="form-control">
      <label htmlFor="search" className="label font-semibold">
        <span className="label-text"> Cari</span>
      </label>
      <div className="flex items-center">
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <HiSearch />
          </div>
          <input
            type="text"
            id="voice-search"
            className="input input-md input-bordered pl-10 p-2.5 "
            placeholder="Cari data keluhan..."
            value={search}
            onChange={onHandleSearch}
          />
        </div>
      </div>
    </div>
  );
}

FilterSearch.propTypes = {
  originData: PropTypes.object,
  searchBy: PropTypes.array,
  setRows: PropTypes.any,
  rows: PropTypes.array,
};

export default FilterSearch;
