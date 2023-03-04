const stylePagination = {
  'width': '350px',
  'overflow': 'auto',
  'display': 'flex',
  'flex-direction': 'row',
  'max-width': '350px',
}

const styleDefault = {
  'width': 'auto',
}

function Pagination({
  perPage = [5, 10, 25, 50, 100],
  currentFilterPage = 10,
  currentPage = 1,
  countPage = [1],
  onClick,
  serverMode = true,
  handlePerPage,
}) {

  return (
    <>
      <div className={`flex flex-col md:justify-between md:flex-row  mt-5 mb-5 items-center`}>
        {serverMode && (
          <>
            <div className="flex flex-row gap-1 justify-between md:justify-start">
              <label htmlFor="page" className="label font-semibold">
                <span className="label-text">
                  Halaman &nbsp;
                  {currentPage}
                  &nbsp; dari &nbsp;
                  {countPage.length}
                </span>
              </label>
              <div className="form-control">
                <select
                  className="select input-bordered"
                  onChange={handlePerPage}
                >
                  {perPage?.map((item, index) => (
                    <option key={index} value={item} label={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={`mt-3 md:mt-0 justify-start`}>
              <div style={countPage.length > 4 ? stylePagination : styleDefault}>
              <div className="btn-group flex-nowrap">
                {countPage?.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={`btn btn-outline ${
                        currentPage === item && "btn-active"
                      }`}
                      onClick={onClick}
                      id={item}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
              </div>
              
            </div>
          </>
        )}
        {!serverMode && (
          <>
            <div className="flex flex-row gap-1 justify-between md:justify-start">
              <label htmlFor="page" className="label font-semibold">
                <span className="label-text">
                  Halaman &nbsp;
                  {currentPage}
                  &nbsp; dari &nbsp;
                  {countPage.length}
                </span>
              </label>
              <div className="form-control">
                <select
                  className="select input-bordered"
                  onChange={handlePerPage}
                  defaultValue={currentFilterPage}
                >
                  {perPage?.map((item, index) => (
                    <option
                      key={index}
                      value={item}
                      label={item}
                      defaultValue={currentFilterPage === item && true}
                    >
                      item
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-3 md:mt-0 justify-start">
              <div className="btn-group">
                {countPage?.map((item, index) => (
                  <button
                    key={index}
                    className={`btn btn-outline ${
                      +currentPage === item && "btn-active"
                    }`}
                    onClick={onClick}
                    id={item}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default Pagination;
