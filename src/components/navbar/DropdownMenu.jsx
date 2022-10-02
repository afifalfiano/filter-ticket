/* eslint-disable */
import {Link, useNavigate} from 'react-router-dom'


const DropdownMenu = () => {

  const navigate = useNavigate();

  const onLogout = (e) => {
    e.preventDefault();
    console.log('logout');
    alert('Logout done');
    localStorage.clear();
    navigate('/sign_in');
    window.location.reload();
  }
  return (
    <>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
              <span className="text-2xl">A</span>
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