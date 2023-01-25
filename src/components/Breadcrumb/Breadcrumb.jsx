import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { selectBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
function Breadcrumb() {
  const navigasi = useSelector(selectBreadcrumb);

  return (
    <div className="px-6 text-md breadcrumbs pt-24">
      <ul>
        <li>
          <Link to="/dashboard">
            <HiHome />
          </Link>
        </li>
        {navigasi?.data?.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>{item.title}</Link>
          </li>
        ))}
      </ul>
      <hr className="mt-3" />
    </div>
  );
}

export default Breadcrumb;
