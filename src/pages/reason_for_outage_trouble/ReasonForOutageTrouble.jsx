import { useEffect, useState } from 'react';
import {
  HiSearch,
  HiPencil,
  HiTrash,
  HiEye,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/common/DeleteModal';
import Pagination from '../../components/common/table/Pagination';
import SkeletonTable from '../../components/common/table/SkeletonTable';
import Modal from '../../components/modal/Modal';
import catchError from '../../services/catchError';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import { selectModalState, setModal } from '../../store/features/modal/modalSlice';
import {
  useAllRFOMasalMutation,
} from '../../store/features/rfo/rfoApiSlice';
import {
  selectAllRFOMasal,
  setRFO,
  setRFOMasal,
} from '../../store/features/rfo/rfoSlice';
import RFOModalForm from '../reason_of_outage/RFOModalForm';

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

  const getInfo = ($event) => {
    if ($event.status === 'success') {
      setDetail(null);
      getAllRFOMasal();
    }
  };

  return (
    <div>
      <div>
        <div className="mb-5">
          <button
            type="button"
            className="btn btn-md sm:btn-md md:btn-md lg:btn-md w-auto"
            htmlFor="my-modal-3"
            onClick={() => {
              setDetail(null);
              openModal('add rfo gangguan')
            }}
          >
            Tambah
          </button>
        </div>
      </div>
      {!isLoading && (
        <div className="flex gap-5 flex-col md:flex md:flex-row">
          <div className="form-control">
            <label htmlFor="location" className="label font-semibold">
              <span className="label-text"> Jenis RFO</span>
            </label>

            <select
              className="select w-full max-w-full input-bordered"
              defaultValue={'masal'}
              disabled
            >
              <option disabled>Pilih Status</option>
              <option value="masal" label="RFO Gangguan">
                RFO Gangguan
              </option>
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
                  placeholder="Cari data RFO Gangguan..."
                  value={search}
                  onChange={onHandleSearch}
                />
              </div>
            </div>
          </div>
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
                  <td>
                    <div className="flex flex-row gap-3 justify-center">
                      <div className="tooltip" data-tip="Edit">
                        <HiPencil
                          className="cursor-pointer"
                          size={20}
                          color="#D98200"
                          onClick={() => {
                            setDetail(item);
                            openModal('update rfo gangguan')
                          }}
                        />
                      </div>
                      <div className="tooltip" data-tip="Detail">
                        <HiEye
                          size={20}
                          color="#0D68F1"
                          className="cursor-pointer"
                          onClick={() => {
                            navigate(
                              `/reason_of_outage/detail_masal/${item.id_rfo_gangguan}`
                            );
                          }}
                        />
                      </div>
                      {item.hasOwnProperty('id_rfo_gangguan') && (
                        <div className="tooltip" data-tip="Hapus">
                          <HiTrash
                            size={20}
                            color="#FF2E00"
                            className="cursor-pointer"
                            onClick={() => {
                              setDetail(item);
                              openModal('delete rfo gangguan');
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
      )}

      {!isLoading && (<Pagination perPage={perPage} currentPage={currentPage} countPage={countPage} onClick={(i) => getAllRFOMasal(i.target.id)} serverMode />)}
      {/* end table */}
    </div>
  );
}

export default ReasonForOutageTrouble;