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
import SkeletonTable from '../../components/common/table/SkeletonTable';

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
  const [allReport, {isLoading}] = useAllReportMutation();
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
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState([5]);
  const [countPage, setCountPage] = useState([1]);

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
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
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
    } else {
      setRows(dataChanged);
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
    } else {
      setRows(dataRow.data.filter((item) => {
        if (+item.pop.id_pop === +pop) {
          return item;
        }
        if (pop === 'all') {
          return item;
        }
      }));
    }
  }

  const doGetAllReport = async (page = 1) => {
    const param = `?page=${page}`;
    try {
      const data = await allReport(param).unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        const result = data.data.data;
        dispatch(setReport({ data: result }));
        setRows(result);
        setCurrentPage(data.data.current_page);
        setPerPage([data.data.per_page]);
      
        const countPaginate = [];
        for (let i = 0; i < data.data.last_page; i++) {
          countPaginate.push(i + 1);
        }
        setCountPage(countPaginate);
      } else {
        setRows([]);
        catchError(data, true);
      }
    } catch (error) {
      setRows([]);
      catchError(error, true);
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
        <button
          type="button"
          className="btn btn-md sm:btn-md md:btn-md lg:btn-md w-32"
          onClick={() => {
            navigate(`/report/create`);
          }}
        >
          Tambah
        </button>
      </div>

      <Modal>
        {stateModal?.report?.showDeleteModalReport && <DeleteModal stateModal={stateModal} getInfo={getInfo} detail={detail} title="laporan" />}
        {stateModal?.report?.showDetailModalReport && <ReportDetail stateModal={stateModal} detailData={detail} />}
      </Modal>

      {!isLoading && (
      <div className="gap-5 mt-5 flex flex-col md:flex md:flex-row">
        <div className="form-control w-full md:w-52">
          <label htmlFor="location" className="label font-semibold">
            <span className="label-text"> POP</span>
          </label>

          <select
            className="select w-full max-w-full input-bordered"
            onChange={handlePOP}
          >
            <option value="all" label="Semua" defaultValue={'all'}>All</option>
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
                className="input input-md input-bordered pl-10 p-2.5 w-full md:w-52 "
                placeholder="Cari data laporan..."
                value={search}
                onChange={onHandleSearch}
              />
            </div>
          </div>
        </div>
      </div>
      )}

      {isLoading && <SkeletonTable countRows={8} countColumns={10} totalFilter={2} />}

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
      )}
      {!isLoading && (<Pagination perPage={perPage} currentPage={currentPage} countPage={countPage} onClick={(i) => doGetAllReport(i.target.id)} serverMode />)}
      {/* end table */}
    </div>
  )
}
export default Report;
