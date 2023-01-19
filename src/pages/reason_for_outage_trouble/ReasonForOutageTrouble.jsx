import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, CategoryRFO, DoDelete, DoDetail, DoUpdate, LabelStatus, Search, DeleteModal, Pagination, SkeletonTable, Modal } from '../../components';
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


const columns = [
  'No',
  'Topik',
  'Waktu Gangguan',
  'Durasi',
  'Masalah',
  'Keterangan',
  'Status RFO',
  'Aksi',
];


function ReasonForOutageTrouble() {
  const navigate = useNavigate();
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

  const getAllRFOMasal = async (page = 1) => {
    const param = `?page=${page}`;
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
  };



  useEffect(() => {
    dispatch(
      updateBreadcrumb([
        { path: '/reason_of_outage_gangguan', title: 'Reason For Outage Gangguan' },
      ])
    );
    getAllRFOMasal();
  }, []);

  const onHandleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);

    if (event.target.value.length > 0) {
      const regex = new RegExp(search, 'ig');
      const searchResult = allData.filter((item) => {
        if (item.problem.match(regex)) {
          return item;
        }
      });
      setRows(searchResult);
    } else {
      const searchResult = allData.filter((item) => {
        return item;
      });
      setRows(searchResult);
    }
  }

  const getInfo = ($event) => {
    if ($event.status === 'success') {
      setDetail(null);
      getAllRFOMasal();
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

  return (
    <div>
      <div>
        <div className="mb-5">
          <Button type="button" onClick={() => addData()}>Tambah</Button>
        </div>
      </div>
      {!isLoading && (
        <div className="flex gap-5 flex-col md:flex md:flex-row">
          <div className="form-control w-full md:w-52">
            <CategoryRFO defaultValue={'masal'} data={<option value="masal" label="RFO Gangguan">RFO Gangguan</option>} />
          </div>

          <Search search={search} onHandleSearch={onHandleSearch} placeholder={'Cari data RFO gangguan...'} />
        </div>
      )}

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
                {columns.map((item, index) => (
                  <th key={index} className="text-center">{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((item, index) => (
                <tr className="text-center" key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <p>Gangguan Masal</p>
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

      {!isLoading && (<Pagination perPage={perPage} currentPage={currentPage} countPage={countPage} onClick={(i) => getAllRFOMasal(i.target.id)} serverMode />)}
      {/* end table */}
    </div>
  );
}

export default ReasonForOutageTrouble;