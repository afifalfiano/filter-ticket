import React, { useState, useEffect } from 'react';
import {
  HiSearch,
  HiTrash,
  HiEye,
  HiOutlinePrinter
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import Pagination from '../../components/common/table/Pagination';
import DeleteModal from '../../components/common/DeleteModal';
import { selectAllReport, setReport } from '../../store/features/report/reportSlice';
import { useAllPOPMutation } from '../../store/features/pop/popApiSlice';
import { setPOP } from '../../store/features/pop/popSlice';
import { selectCurrentUser } from '../../store/features/auth/authSlice';
import ReportDetail from './detail/ReportDetail';
import Modal from '../../components/modal/Modal';
import { selectModalState, setModal } from '../../store/features/modal/modalSlice';
import { useAllReportMutation } from '../../store/features/report/reportApiSlice';
import catchError from '../../services/catchError';

function Report() {
  const columns = [
    'No',
    'Nomor Laporan',
    'POP',
    'Tanggal',
    'Shift',
    'Petugas NOC',
    'Petugas Helpdesk',
    'Aksi',
  ];
  const [pop, setPOPLocal] = useState('all');
  const [dataPOP, setdataPOP] = useState([]);
  const [rows, setRows] = useState([]);
  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();
  const [allReport] = useAllReportMutation();
  const dataRow = useSelector(selectAllReport);
  const [allPOP] = useAllPOPMutation();
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const { data: user } = useSelector(selectCurrentUser);
  const stateModal = useSelector(selectModalState);

  const openModal = (modal) => {
    let newState;
    if (modal === 'detail report') {
      newState = { ...stateModal, report: { ...stateModal.report, showDetailModalReport: true } };
    } else if (modal === 'delete report') {
      newState = { ...stateModal, report: { ...stateModal.report, showDeleteModalReport: true } };
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
        let dataFix;
        if (user?.role_id === 2) {
          const dataFilter = data.data.filter((pop) => {
            if (pop.id_pop === user.pop_id) {
              return pop;
            }
          });
          dataFix = dataFilter
        } else {
          dataFix = data.data
        }
        dispatch(setPOP({ data: dataFix }));
        setdataPOP(dataFix);
      } else {
        catchError(data);
      }
    } catch (error) {
      catchError(error);
    }
  };

  const handlePOP = (event) => {
    setPOPLocal(event.target.value);
    const dataChanged = dataRow.data.filter((item) => {
      if (+item.pop_id === +event.target.value) {
        return item;
      }
    })
    if (event.target.value === 'all') {
      setRows(dataRow.data)
      setPagination({
        currentPage: 1,
        currentFilterPage: 100,
        pageNumbers: [1],
        filterPage: [5, 10, 25, 50, 100]
      });
    } else {
      setRows(dataChanged);
      setPagination({
        currentPage: 1,
        currentFilterPage: 100,
        pageNumbers: [1],
        filterPage: [5, 10, 25, 50, 100]
      });
    }
  };

  const onHandleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);

    if (event.target.value.length > 0) {
      const regex = new RegExp(search, 'ig');
      const searchResult = dataRow.data.filter((item) => {
        if (+item.pop.id_pop === +pop) {
          if (item.nomor_laporan.match(regex) || item.noc.match(regex) || item.helpdesk.match(regex) || item.pop.pop.match(regex)) {
            return item;
          }
        }
        if (pop === 'all') {
          if (item.nomor_laporan.match(regex) || item.noc.match(regex) || item.helpdesk.match(regex) || item.pop.pop.match(regex)) {
            return item;
          }
        }
      });
      setRows(searchResult);
      setPagination({
        currentPage: 1,
        currentFilterPage: 100,
        pageNumbers: [1],
        filterPage: [5, 10, 25, 50, 100]
      });
    } else {
      setRows(dataRow.data.filter((item) => {
        if (+item.pop.id_pop === +pop) {
          return item;
        }
        if (pop === 'all') {
          return item;
        }
      }));
      setPagination({
        currentPage: 1,
        currentFilterPage: 100,
        pageNumbers: [1],
        filterPage: [5, 10, 25, 50, 100]
      });
    }
  }

  const doGetAllReport = async () => {
    try {
      const data = await allReport().unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        let dataFix;
        if (user?.role_id === 2) {
          const dataFilter = data.data.filter((item) => {
            if (item.pop_id === user.pop_id) {
              return item;
            }
          });
          dataFix = dataFilter
          dispatch(setReport({ data: dataFix }));
          setRows(dataFix);
          handlePagination(1, dataFix);
          doGetPageNumber(dataFix);
        } else {
          dispatch(setReport({ ...data }));
          setRows(data.data);
          handlePagination(1, data.data);
          doGetPageNumber(data.data);
        }
      } else {
        catchError(data);
      }
    } catch (error) {
      catchError(error);
    }
  }

  useEffect(() => {
    dispatch(updateBreadcrumb([{ path: '/report', title: 'Laporan' }]));
    getAllPOP();
    doGetAllReport();
  }, [])

  const getInfo = ($event) => {
    if ($event.status === 'success') {
      doGetAllReport();
    }
  };

  return (
    <div>
      <div>
        <label
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md w-28"
          htmlFor="my-modal-3"
          onClick={() => {
            navigate(`/report/create`);
          }}
        >
          Tambah
        </label>
      </div>

      <Modal>
        {stateModal?.report?.showDeleteModalReport && <DeleteModal stateModal={stateModal} getInfo={getInfo} detail={detail} title="laporan" />}
        {stateModal?.report?.showDetailModalReport && <ReportDetail stateModal={stateModal} detailData={detail} />}
      </Modal>

      <div className="flex gap-5 mt-5">
        <div className="form-control">
          <label htmlFor="location" className="label font-semibold">
            <span className="label-text"> POP</span>
          </label>

          <select
            className="select w-full max-w-full input-bordered"
            onChange={handlePOP}
          >
            <option value="all" label="Semua">All</option>
            {dataPOP?.map((item, index) => (
              <option key={index} value={item.id_pop} label={item.pop}>{item.pop}</option>
            ))}
          </select>
        </div>

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
                placeholder="Cari data laporan..."
                value={search}
                onChange={onHandleSearch}
              />
            </div>
          </div>
        </div>
      </div>
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
                <th>{index + 1}</th>
                <th>{item?.nomor_laporan}</th>
                <td>
                  { item?.pop?.pop === 'Yogyakarta' ? (
                    <span className="badge badge-success text-white">
                      {item?.pop?.pop}
                    </span>
                  ) : item?.pop?.pop === 'Solo' ? (
                    <span className="badge badge-warning text-white">
                      {item?.pop?.pop}
                    </span>
                  ) : item?.pop?.pop === 'Purwokerto' ? (
                    <span className="badge badge-info text-white">
                      {item?.pop?.pop}
                    </span>
                  ) : (
                    <span className="badge text-white">
                      {item?.pop?.pop}
                    </span>
                  )}
                </td>
                <td className="text-left">{new Date(item.tanggal).toLocaleDateString('id-ID')}</td>
                <td>{item.shift.shift} ({item.shift.mulai} - {item.shift.selesai})</td>
                <td>{item.noc}</td>
                <td>{item.helpdesk}</td>
                <td>
                  <div className="flex flex-row gap-3 justify-center">
                    <div className="tooltip" data-tip="Detail">
                      <HiEye
                        size={20}
                        color="#0D68F1"
                        className="cursor-pointer"
                        onClick={() => {
                          setDetail(item);
                          openModal('detail report')
                        }}
                      />
                    </div>
                    <div className="tooltip" data-tip="Cetak">
                      <HiOutlinePrinter
                        size={20}
                        color="#0D68F1"
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(
                            `${item.lampiran_laporan}`,
                            '_blank'
                          );
                        }}
                      />
                    </div>
                    <div className="tooltip" data-tip="Hapus">
                      <HiTrash
                        size={20}
                        color="#FF2E00"
                        className="cursor-pointer"
                        onClick={() => {
                          setDetail(item);
                          openModal('delete report');
                        }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination serverMode={false} currentFilterPage={pagination.currentFilterPage} perPage={pagination.filterPage} currentPage={pagination.currentPage} countPage={pagination.pageNumbers} onClick={(i) => handlePagination(i.target.id, undefined)} handlePerPage={(x) => handleFilterPagination(x.target.value)} />
      {/* end table */}
    </div>
  )
}
export default Report;
