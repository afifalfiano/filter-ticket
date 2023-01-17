import { HiSearch } from "react-icons/hi";

function Search({...props}) {
    return (
        <div className="form-control w-full">
        <label htmlFor="location" className="label font-semibold">
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
              className="input input-md input-bordered pl-10 p-2.5 w-full md:w-52 "
              placeholder={props.placeholder}
              value={props.search}
              onChange={props.onHandleSearch}
            />
          </div>
        </div>
      </div>
    )
}

export default Search;