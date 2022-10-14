/* eslint-disable */
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import { useLogoutMutation } from '../../store/features/auth/authApiSlice';
import { selectCurrentUser, setLogOut } from '../../store/features/auth/authSlice';
import { clearBTS } from '../../store/features/bts/btsSlice';
import { clearComplain } from '../../store/features/complain/complainSlice';

const DropdownMenu = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const [logout] = useLogoutMutation();

  const onLogout = async (e) => {
    e.preventDefault();

    try {
      const userLogout = await logout().unwrap();
      dispatch((action) => {
        action(setLogOut());
        action(clearBTS());
        action(clearComplain());
      });
      if (userLogout?.status === 'success') {
        localStorage.clear();
        navigate('/sign_in', {replace: true});
      }

    } catch (err) {
      localStorage.clear();
      navigate('/sign_in');
    }

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