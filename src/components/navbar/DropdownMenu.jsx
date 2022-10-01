/* eslint-disable */
import {Link} from 'react-router-dom'

const DropdownMenu = () => {

  const onLogout = (e) => {
    e.preventDefault();
    console.log('logout');
    alert('Logout done');
  }
  return (
    <>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src="https://placeimg.com/80/80/people" />
          </div>
        </label>
        <div
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-neutral rounded-box w-52"
        >
        <Link className="btn justify-start  btn-ghost normal-case text-sm" to="profile">
          Profile
        </Link>
        <div className="btn justify-start btn-ghost normal-case text-sm" onClick={onLogout}>
        Keluar
        </div>
        </div>

      </div>
    </>
  )
}


export default DropdownMenu;