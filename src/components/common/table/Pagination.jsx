/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState } from 'react';

/* eslint-disable react/button-has-type */
function Pagination() {
  const [dataPerPage, setDataPerPage] = useState(5);
  const handlePerPage = (event) => {
    setDataPerPage(event.target.value);
  };

  return (
    <div className="flex justify-between mt-5 pb-20">
      <div className="flex flex-row gap-1">
        <label htmlFor="page" className="label font-semibold">
          <span className="label-text"> Halaman 1 dari 1</span>
        </label>
        <div className="form-control">
          <select className="select input-bordered" onChange={handlePerPage}>
            <option value={5} label={5}>5</option>
            <option value={10} label={10}>10</option>
            <option value={25} label={25}>25</option>
            <option value={50} label={50}>50</option>
            <option value={100} label={100}>100</option>
          </select>
        </div>
      </div>
      <div className="">
        <div className="btn-group">
          <button className="btn btn-outline btn-active">1</button>
          <button className="btn btn-outline">2</button>
          <button className="btn btn-outline">3</button>
          <button className="btn btn-outline">4</button>
        </div>
      </div>
    </div>
  );
}
export default Pagination;
