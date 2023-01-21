import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';
import { useIndexShiftMutation } from '../../../store/features/shift/shiftApiSlice';
import {
  selectAllShift,
  setShift,
} from '../../../store/features/shift/shiftSlice';
import FormShift from './FormShift';
import { selectModalState, setModal } from '../../../store/features/modal/modalSlice';
import catchError from '../../../services/catchError';
import { Button, DoDelete, DoUpdate, Search, DeleteModal, SkeletonTable, Pagination, Modal } from '../../../components';

const columns = ['No', 'Shift', 'Mulai', 'Selesai', 'Aksi'];

function Shift() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [indexShift, { isLoading }] = useIndexShiftMutation();
  const [detail, setDetail] = useState(null);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('update');
  const dataRow = useSelector(selectAllShift);
  const stateModal = useSelector(selectModalState);
  const openModal = (modal) => {
    let newState;
    if (modal === 'add shift') {
      newState = { ...stateModal, shift: { ...stateModal.shift, showAddModalShift: true } };
    } else if (modal === 'update shift') {
      newState = { ...stateModal, shift: { ...stateModal.shift, showUpdateModalShift: true } };
    } else if (modal === 'delete shift') {
      newState = { ...stateModal, shift: { ...stateModal.shift, showDeleteModalShift: true } };
    }
    dispatch(setModal(newState));
    window.scrollTo(0, 0);
  }

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
  const getAllShift = async () => {
    try {
      const data = await indexShift().unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        dispatch(setShift({ ...data }));
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
      const searchResult = dataRow.data.filter((item) => item.mulai.match(regex) || item.selesai.match(regex));
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
      getAllShift();
    }
  };

  const addData = () => {
    setDetail(null);
    setTitle('create');
    openModal('add shift');
  }

  const updateData = (item) => {
    setDetail(item);
    setTitle('update');
    openModal('update shift');
  }

  const deleteData = (item) => {
    setDetail(item);
    openModal('delete shift');
  }

  useEffect(() => {
    dispatch(updateBreadcrumb([{ path: '/shift', title: 'Pengaturan Shift' }]));
    getAllShift();
  }, []);

  return (
    <div>
      <div>
        <Button type="button" onClick={() => addData()} >Tambah</Button>

      </div>

      {!isLoading && (
        <div className="gap-5 mt-5 flex flex-col md:flex md:flex-row">
          <Search search={search} onHandleSearch={onHandleSearch} placeholder={'Cari data shift...'} />

        </div>
      )}

      <Modal>
        {stateModal?.shift?.showAddModalShift && <FormShift stateModal={stateModal} getInfo={getInfo} detail={detail} titleAction={title} />}
        {stateModal?.shift?.showUpdateModalShift && <FormShift stateModal={stateModal} getInfo={getInfo} detail={detail} titleAction={title} />}
        {stateModal?.shift?.showDeleteModalShift && <DeleteModal stateModal={stateModal} getInfo={getInfo} detail={detail} title="Shift" />}
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
                  <th key={index} className="text-center">{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((item, index) => (
                <tr className="text-center" key={index}>
                  <td>{index + 1}</td>
                  <td>{item.shift}</td>
                  <td>{item.mulai}</td>
                  <td>{item.selesai}</td>
                  <td>
                    <div className="flex flex-row gap-3 justify-center">
                      <DoUpdate onClick={() => updateData(item)} />
                      <DoDelete onClick={() => deleteData(item)} />
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

export default Shift;
