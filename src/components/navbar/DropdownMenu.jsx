/* eslint-disable */
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import { useLogoutMutation } from '../../store/features/auth/authApiSlice';
import { selectCurrentUser, setLogOut } from '../../store/features/auth/authSlice';

const DropdownMenu = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const [logout, { isLoading }] = useLogoutMutation();
  const user = useSelector(selectCurrentUser);
  console.log(user, 'user');

  const onLogout = async (e) => {
    e.preventDefault();

    try {
      const userData = await logout().unwrap();
      dispatch(setLogOut());
      console.log(userData, 'log');
      localStorage.clear();
      setTimeout(() => {
        navigate('/sign_in');
        window.location.reload();
      }, 1000)

    } catch (err) {
      localStorage.clear();
      setTimeout(() => {
        navigate('/sign_in');
        window.location.reload();
      }, 1000)
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