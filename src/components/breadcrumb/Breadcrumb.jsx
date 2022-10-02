/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/no-unknown-property */
import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
// eslint-disable-next-line react/prop-types
function Breadcrumb({ breadcrumb }) {
  console.log(breadcrumb, 'b');

  return (
    <div className="pt-6 px-6 text-md breadcrumbs">
      <ul>
        <li>
          <Link to="/">
            <HiHome />
          </Link>
        </li>
        {breadcrumb.map((item) => (
          <li>
            <Link to={item.path}>{item.title}</Link>
          </li>
        ))}
      </ul>
      <hr className="mt-3" />
    </div>
  );
}

export default Breadcrumb;
