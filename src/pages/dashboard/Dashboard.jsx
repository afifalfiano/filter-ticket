import { useState, useEffect } from 'react';
import {
  HiSearch,
  HiPencil,
  HiTrash,
  HiEye,
  HiOutlineClipboardCheck,
  HiOutlineClipboardList,
} from 'react-icons/hi';
import loadable from '@loadable/component'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import { useAllComplainMutation } from '../../store/features/complain/complainApiSlice';
import { selectAllComplain, setComplain } from '../../store/features/complain/complainSlice';
import { useAllPOPMutation } from '../../store/features/pop/popApiSlice';
import { setPOP } from '../../store/features/pop/popSlice';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import { useAllSumberKeluhanMutation } from '../../store/features/sumber_keluhan/sumberKeluhanApiSlice';
import { setSumberKeluhan } from '../../store/features/sumber_keluhan/sumberKeluhanSlice';
import { selectCurrentUser } from '../../store/features/auth/authSlice';
import { selectModalState, setModal } from '../../store/features/modal/modalSlice';
import catchError from '../../services/catchError';
import Button from '../../components/Button/Button';
import Search from '../../components/Search/Search';
import SelectPOP from '../../components/Select/SelectPOP';
import SelectStatusComplain from '../../components/Select/SelectStatusComplain';
import LoaderGetData from '../../components/Loader/Loader';
import LabelStatusPOP from '../../components/LabelStatusPOP/LabelStatusPOP';

