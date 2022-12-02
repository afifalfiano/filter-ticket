/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState } from 'react';

/* eslint-disable react/button-has-type */
function Pagination({ perPage = [5, 10, 25, 50, 100], currentFilterPage = 5, currentPage = 1, countPage = [1], onClick, serverMode = true, handlePerPage }) {
  console.log(perPage, 'items per page');
  console.log(currentFilterPage, 'current filter per page');
  console.log(currentPage, 'current page');
  console.log(countPage, 'count page');
  return (
    <div className="flex justify-between mt-5 pb-20">
      {serverMode && (
      <>
        <div className="flex flex-row gap-1">
          <label htmlFor="page" className="label font-semibold">
            <span className="label-text">
              {' '}
              Halaman
              {' '}
              {currentPage}
              {' '}
              dari
              {' '}
              {countPage.length}
            </span>
          </label>
          <div className="form-control">
            <select className="select input-bordered" onChange={handlePerPage}>
              {perPage?.map((item) => (
                <option value={item} label={item}>item</option>
              ))}
            </select>
          </div>
        </div>
        <div className="">
          <div className="btn-group">
            {countPage?.map((item) => (
              <button className={`btn btn-outline ${currentPage === item && 'btn-active'}`} onClick={onClick} id={item}>{item}</button>
            ))}
          </div>
        </div>
      </>
      )}
      {!serverMode && (
        <>
          <div className="flex flex-row gap-1">
            <label htmlFor="page" className="label font-semibold">
              <span className="label-text">
                {' '}
                Halaman
                {' '}
                {currentPage}
                {' '}
                dari
                {' '}
                {countPage.length}
              </span>
            </label>
            <div className="form-control">
              <select className="select input-bordered" onChange={handlePerPage} defaultValue={currentFilterPage}>
                {perPage?.map((item) => (
                  <option value={item} label={item} selected={currentFilterPage === item && true}>item</option>
                ))}
              </select>
            </div>
          </div>
          <div className="">
            <div className="btn-group">
              {countPage?.map((item) => (
                <button className={`btn btn-outline ${+currentPage === item && 'btn-active'}`} onClick={onClick} id={item}>{item}</button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default Pagination;
