import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';
import { selectAllPOP, setPOP } from '../../../store/features/pop/popSlice';
import { useAllPOPMutation } from '../../../store/features/pop/popApiSlice';
import FormPOP from './FormPOP';
import { selectModalState, setModal } from '../../../store/features/modal/modalSlice';
import catchError from '../../../services/catchError';
import { Button, DoDelete, DoUpdate, Search, Modal, SkeletonTable, Pagination, DeleteModal } from '../../../components';

const columns = ['No', 'Nama', 'Aksi'];

function Pop() {
  const dispatch = useDispatch();

  const [rows, setRows] = useState([]);
  const [allPOP, { isLoading }] = useAllPOPMutation();
  const [detail, setDetail] = useState(null);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('update');
  const dataRow = useSelector(selectAllPOP);
  const stateModal = useSelector(selectModalState);
  const openModal = (modal) => {
    let newState;
    if (modal === 'add pop') {
      newState = { ...stateModal, pop: { ...stateModal.pop, showAddModalPop: true } };
    } else if (modal === 'update pop') {
      newState = { ...stateModal, pop: { ...stateModal.pop, showUpdateModalPop: true } };
    } else if (modal === 'delete pop') {
      newState = { ...stateModal, pop: { ...stateModal.pop, showDeleteModalPop: true } };
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

  const getAllPOP = async () => {
    try {
      const data = await allPOP().unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        dispatch(setPOP({ ...data }));
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
      const searchResult = dataRow.data.filter((item) => item.pop.match(regex));
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
      getAllPOP();
    }
  };

  useEffect(() => {
    dispatch(updateBreadcrumb([{ path: '/pop', title: 'Pengaturan POP' }]));
    getAllPOP();
  }, []);


  const addData = () => {
    setDetail(null);
    setTitle('create');
    openModal('add pop');
  }

  const updateData = (item) => {
    setDetail(item);
    setTitle('update');
    openModal('update pop');
  }

  const deleteData = (item) => {
    setDetail(item);
    openModal('delete pop');
  }

  return (
    <div>
      <div>
        <Button type="button" onClick={() => addData()} >Tambah</Button>
      </div>

      {!isLoading && (
        <div className="gap-5 mt-5 flex flex-col md:flex md:flex-row">
          <Search search={search} onHandleSearch={onHandleSearch} placeholder={'Cari data POP...'} />
        </div>
      )}

      <Modal>
        {stateModal?.pop?.showAddModalPop && <FormPOP stateModal={stateModal} getInfo={getInfo} detail={detail} titleAction={title} />}
        {stateModal?.pop?.showUpdateModalPop && <FormPOP stateModal={stateModal} getInfo={getInfo} detail={detail} titleAction={title} />}
        {stateModal?.pop?.showDeleteModalPop && <DeleteModal stateModal={stateModal} getInfo={getInfo} detail={detail} title="POP" />}
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
                  <td>{item.pop}</td>
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

export default Pop;
