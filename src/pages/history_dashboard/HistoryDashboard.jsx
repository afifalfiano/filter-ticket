/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAllComplainHistoryMutation } from '../../store/features/complain_history/complainHistoryApiSlice';
import { setComplainHistory } from '../../store/features/complain_history/complainHistorySlice';
import { useAllPOPMutation } from '../../store/features/pop/popApiSlice';
import { setPOP } from '../../store/features/pop/popSlice';
import { selectCurrentUser } from '../../store/features/auth/authSlice';
import { selectModalState, setModal } from '../../store/features/modal/modalSlice';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import catchError from '../../services/catchError';
import { DoShowRFOTrouble, Search, SelectPOP, Modal, Pagination, SkeletonTable, LabelStatusPOP, DoDetail, DoShowRFOComplain, DoRollbackStatus, ProgressTime } from '../../components/index';
// import loadable from '@loadable/component';
import { debounce } from 'lodash';
import ReopenModal from './ReopenModal';

// const ReopenModal = loadable(() => import('./ReopenModal'));

function HistoryDashboard() {
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
  const [columns, setColumns] = useState(initColumns);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState([5]);
  const [countPage, setCountPage] = useState([1]);

  const [pop, setPOPLocal] = useState('');
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

  const getAllComplainHistory = useCallback(debounce(async (pop = '', search = '', page = 1) => {
    const param = `?page=${page}&pop_id=${pop}&keyword=${search}`;
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
        setRows([]);
        catchError(data, true);
      }
    } catch (err) {
      setRows([]);
      catchError(err, true);
    }
  }, 1000), []);

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
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
    }
  };

  const onHandleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    getAllComplainHistory(pop, event.target.value, currentPage);

    // if (event.target.value.length > 0) {
    //   const regex = new RegExp(search, 'ig');
    //   const searchResult = rows.filter((item) => item.id_pelanggan.match(regex) || item.nama_pelanggan.match(regex) || item.nama_pelapor.match(regex) || item.nomor_pelapor.match(regex));
    //   setRows(searchResult);
    // } else {
    //   setRows(dataRow.data);
    // }
  }

  useEffect(() => {
    dispatch(updateBreadcrumb([{ path: '/history_dashboard', title: 'Riwayat Dasbor' }]))
    getAllPOP()
    getAllComplainHistory(pop, search, currentPage);
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
        'Aksi',
      ]);
    }
  }, []);

  const handlePOP = (event) => {
    setPOPLocal(event.target.value);
    getAllComplainHistory(event.target.value, search, currentPage);
    // const dataChanged = dataRow.data.filter((item) => {
    //   if (+item.pop_id === +event.target.value) {
    //     return item;
    //   }
    // })
    // if (event.target.value === 'all') {
    //   setRows(dataRow.data);
    // } else {
    //   setRows(dataChanged);
    // }
  };

  const getInfo = ($event) => {
    if ($event.status === 'success') {
      getAllComplainHistory(pop, search, currentPage);
    }
  };

  const rollbackStatus = (item) => {
    setDetail(item);
    openModal();
  }

  const detailData = (item) => {
    navigate(`/history_dashboard/detail/${item.id_keluhan}`);
  }

  const RFOKeluhan = (item) => {
    navigate(
      `/history_dashboard/rfo_single/${item.id_keluhan}?id_rfo=${item.rfo_keluhan_id}`
    );
  }

  const RFOMasalDetail = (item) => {
    setDetail(item);
    navigate(
      `/history_dashboard/rfo_masal/${item.rfo_gangguan_id}`
    );
  }

  return (
    <div>
      <Modal>
        {stateModal?.history_dashboard?.showRevertModalHistoryComplain && <ReopenModal stateModal={stateModal} getInfo={getInfo} detail={detail} />}
      </Modal>

        <div className="gap-5 mt-5 flex flex-col md:flex md:flex-row">
          <div className="form-control w-full md:w-52">
            <SelectPOP dataPOP={dataPOP} handlePOP={handlePOP} server={true}/>
          </div>
          <Search search={search} onHandleSearch={onHandleSearch} placeholder={'Cari data riwayat keluhan...'} />
        </div>

      {isLoading && <SkeletonTable countRows={8} countColumns={10} totalFilter={2} />}

      {/* start table */}
      {!isLoading && (
        <>
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
                    <th>{index + 1}</th>
                    <td className="text-left">
                      <LabelStatusPOP status={item?.pop?.pop} />
                    </td>
                    <td className="text-left">{(item?.id_pelanggan)} - {(item?.nama_pelanggan)}</td>
                    <td className="text-left">{item?.nama_pelapor} - {item?.nomor_pelapor}</td>
                    <td className="text-left">
                      <div dangerouslySetInnerHTML={{ __html: item?.keluhan }} />
                    </td>
                    <td >
                      <div dangerouslySetInnerHTML={{ __html: item?.balasan.length > 0 ? item?.balasan[item.balasan.length - 1].balasan.slice(0, 100) : 'Belum ada tindakan' }} className={`${item?.balasan.length === 0 ? 'text-center font-semibold badge bg-red-500 border-0 text-white' : ''}`} />
                    </td>
                    <td className="text-left">
                      <ProgressTime item={item} />
                    </td>
                    <td>
                      <span className="badge badge-info text-white">
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex flex-row gap-3 justify-center">
                        <DoRollbackStatus onClick={() => rollbackStatus(item)} />
                        <DoDetail onClick={() => detailData(item)} />
                        {item.rfo_keluhan_id !== null && <DoShowRFOComplain onClick={() => RFOKeluhan(item)} />}
                        {item.rfo_gangguan_id !== null && <DoShowRFOTrouble onClick={() => RFOMasalDetail(item)} />}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!isLoading && (<Pagination perPage={perPage} currentPage={currentPage} countPage={countPage} onClick={(i) => getAllComplainHistory(pop, search, i.target.id)} serverMode />)}
        </>
      )}
      {/* end table */}
    </div>
  );
}

export default HistoryDashboard;
