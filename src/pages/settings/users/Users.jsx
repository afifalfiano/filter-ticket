/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import { useDispatch, useSelector } from 'react-redux';
import { HiSearch, HiTrash, HiEye, HiPencil } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';
import DeleteModal from '../../../components/common/DeleteModal';
import SkeletonTable from '../../../components/common/table/SkeletonTable';
import Pagination from '../../../components/common/table/Pagination';
import { selectAllUsers, setUsers } from '../../../store/features/users/usersSlice';
import { useAllUsersMutation } from '../../../store/features/users/usersApiSlice';
import FormUser from './FormUser';

function Users() {
  const dispatch = useDispatch();
  const columns = ['No', 'Nama', 'Email', 'Role Id', 'Pop Id', 'Aksi'];

  const [rows, setRows] = useState([]);
  const [allUsers, { isLoading }] = useAllUsersMutation();
  const [detail, setDetail] = useState(null);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('update');
  const dataRow = useSelector(selectAllUsers);

  const getAllUsers = async () => {
    try {
      const data = await allUsers().unwrap();
      console.log(data, 'dat nig');
      if (data.status === 'success') {
        dispatch(setUsers({ ...data }));
        setRows(data.data);
        console.log({ ...data }, 'data rows');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onHandleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value.length > 0) {
      const regex = new RegExp(search, 'ig');
      const searchResult = rows.filter((item) => item.name.match(regex) || item.email.match(regex));
      setRows(searchResult);
    } else {
      setRows(dataRow.data);
    }
  };

  const getInfo = ($event) => {
    console.log($event);
    if ($event.status === 'success') {
      getAllUsers();
    }
  };

  useEffect(() => {
    dispatch(
      updateBreadcrumb([
        { path: '/users', title: 'Pengaturan Pengguna' },
      ])
    );
    getAllUsers();
  }, []);

  return (
    <div>
      <div>
        <button
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md w-28"
          onClick={() => {
            setDetail(null);
            setTitle('create');
            document.getElementById('my-modal-3').click();
          }}
        >
          Tambah
        </button>
      </div>

      {!isLoading && (
        <div className="flex gap-5 mt-5">
          <div className="form-control">
            <label htmlFor="location" className="label font-semibold">
              <span className="label-text"> Cari</span>
            </label>
            <div className="flex items-center">
              <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <HiSearch />
                </div>
                <input
                  type="text"
                  id="voice-search"
                  className="input input-md input-bordered pl-10 p-2.5 "
                  placeholder="Cari data pengguna..."
                  value={search}
                  onChange={onHandleSearch}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* modal craete or update */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <FormUser getInfo={getInfo} detail={detail} titleAction={title} />

      {/* modal delete */}
      <input type="checkbox" id="my-modal-delete" className="modal-toggle" />
      <DeleteModal getInfo={getInfo} detail={detail} title="POP" />

      {isLoading && (
        <SkeletonTable countRows={8} countColumns={10} totalFilter={1} />
      )}

      {/* start table */}
      {!isLoading && (
        <div className="overflow-x-auto mt-8">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                {columns.map((item) => (
                  <th className="text-center">{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((item, index) => (
                <tr className="text-center" key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item?.role_id}</td>
                  <td>{item.pop_id}</td>
                  <td>
                    <div className="flex flex-row gap-3 justify-center">
                      <div className="tooltip" data-tip="Edit">
                        <HiPencil
                          className="cursor-pointer"
                          size={20}
                          color="#D98200"
                          onClick={() => {
                            setDetail(item);
                            setTitle('update');
                            document.getElementById('my-modal-3').click();
                          }}
                        />
                      </div>
                      {/* <div className="tooltip" data-tip="Hapus">
                        <HiTrash
                          size={20}
                          color="#FF2E00"
                          className="cursor-pointer"
                          onClick={() => {
                            setDetail(item);
                          // document.getElementById('my-modal-delete').click();
                          }}
                        />
                      </div> */}
                      {/* <div className="tooltip" data-tip="Detail">
                        <HiEye
                          size={20}
                          color="#0D68F1"
                          className="cursor-pointer"
                          onClick={() => {
                            setDetail(item);
                            setTitle('read');
                          // document.getElementById('my-modal-3').click();
                          }}
                        />
                      </div> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!isLoading && <Pagination />}
      {/* end table */}
    </div>
  );
}

export default Users;
