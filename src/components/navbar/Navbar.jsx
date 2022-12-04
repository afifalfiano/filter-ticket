import { useState } from 'react';
import { useSelector } from 'react-redux';
import DropdownMenu from './DropdownMenu';
import Menu from './Menu';
import Notification from './Notification';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import { selectBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
/* eslint-disable */
const  Navbar = () => {

  const [breadcrumb, setBreadcrumb] = useState([{path: '/dashboard', title: 'Dasbor'}]);

  const navigasi = useSelector(selectBreadcrumb)

  return (
    <>
    <div className="navbar bg-neutral text-neutral-content ">
      <Menu/>
      <div className="flex-none">
        <Notification />
        <DropdownMenu />
      </div>
    </div>
    <Breadcrumb breadcrumb={breadcrumb}/>
    </>
  );
}
export default Navbar;
