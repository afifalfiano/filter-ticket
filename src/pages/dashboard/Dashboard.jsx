import { useState, useEffect } from 'react';
import {
  HiSearch,
  HiPencil,
  HiTrash,
  HiEye,
  HiOutlineClipboardCheck,
  HiOutlineClipboardList,
} from 'react-icons/hi';
import { FaUndoAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import { useAllComplainMutation } from '../../store/features/complain/complainApiSlice';
import { selectAllComplain, setComplain } from '../../store/features/complain/complainSlice';
import DeleteModal from '../../components/common/DeleteModal';
import ComplainModalForm from './modal/ComplainModalForm';
import RFOMasalModal from './modal/RFOMasalModal';
import { useAllPOPMutation } from '../../store/features/pop/popApiSlice';
import { setPOP } from '../../store/features/pop/popSlice';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import { useAllSumberKeluhanMutation } from '../../store/features/sumber_keluhan/sumberKeluhanApiSlice';
import { setSumberKeluhan } from '../../store/features/sumber_keluhan/sumberKeluhanSlice';
import ReopenModal from '../history_dashboard/ReopenModal';
import Pagination from '../../components/common/table/Pagination';
import { selectCurrentUser } from '../../store/features/auth/authSlice';
import Modal from '../../components/modal/Modal';
import { selectModalState, setModal } from '../../store/features/modal/modalSlice';
import catchError from '../../services/catchError';

const initColumns = [
  'No',
  'POP',
  'Pelanggan',
  'Kontak',
  'Keluhan',
  'Progress',
  'Waktu',
  'Status',
  'Aksi',
];

const Dashboard = () => {
  const [columns, setColumns] = useState(initColumns);
  const [statusData, setStatusData] = useState('open');
  const [detail, setDetail] = useState(null);
  const [showLoading, setShowLoading] = useState(true);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [allComplain ] = useAllComplainMutation();
  const dispatch = useDispatch();
  const { data: user } = useSelector(selectCurrentUser);
  const stateModal = useSelector(selectModalState);
  const [search, setSearch] = useState('');
  const [dataPOP, setdataPOP] = useState([]);
  const [pop, setPOPLocal] = useState('all');
  const dataRow = useSelector(selectAllComplain);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    currentFilterPage: 10,
    pageNumbers: [1],
    filterPage: [5, 10, 25, 50, 100]
  });

  const openModal = (modal) => {
    let newState;
    if (modal === 'add complain') {
      newState = { ...stateModal, dashboard: { ...stateModal.dashboard, showAddModalComplain: true } };
    } else if (modal === 'update complain') {
      newState = { ...stateModal, dashboard: { ...stateModal.dashboard, showUpdateModalComplain: true } };
    } else if (modal === 'modal rfo masal') {
      newState = { ...stateModal, dashboard: { ...stateModal.dashboard, showRFOTroubleModal: true } };
    } else if (modal === 'delete complain') {
      newState = { ...stateModal, dashboard: { ...stateModal.dashboard, showDeleteModalComplain: true } };
    } else if (modal === 'revert complain') {
      newState = { ...stateModal, dashboard: { ...stateModal.dashboard, showRevertModalComplain: true } };
    }
    dispatch(setModal(newState));
    window.scrollTo(0, 0);
  }

  const handlePagination = (targetPage = 1, data) => {
    setPagination({ ...pagination, currentPage: targetPage, currentFilterPage: pagination.currentFilterPage })
    const indexOfLastPost = targetPage * pagination.currentFilterPage;
    const indexOfFirstPost = indexOfLastPost - pagination.currentFilterPage;
    let currentPosts;
    let filterPage;
    if (data === undefined) {
      currentPosts = dataRow?.data.slice(indexOfFirstPost, indexOfLastPost);
      filterPage = currentPosts.filter((item) => item.status === statusData);
    } else {
      currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
      filterPage = currentPosts.filter((item) => item.status === statusData);
    }
    setRows(filterPage);
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
    const filterPage = currentPosts.filter((item) => item.status === statusData); 
    setRows(filterPage);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataRow.data.length / selectFilter); i++) {
      pageNumbers.push(i);
    }
    setPagination({ ...pagination, pageNumbers, currentFilterPage: selectFilter });
  }

  const getAllComplain = async () => {
    setShowLoading(true);
    try {
      const data = await allComplain().unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        let dataFix;
        if (user?.role_id === 2) {
          const dataFilter = data.data.filter((item) => {
            if (item.pop_id === user.pop_id && item.status === statusData) {
              return item;
            }
          });
          dataFix = dataFilter
          dispatch(setComplain({ data: dataFix }));
          setRows(dataFix);
          handlePagination(1, dataFix);
          doGetPageNumber(dataFix);
        } else {
          const dataFilter = data.data.filter((item) => {
            if (item.status === statusData) {
              return item;
            }
          });
          dispatch(setComplain({ ...data }));
          setRows(dataFilter);
          handlePagination(1, data.data);
          doGetPageNumber(data.data);
        }

        setTimeout(() => {
          setShowLoading(false);
        }, 1500);
      } else {
        catchError(data);
      }
    } catch (error) {
      catchError(error);
    }
  };

  const onHandleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);

    if (event.target.value.length > 0) {
      const regex = new RegExp(search, 'ig');
      const searchResult = dataRow.data.filter((item) => {
        if (item.status === statusData && +item.pop.id_pop === +pop) {
          if (item.id_pelanggan.match(regex) || item.nama_pelanggan.match(regex) || item.nama_pelapor.match(regex) || item.nomor_pelapor.match(regex)) {
            return item;
          }
        }
        if (item.status === statusData && pop === 'all') {
          if (item.id_pelanggan.match(regex) || item.nama_pelanggan.match(regex) || item.nama_pelapor.match(regex) || item.nomor_pelapor.match(regex)) {
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
        if (item.status === statusData && +item.pop.id_pop === +pop) {
          return item;
        }

        if (item.status === statusData && pop === 'all') {
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

  const handlePOP = (event) => {
    setPOPLocal(event.target.value);
    const dataChanged = dataRow.data.filter((item) => {
      if (+item.pop_id === +event.target.value && item.status === statusData) {
        return item;
      }
    })
    if (event.target.value === 'all') {
      setRows(dataRow.data.filter((item) => item.status === statusData));
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

  const [allPOP] = useAllPOPMutation();

  const [allSumberKeluhan] = useAllSumberKeluhanMutation();

  const getAllSumberKeluhan = async () => {
    try {
      const data = await allSumberKeluhan().unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        dispatch(setSumberKeluhan({ ...data }));
      } else {
        catchError(data);
      }
    } catch (error) {
      catchError(error);
    }
  };

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

  useEffect(() => {
    dispatch(updateBreadcrumb([{ path: '/dashboard', title: 'Dasbor' }]))
    getAllPOP()
    getAllSumberKeluhan();
    getAllComplain();

    if (user?.role_id === 0) {
      setColumns([
        'No',
        'POP',
        'Pelanggan',
        'Kontak',
        'Keluhan',
        'Progress',
        'Waktu',
        'Status',
        'Sentimen',
        'Aksi',
      ]);
    }
    const intervalId = setInterval(() => {
      getAllComplain();
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleStatus = (event) => {
    setStatusData(event.target.value);
    const dataChanged = dataRow.data.filter((item) => {
      if (item.status === event.target.value && +item.pop.id_pop === +pop) {
        return item;
      }
      if (item.status === event.target.value && pop === 'all') {
        return item;
      }
    })
    setRows(dataChanged);
    setPagination({
      currentPage: 1,
      currentFilterPage: 100,
      pageNumbers: [1],
      filterPage: [5, 10, 25, 50, 100]
    });
  };

  const getInfo = ($event) => {
    if ($event.status === 'success') {
      getAllComplain();
    }
  };

  return (
    <div>
      {statusData === 'open' && (
      <div>
        <button
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md w-28"
          htmlFor="my-modal-complain"
          onClick={() => {
            setDetail(null);
            openModal('add complain');
          }}
        >
          Tambah
        </button>
      </div>
      )}

      <div className="flex gap-5 mt-5">
        <div className="form-control">
          <label htmlFor="location" className="label font-semibold">
            <span className="label-text"> Status Keluhan</span>
          </label>

          <select
            className="select w-full max-w-full input-bordered"
            onChange={handleStatus}
          >
            <option value="open" label="Open Case">Open Case</option>
            <option value="closed" label="Closed Case">Closed Case</option>
          </select>
        </div>

        <div className="form-control w-40">
          <label htmlFor="location" className="label font-semibold">
            <span className="label-text"> POP</span>
          </label>

          <select
            className="select w-full max-w-full input-bordered"
            onChange={handlePOP}
          >
            <option value="all" label="Semua">All</option>
            {dataPOP?.map((item) => (
              <option value={item.id_pop} label={item.pop}>{item.pop}</option>
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
                placeholder="Cari data keluhan..."
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
              {columns.map((item) => (
                <th className="text-center">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((item, index) => (
              <tr className="text-center">
                <th className="bg-opacity-100">{index + 1}</th>
                <td className="text-left">
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
                <td className="text-left">{(item?.id_pelanggan)} - {(item?.nama_pelanggan)}</td>
                <td className="text-left">{item?.nama_pelapor} - {item?.nomor_pelapor}</td>
                <td className="text-left">
                  <div dangerouslySetInnerHTML={{__html: item?.keluhan}} />
                </td>
                <td className="text-left">
                  <div dangerouslySetInnerHTML={{__html: item?.balasan.length > 0 ? item?.balasan[item.balasan.length - 1].balasan.slice(0, 100) : 'Belum ada tindakan'}} />
                </td>
                {/* <td className="text-left">{(item?.balasan.length > 0 ? item?.balasan[item.balasan.length - 1].balasan.slice(0, 100) + '...' : 'Belum ada tindakan')}</td> */}
                <td className="text-left">
                  <p>
                    Dibuat:
                    {new Date(item?.created_at).toLocaleString('id-ID')}
                  </p>
                  <p>
                    Diubah:
                    {item?.balasan.length > 0
                      ? new Date(item?.balasan[item.balasan.length - 1].created_at).toLocaleString('id-ID')
                      : new Date(item?.created_at).toLocaleString('id-ID')}
                  </p>
                </td>
                <td>
                  {item?.status === 'open' ? (
                    <span className="badge badge-accent text-white">
                      {item?.status}
                    </span>
                  ) : (
                    <span className="badge badge-info text-white">
                      {item?.status}
                    </span>
                  )}
                </td>
                {user?.role_id === 0 && <td>{item?.sentimen_analisis || '-'}</td>}
                <td>
                  <div className="flex flex-row gap-3 justify-center">
                    { statusData === 'open' ? (
                      <>
                        <div className="tooltip" data-tip="Edit">
                          <HiPencil
                            className="cursor-pointer"
                            size={20}
                            color="#D98200"
                            onClick={() => {
                              setDetail(item);
                              openModal('update complain');
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
                              openModal('delete complain');
                            }}
                          />
                        </div>
                        <div className="tooltip" data-tip="Detail">
                          <HiEye
                            size={20}
                            color="#0D68F1"
                            className="cursor-pointer"
                            onClick={() => {
                              navigate(`/dashboard/detail/${item.id_keluhan}`);
                            }}
                          />
                        </div>
                        <div className="tooltip" data-tip="RFO Keluhan">
                          <HiOutlineClipboardCheck
                            size={20}
                            color="#065F46"
                            className="cursor-pointer"
                            onClick={() => {
                              navigate(`/dashboard/rfo_single/${item.id_keluhan}?id_rfo=${item.rfo_keluhan_id}`);
                            }}
                          />
                        </div>
                        <div className="tooltip" data-tip="RFO Gangguan">
                          <HiOutlineClipboardList
                            size={20}
                            color="#0007A3"
                            className="cursor-pointer"
                            onClick={() => {
                              setDetail(item);
                              openModal('modal rfo masal');
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="tooltip" data-tip="Kembalikan Status Open">
                          <FaUndoAlt
                            size={20}
                            color="#D98200"
                            className="cursor-pointer"
                            onClick={() => {
                              setDetail(item);
                              openModal('revert complain');
                            }}
                          />
                        </div>
                        <div className="tooltip" data-tip="Detail">
                          <HiEye
                            size={20}
                            color="#0D68F1"
                            className="cursor-pointer"
                            onClick={() => {
                              navigate(`/dashboard/detail/${item.id_keluhan}`);
                            }}
                          />
                        </div>
                        {item.rfo_keluhan_id !== null && (
                          <div className="tooltip" data-tip="RFO Keluhan">
                            <HiOutlineClipboardCheck
                              size={20}
                              color="#065F46"
                              className="cursor-pointer"
                              onClick={() => {
                                navigate(`/dashboard/rfo_single/${item.id_keluhan}?id_rfo=${item.rfo_keluhan_id}`);
                              }}
                            />
                          </div>
                        )}
                        {item.rfo_gangguan_id !== null && (
                          <div className="tooltip" data-tip="RFO Gangguan">
                            <HiOutlineClipboardList
                              size={20}
                              color="#0007A3"
                              className="cursor-pointer"
                              onClick={() => {
                                setDetail(item);
                                navigate(
                                  `/reason_of_outage/detail_masal/${item.rfo_gangguan_id}`
                                );
                              }}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination serverMode={false} currentFilterPage={pagination.currentFilterPage} perPage={pagination.filterPage} currentPage={pagination.currentPage} countPage={pagination.pageNumbers} onClick={(i) => handlePagination(i.target.id, undefined)} handlePerPage={(x) => handleFilterPagination(x.target.value)} />
      {showLoading && (
      <div className="fixed bottom-5 right-5 w-52 min-w-min bg-slate-500 rounded-md shadow-md drop-shadow-md">
        <div className="flex flex-row justify-between items-center p-4">
          <ClipLoader
            color="#1ffff0"
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <p className="font-semibold text-white">Data Diperbarui</p>
        </div>
      </div>
      )}
      <Modal>
        {stateModal?.dashboard?.showAddModalComplain && <ComplainModalForm stateModal={stateModal} detail={detail} getInfo={getInfo} />}
        {stateModal?.dashboard?.showRFOTroubleModal && <RFOMasalModal stateModal={stateModal} detail={detail} getInfo={getInfo} />}
        {stateModal?.dashboard?.showDeleteModalComplain && <DeleteModal stateModal={stateModal} detail={detail} getInfo={getInfo} title="keluhan" />}
        {stateModal?.dashboard?.showUpdateModalComplain && <ComplainModalForm stateModal={stateModal} detail={detail} getInfo={getInfo} />}
        {stateModal?.dashboard?.showRevertModalComplain && <ReopenModal stateModal={stateModal} detail={detail} getInfo={getInfo} />}
      </Modal>
    </div>
  );
}

export default Dashboard;