const { FaUndoAlt } = loadable(() => import('react-icons/fa'));
const DeleteModal = loadable(() => import('../../components/common/DeleteModal'));
const ComplainModalForm = loadable(() => import('./modal/ComplainModalForm'));
const RFOMasalModal = loadable(() => import('./modal/RFOMasalModal'));
const ReopenModal = loadable(() => import('../history_dashboard/ReopenModal'));
const Modal = loadable(() => import('../../components/modal/Modal'));

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
  const [allComplain] = useAllComplainMutation();
  const dispatch = useDispatch();
  const { data: user } = useSelector(selectCurrentUser);
  const stateModal = useSelector(selectModalState);
  const [search, setSearch] = useState('');
  const [dataPOP, setdataPOP] = useState([]);
  const [pop, setPOPLocal] = useState('all');
  const dataRow = useSelector(selectAllComplain);

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
        } else {
          const dataFilter = data.data.filter((item) => {
            if (item.status === statusData) {
              return item;
            }
          });
          dispatch(setComplain({ ...data }));
          setRows(dataFilter);
        }

        setTimeout(() => {
          setShowLoading(false);
        }, 1500);
      } else {
        setRows([]);
        setTimeout(() => {
          setShowLoading(false);
        }, 1500);
        catchError(data, false);
      }
    } catch (error) {
      setRows([]);
      setTimeout(() => {
        setShowLoading(false);
      }, 1500);
      catchError(error, false);
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
    } else {
      setRows(dataRow.data.filter((item) => {
        if (item.status === statusData && +item.pop.id_pop === +pop) {
          return item;
        }

        if (item.status === statusData && pop === 'all') {
          return item;
        }
      }));
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
    } else {
      setRows(dataChanged);
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
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
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
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
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


  const doCreateNotificationProgress = (data) => {
    if (data.notifikasi.length > 0) {
      let i = 0;
      data.notifikasi.forEach(item => {
        item.notifikasi_read.forEach(read => {
          if (+user.id_user === +read.user_id) {
            if (!read.is_read) {
              i++;
            }
          }
        })
      })

      if (i > 0) {
        return (
          <span className="badge bg-blue-700 border-none text-white">
            + {i}
          </span>
        )
      }
    }
  }

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
  };

  const getInfo = ($event) => {
    if ($event.status === 'success') {
      getAllComplain();
    }
  };


  const addData = () => {
    setDetail(null);
    openModal('add complain');
  }

  const editData = (item) => {
    setDetail(item);
    openModal('update complain');
  }

  const deleteData = (item) => {
    setDetail(item);
    openModal('delete complain');
  }

  const detailData = (item) => {
    navigate(`/dashboard/detail/${item.id_keluhan}`);
  }

  const RFOKeluhan = (item) => {
    navigate(`/dashboard/rfo_single/${item.id_keluhan}?id_rfo=${item.rfo_keluhan_id}`);
  }

  const RFOMasal = (item) => {
    setDetail(item);
    openModal('modal rfo masal');
  }

  const RFOMasalDetail = (item) => {
    setDetail(item);
    navigate(
      `/reason_of_outage/detail_masal/${item.rfo_gangguan_id}`
    );
  }

  const rollbackStatus = (item) => {
    setDetail(item);
    openModal('revert complain');
  }

  return (
    <div>
      {statusData === 'open' && <Button onClick={addData}>Tambah</Button>}

      <div className="gap-5 mt-5 flex flex-col md:flex md:flex-row">
        <div className="form-control w-full md:w-52">
          <SelectStatusComplain handleStatus={handleStatus} />
        </div>

        <div className="form-control w-full md:w-52">
          <SelectPOP dataPOP={dataPOP} handlePOP={handlePOP} />
        </div>

        <Search search={search} onHandleSearch={onHandleSearch} placeholder={'Cari data keluhan...'} />
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
              <tr key={index} className="text-center">
                <th className="bg-opacity-100">{index + 1}</th>
                <td className="text-left">
                  <LabelStatusPOP status={item?.pop?.pop} />
                </td>
                <td className="text-left">{(item?.id_pelanggan)} - {(item?.nama_pelanggan)}</td>
                <td className="text-left">{item?.nama_pelapor} - {item?.nomor_pelapor}</td>
                <td className="text-left">
                  <div dangerouslySetInnerHTML={{ __html: item?.keluhan }} />
                </td>
                <td >
                  <div className="flex gap-2">
                    <div dangerouslySetInnerHTML={{ __html: item?.balasan.length > 0 ? item?.balasan[item.balasan.length - 1].balasan.slice(0, 100) : 'Belum ada tindakan' }} className={`${item?.balasan.length === 0 ? 'text-center font-semibold badge bg-red-500 border-0 text-white' : ''}`} />
                    <div>{user && doCreateNotificationProgress(item)}</div>
                  </div>
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
                    {statusData === 'open' ? (
                      <>
                        <div className="tooltip" data-tip="Edit">
                          <HiPencil
                            className="cursor-pointer"
                            size={20}
                            color="#D98200"
                            onClick={() => editData(item)}
                          />
                        </div>
                        <div className="tooltip" data-tip="Hapus">
                          <HiTrash
                            size={20}
                            color="#FF2E00"
                            className="cursor-pointer"
                            onClick={() => deleteData(item)}
                          />
                        </div>
                        <div className="tooltip" data-tip="Detail">
                          <HiEye
                            size={20}
                            color="#0D68F1"
                            className="cursor-pointer"
                            onClick={() => detailData(item)}
                          />
                        </div>
                        <div className="tooltip" data-tip="RFO Keluhan">
                          <HiOutlineClipboardCheck
                            size={20}
                            color="#065F46"
                            className="cursor-pointer"
                            onClick={() => RFOKeluhan(item)}
                          />
                        </div>
                        <div className="tooltip" data-tip="RFO Gangguan">
                          <HiOutlineClipboardList
                            size={20}
                            color="#0007A3"
                            className="cursor-pointer"
                            onClick={() => RFOMasal(item)}
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
                            onClick={() => rollbackStatus(item)}
                          />
                        </div>
                        <div className="tooltip" data-tip="Detail">
                          <HiEye
                            size={20}
                            color="#0D68F1"
                            className="cursor-pointer"
                            onClick={() => detailData(item)}
                          />
                        </div>
                        {item.rfo_keluhan_id !== null && (
                          <div className="tooltip" data-tip="RFO Keluhan">
                            <HiOutlineClipboardCheck
                              size={20}
                              color="#065F46"
                              className="cursor-pointer"
                              onClick={() => RFOKeluhan(item)}
                            />
                          </div>
                        )}
                        {item.rfo_gangguan_id !== null && (
                          <div className="tooltip" data-tip="RFO Gangguan">
                            <HiOutlineClipboardList
                              size={20}
                              color="#0007A3"
                              className="cursor-pointer"
                              onClick={() => RFOMasalDetail(item)}
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
      {showLoading && <LoaderGetData />}
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
