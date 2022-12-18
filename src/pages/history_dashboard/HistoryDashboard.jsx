import React, { useState, useEffect } from 'react';
import {
  HiSearch,
  HiEye,
  HiOutlineClipboardCheck,
  HiOutlineClipboardList
} from 'react-icons/hi';
import { FaUndoAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAllComplainHistoryMutation } from '../../store/features/complain_history/complainHistoryApiSlice';
import { selectAllComplainHistory, setComplainHistory } from '../../store/features/complain_history/complainHistorySlice';
import ReopenModal from './ReopenModal';
import { useAllPOPMutation } from '../../store/features/pop/popApiSlice';
import { setPOP } from '../../store/features/pop/popSlice';
import Pagination from '../../components/common/table/Pagination';
import SkeletonTable from '../../components/common/table/SkeletonTable';
import { selectCurrentUser } from '../../store/features/auth/authSlice';
import Modal from '../../components/modal/Modal';
import { selectModalState, setModal } from '../../store/features/modal/modalSlice';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import catchError from '../../services/catchError';

function HistoryDashboard() {
  const initColumns = [
    'No',
    'POP',
    'ID Pelanggan',
    'Nama Pelanggan',
    'Kontak',
    'Keluhan',
    'Progress',
    'Waktu',
    'Status',
    'Aksi',
  ];
  const [columns, setColumns] = useState(initColumns);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState([5]);
  const [countPage, setCountPage] = useState([1]);

  const [pop, setPOPLocal] = useState('all');
  const [dataPOP, setdataPOP] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const [allComplainHistory, { isLoading }] = useAllComplainHistoryMutation();
  const [detail, setDetail] = useState(null);
  const stateModal = useSelector(selectModalState);
  const openModal = () => {
    const newState = { ...stateModal, history_dashboard: { ...stateModal.history_dashboard, showRevertModalHistoryComplain: true } };
    dispatch(setModal(newState));
    window.scrollTo(0, 0);
  }
  const { data: user } = useSelector(selectCurrentUser);

  const getAllComplainHistory = async (page = 1) => {
    const param = `?page=${page}`;
    try {
      const data = await allComplainHistory(param).unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        let dataFix;
        if (user?.role_id === 2) {
          const dataFilter = data.data.data.filter((item) => {
            if (item.pop_id === user.pop_id) {
              return item;
            }
          });
          dataFix = dataFilter
          dispatch(setComplainHistory({ data: dataFix }));
          setRows(dataFix);
        } else {
          dispatch(setComplainHistory({ ...data.data }));
          setRows(data.data.data);
          setCurrentPage(data.data.current_page);
          setPerPage([data.data.per_page]);

          const countPaginate = [];
          for (let i = 0; i < data.data.last_page; i++) {
            countPaginate.push(i + 1);
          }
          setCountPage(countPaginate);
        }
      } else {
        catchError(data);
      }
    } catch (err) {
      catchError(err);
    }
  };

  const dataRow = useSelector(selectAllComplainHistory);

  const [allPOP] = useAllPOPMutation();

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

  const onHandleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);

    if (event.target.value.length > 0) {
      const regex = new RegExp(search, 'ig');
      const searchResult = rows.filter((item) => item.id_pelanggan.match(regex) || item.nama_pelanggan.match(regex) || item.nama_pelapor.match(regex) || item.nomor_pelapor.match(regex));
      setRows(searchResult);
    } else {
      setRows(dataRow.data);
    }
  }

  useEffect(() => {
    dispatch(updateBreadcrumb([{ path: '/history_dashboard', title: 'Riwayat Dasbor' }]))
    getAllPOP()
    getAllComplainHistory();
    if (user?.role_id === 0) {
      setColumns([
        'No',
        'POP',
        'ID Pelanggan',
        'Nama Pelanggan',
        'Kontak',
        'Keluhan',
        'Progress',
        'Waktu',
        'Status',
        'Sentimen',
        'Aksi',
      ]);
    }
  }, []);

  const handlePOP = (event) => {
    setPOPLocal(event.target.value);
    const dataChanged = dataRow.data.filter((item) => {
      if (+item.pop_id === +event.target.value) {
        return item;
      }
    })
    if (event.target.value === 'all') {
      setRows(dataRow.data);
    } else {
      setRows(dataChanged);
    }
  };

  const getInfo = ($event) => {
    if ($event.status === 'success') {
      getAllComplainHistory();
    }
  };

  return (
    <div>
      <Modal>
        {stateModal?.history_dashboard?.showRevertModalHistoryComplain && <ReopenModal stateModal={stateModal} getInfo={getInfo} detail={detail} />}
      </Modal>

      {!isLoading && (
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
                placeholder="Cari riwayat data keluhan..."
                value={search}
                onChange={onHandleSearch}
              />
            </div>
          </div>
        </div>
      </div>
      )}

      {isLoading && <SkeletonTable countRows={8} countColumns={10} totalFilter={2} />}

      {/* start table */}
      {!isLoading && (
      <>
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
                  <th>{index + 1}</th>
                  <td className="text-left">
                    {
                            item.pop.pop === 'Yogyakarta' ? (
                              <span className="badge badge-success text-white">
                                {item.pop.pop}
                              </span>
                            ) : item.pop.pop === 'Solo' ? (
                              <span className="badge badge-warning text-white">
                                {item.pop.pop}
                              </span>
                            ) : item.pop.pop === 'Purwokerto' ? (
                              <span className="badge badge-info text-white">
                                {item.pop.pop}
                              </span>
                            ) : (
                              <span className="badge text-white">
                                {item.pop.pop}
                              </span>
                            )
                          }
                  </td>
                  <td>{item.id_pelanggan}</td>
                  <td>{item.nama_pelanggan}</td>
                  <td>
                    {item.nama_pelapor}
                    {' '}
                    -
                    {' '}
                    {item.nomor_pelapor}
                  </td>
                  <td className="text-left">
                  <div dangerouslySetInnerHTML={{__html: item?.keluhan}} />
                  </td>
                  <td className="text-left">
                    {item.balasan.length > 0
                      ? `${item.balasan[
                        item.balasan.length - 1
                      ].balasan.slice(0, 100)}...`
                      : 'Belum ada tindakan'}
                  </td>
                  <td className="text-left">
                    <p>
                      Dibuat:
                      {new Date(item.created_at).toLocaleString('id-ID')}
                    </p>
                    <p>
                      Diubah:
                      {item.balasan.length > 0
                        ? new Date(
                          item.balasan[
                            item.balasan.length - 1
                          ].created_at
                        ).toLocaleString('id-ID')
                        : new Date(item.created_at).toLocaleString(
                          'id-ID'
                        )}
                    </p>
                  </td>
                  <td>
                    <span className="badge badge-info text-white">
                      {item.status}
                    </span>
                  </td>
                  {user?.role_id === 0 && <td>{item?.sentimen_analisis || '-'}</td>}
                  <td>
                    <div className="flex flex-row gap-3 justify-center">
                      <div className="tooltip" data-tip="Kembalikan Status Open">
                        <FaUndoAlt
                          size={20}
                          color="#D98200"
                          className="cursor-pointer"
                          onClick={() => {
                            setDetail(item);
                            openModal();
                          }}
                        />
                      </div>
                      <div className="tooltip" data-tip="Detail">
                        <HiEye
                          size={20}
                          color="#0D68F1"
                          className="cursor-pointer"
                          onClick={() => {
                            navigate(`/history_dashboard/detail/${item.id_keluhan}`);
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
                              navigate(
                                `/history_dashboard/rfo_single/${item.id_keluhan}?id_rfo=${item.rfo_keluhan_id}`
                              );
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!isLoading && (<Pagination perPage={perPage} currentPage={currentPage} countPage={countPage} onClick={(i) => getAllComplainHistory(i.target.id)} serverMode />)}
      </>
      )}
      {/* end table */}
    </div>
  );
}

export default HistoryDashboard;
