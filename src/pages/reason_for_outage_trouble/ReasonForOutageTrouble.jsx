/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, CategoryRFO, DoDelete, DoDetail, DoUpdate, LabelStatus, Search, DeleteModal, Pagination, SkeletonTable, Modal, SelectStatusComplain } from '../../components';
import catchError from '../../services/catchError';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import { selectModalState, setModal } from '../../store/features/modal/modalSlice';
import {
  useAllRFOMasalMutation,
} from '../../store/features/rfo/rfoApiSlice';
import {
  selectAllRFOMasal,
  setRFOMasal,
} from '../../store/features/rfo/rfoSlice';
import RFOModalForm from '../reason_of_outage/RFOModalForm';
import debounce from 'lodash.debounce';


const columns = [
  'No',
  'Nomor RFO Gangguan',
  'Waktu Gangguan',
  'Durasi',
  'Masalah',
  'Keterangan',
  'Status RFO',
  'Aksi',
];


function ReasonForOutageTrouble() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const [allRFOMasal, { isLoading }] = useAllRFOMasalMutation();
  const stateModal = useSelector(selectModalState);
  const allData = useSelector(selectAllRFOMasal);
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState([5]);
  const [countPage, setCountPage] = useState([1]);

  const openModal = (modal) => {
    let newState;
    if (modal === 'add rfo gangguan') {
      newState = { ...stateModal, rfo: { ...stateModal.rfo, showAddModalRFOTrouble: true } };
    } else if (modal === 'update rfo gangguan') {
      newState = { ...stateModal, rfo: { ...stateModal.rfo, showUpdateModalRFOTrouble: true } };
    } else if (modal === 'delete rfo gangguan') {
      newState = { ...stateModal, rfo: { ...stateModal.rfo, showDeleteModalRFOTrouble: true } };
    }
    dispatch(setModal(newState));
    window.scrollTo(0, 0);
  }

  const getAllRFOMasal = useCallback(debounce(async (status = '', keyword = '', page = 1) => {
    const param = `?page=${page}&keyword=${keyword}&status=${status}`;
    try {
      const data = await allRFOMasal(param).unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        const result = data.data.data;
        dispatch(setRFOMasal({ data: result }));
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
    } catch (err) {
      setRows([]);
      catchError(err, true);
    }
  }, 1000), []);



  useEffect(() => {
    dispatch(
      updateBreadcrumb([
        { path: '/reason_of_outage_gangguan', title: 'Reason For Outage Gangguan' },
      ])
    );
    getAllRFOMasal(status, search, currentPage);
  }, []);

  const onHandleSearch = (event) => {
    if (event.target.value.length > 0) {
      setSearch(event.target.value);
    } else {
      setSearch('');
      event.target.value = '';
    }
    getAllRFOMasal(status, event.target.value, currentPage);
  }

  const getInfo = ($event) => {
    if ($event.status === 'success') {
      setDetail(null);
      getAllRFOMasal(status, search, currentPage);
    }
  };

  const addData = () => {
    setDetail(null);
    openModal('add rfo gangguan')
  }

  const updaeData = (item) => {
    setDetail(item);
    openModal('update rfo gangguan')
  }

  const detailData = (item) => {
    navigate(
      `/reason_of_outage/detail_masal/${item.id_rfo_gangguan}`
    );
  }

  const deleteData = (item) => {
    setDetail(item);
    openModal('delete rfo gangguan');
  }

  const handleStatus = (event) => {
    setStatus(event.target.value);
    getAllRFOMasal(event.target.value, search, currentPage);
  }

  return (
    <div>
      <div>
        <div className="mb-5">
          <Button type="button" onClick={() => addData()}>Tambah</Button>
        </div>
      </div>

        <div className="flex gap-5 flex-col md:flex md:flex-row">
          <div className="form-control w-full md:w-52">
            <SelectStatusComplain handleStatus={handleStatus} all={true} />
          </div>
          <div className="tooltip tooltip-right" data-tip="Cari berdasarkan nomor_rfo_keluhan, nomor_tiket, problem">
          <Search search={search} onHandleSearch={onHandleSearch} placeholder={'Cari berdasarkan nomor_rfo_keluhan, nomor_tiket, problem'} />
          </div>
        </div>

      <Modal>
        {stateModal?.rfo?.showAddModalRFOTrouble && <RFOModalForm stateModal={stateModal} detail={detail} getInfo={getInfo} />}
        {stateModal?.rfo?.showUpdateModalRFOTrouble && <RFOModalForm stateModal={stateModal} detail={detail} getInfo={getInfo} />}
        {stateModal?.rfo?.showDeleteModalRFOTrouble && <DeleteModal stateModal={stateModal} getInfo={getInfo} detail={detail} title="RFO Gangguan" />}
      </Modal>

      {isLoading && <SkeletonTable countRows={8} countColumns={10} totalFilter={2} />}

      {/* start table */}
      {!isLoading && (
        <div className="overflow-x-auto mt-8">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                {columns?.map((item, index) => (
                  <th key={index} className="text-center">{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows?.map((item, index) => (
                <tr className="text-center" key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <p>{item?.nomor_rfo_gangguan || '-'}</p>
                  </td>
                  <td className="text-left">
                    <p>
                      Dibuat:
                      {new Date(item?.mulai_gangguan).toLocaleString()}
                    </p>
                    <p>
                      Diubah:
                      {new Date(item?.selesai_gangguan).toLocaleString()}
                    </p>
                  </td>
                  <td>{item?.durasi || 0}</td>
                  <td>{item?.problem}</td>
                  <td>{item?.deskripsi || '-'}</td>
                  <td>
                    <LabelStatus status={item?.status} />
                  </td>
                  <td>
                    <div className="flex flex-row gap-3 justify-center">
                      <DoUpdate onClick={() => updaeData(item)} />
                      <DoDetail onClick={() => detailData(item)} />
                      <DoDelete onClick={() => deleteData(item)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isLoading && (<Pagination perPage={perPage} currentPage={currentPage} countPage={countPage} onClick={(i) => getAllRFOMasal(status, search, i.target.id)} serverMode />)}
      {/* end table */}
    </div>
  );
}

export default ReasonForOutageTrouble;