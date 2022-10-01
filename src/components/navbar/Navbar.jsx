import DropdownMenu from './DropdownMenu';
import Menu from './Menu';
import Notification from './Notification';
/* eslint-disable */
const  Navbar = () => {
  return (
    <div className="navbar bg-neutral text-neutral-content ">
      <Menu />

      <div className="flex-none">
        <Notification />
        <DropdownMenu />
      </div>
    </div>
  );
}
export default Navbar;
