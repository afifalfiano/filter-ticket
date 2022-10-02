/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/no-unknown-property */
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Breadcrumb({ breadcrumb }) {
  console.log(breadcrumb, 'b');

  return (
    <div className="pt-6 px-6 text-md breadcrumbs">
      <ul>
        <li>
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 mr-2 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
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
