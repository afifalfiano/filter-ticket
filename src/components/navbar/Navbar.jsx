import { useState } from 'react';
import DropdownMenu from './DropdownMenu';
import Menu from './Menu';
import Notification from './Notification';
import Breadcrumb from '../breadcrumb/Breadcrumb';
/* eslint-disable */
const  Navbar = () => {

  const [breadcrumb, setBreadcrumb] = useState([{path: '/dashboard', title: 'Dasbor'}]);

  const getBreadcrumb = (event) => {
    console.log(event, 'log');
    let title = event.target.innerText;
    if (event.target.innerText === 'Filtering Ticket') {
      title = 'Dasbor';
    }
    setBreadcrumb([{
      title,
      path: event.target.pathname
    }]);
  }

  return (
    <>
    <div className="navbar bg-neutral text-neutral-content ">
      <Menu handleBreadcrumb={getBreadcrumb} />
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
