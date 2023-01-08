function Pagination({ perPage = [5, 10, 25, 50, 100], currentFilterPage = 10, currentPage = 1, countPage = [1], onClick, serverMode = true, handlePerPage }) {
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
              {perPage?.map((item, index) => (
                <option key={index} value={item} label={item}>item</option>
              ))}
            </select>
          </div>
        </div>
        <div className="">
          <div className="btn-group">
            {countPage?.map((item, index) => (
              <button key={index} className={`btn btn-outline ${currentPage === item && 'btn-active'}`} onClick={onClick} id={item}>{item}</button>
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
                {perPage?.map((item, index) => (
                  <option key={index} value={item} label={item} selected={currentFilterPage === item && true}>item</option>
                ))}
              </select>
            </div>
          </div>
          <div className="">
            <div className="btn-group">
              {countPage?.map((item, index) => (
                <button key={index} className={`btn btn-outline ${+currentPage === item && 'btn-active'}`} onClick={onClick} id={item}>{item}</button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default Pagination;
