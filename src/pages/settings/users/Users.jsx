import { useDispatch, useSelector } from 'react-redux';
import { HiSearch, HiPencil, HiCheckCircle, HiOutlineBan } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';
import SkeletonTable from '../../../components/common/table/SkeletonTable';
import Pagination from '../../../components/common/table/Pagination';
import { selectAllUsers, setUsers } from '../../../store/features/users/usersSlice';
import { useAllUsersMutation } from '../../../store/features/users/usersApiSlice';
import FormUser from './FormUser';
import Modal from '../../../components/modal/Modal';
import { selectModalState, setModal } from '../../../store/features/modal/modalSlice';
import catchError from '../../../services/catchError';
import DeleteModal from '../../../components/common/DeleteModal';

function Users() {
  const dispatch = useDispatch();
  const columns = ['No', 'Nama', 'Email', 'Role Id', 'Pop Id', 'Status', 'Aksi'];

  const [rows, setRows] = useState([]);
  const [allUsers, { isLoading }] = useAllUsersMutation();
  const [detail, setDetail] = useState(null);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('update');
  const dataRow = useSelector(selectAllUsers);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    currentFilterPage: 10,
    pageNumbers: [1],
    filterPage: [5, 10, 25, 50, 100]
  });

  const handlePagination = (targetPage = 1, data) => {
    setPagination({ ...pagination, currentPage: targetPage, currentFilterPage: pagination.currentFilterPage })
    const indexOfLastPost = targetPage * pagination.currentFilterPage;
    const indexOfFirstPost = indexOfLastPost - pagination.currentFilterPage;
    let currentPosts;
    if (data === undefined) {
      currentPosts = dataRow?.data.slice(indexOfFirstPost, indexOfLastPost);
    } else {
      currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
    }
    setRows(currentPosts);
  }

  const doGetPageNumber = (dataFix) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataFix.length / pagination.currentFilterPage); i++) {
      pageNumbers.push(i);
    }
    setPagination({ ...pagination, pageNumbers });
  }

  const handleFilterPagination = (selectFilter) => {
    const indexOfLastPost = pagination.currentPage * selectFilter;
    const indexOfFirstPost = indexOfLastPost - selectFilter;
    const currentPosts = dataRow?.data.slice(indexOfFirstPost, indexOfLastPost);
    setRows(currentPosts);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataRow.data.length / selectFilter); i++) {
      pageNumbers.push(i);
    }
    setPagination({ ...pagination, pageNumbers, currentFilterPage: selectFilter });
  }

  const stateModal = useSelector(selectModalState);

  const openModal = (title) => {

    let newState;
    if (title === 'update') {
      newState = { ...stateModal, user: { ...stateModal.user, showUpdateModalUser: true } };
    } else if (title === 'aktifkan') {
      newState = { ...stateModal, user: { ...stateModal.user, showActivateModalUser: true } };
    } else if (title === 'nonaktifkan') {
      newState = { ...stateModal, user: { ...stateModal.user, showDeactivateModalUser: true } };
    }

    dispatch(setModal(newState));
    window.scrollTo(0, 0);
  }

  const getAllUsers = async () => {
    try {
      const data = await allUsers().unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        dispatch(setUsers({ ...data }));
        setRows(data.data);
        handlePagination(1, data.data);
        doGetPageNumber(data.data);
      } else {
        setRows([]);
        catchError(data, true);
      }
    } catch (err) {
      setRows([]);
      catchError(err, true);
    }
  };

  const onHandleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value.length > 0) {
      const regex = new RegExp(search, 'ig');
      const searchResult = dataRow.data.filter((item) => item.name.match(regex) || item.email.match(regex));
      setRows(searchResult);
      setPagination({
        currentPage: 1,
        currentFilterPage: 100,
        pageNumbers: [1],
        filterPage: [5, 10, 25, 50, 100]
      });
    } else {
      setRows(dataRow.data);
      setPagination({
        currentPage: 1,
        currentFilterPage: 100,
        pageNumbers: [1],
        filterPage: [5, 10, 25, 50, 100]
      });
    }
  };

  const getInfo = ($event) => {
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
      {!isLoading && (
        <div className="flex gap-5">
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

      <Modal>
        {stateModal?.user?.showUpdateModalUser && <FormUser stateModal={stateModal} getInfo={getInfo} detail={detail} titleAction={title} /> }
        {stateModal?.user?.showActivateModalUser && <DeleteModal stateModal={stateModal} getInfo={getInfo} detail={detail} title="Aktifkan user" message='Apakah anda yakin akan mengaktifkan' titleModal="" titleAction="Aktifkan"/> }
        {stateModal?.user?.showDeactivateModalUser && <DeleteModal stateModal={stateModal} getInfo={getInfo} detail={detail} title="Nonaktifkan user" message='Apakah anda yakin akan menonaktifkan' titleModal="" titleAction="Nonaktifkan" /> }
      </Modal>
      {isLoading && (
        <SkeletonTable countRows={8} countColumns={10} totalFilter={1} />
      )}

      {/* start table */}
      {!isLoading && (
        <div className="overflow-x-auto mt-8">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                {columns.map((item, index) => (
                  <th className="text-center" key={index}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((item, index) => (
                <tr className="text-center" key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item?.role?.role}</td>
                  <td>{item?.pop?.pop}</td>
                  <td>{item.aktif ? (
                    <span className="badge badge-success text-white">
                      Aktif
                    </span>
                  ): (
                    <span className="badge badge-error text-white">
                      Tidak aktif
                    </span>
                  )}</td>
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
                            openModal('update');
                          }}
                        />
                      </div>
                    {item.aktif && (
                      <div className="tooltip" data-tip="Non aktifkan">
                        <HiOutlineBan
                          className="cursor-pointer"
                          size={20}
                          color="#F87272"
                          onClick={() => {
                            setDetail(item);
                            setTitle('nonaktifkan');
                            openModal('nonaktifkan');
                          }}
                        />
                    </div>)}
                    {!item.aktif && (
                      <div className="tooltip" data-tip="Aktifkan">
                        <HiCheckCircle
                          className="cursor-pointer"
                          size={20}
                          color="#36D399"
                          onClick={() => {
                            setDetail(item);
                            setTitle('aktifkan');
                            openModal('aktifkan');
                          }}
                        />
                    </div>
                    )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!isLoading && <Pagination serverMode={false} currentFilterPage={pagination.currentFilterPage} perPage={pagination.filterPage} currentPage={pagination.currentPage} countPage={pagination.pageNumbers} onClick={(i) => handlePagination(i.target.id, undefined)} handlePerPage={(x) => handleFilterPagination(x.target.value)} />}
      {/* end table */}
    </div>
  );
}

export default Users;
