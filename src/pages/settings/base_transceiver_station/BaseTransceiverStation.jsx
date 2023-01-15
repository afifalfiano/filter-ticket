import {
  HiSearch,
  HiTrash,
  HiEye,
  HiPencil,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectAllBTS, setBTS } from '../../../store/features/bts/btsSlice';
import { useAllBtsMutation } from '../../../store/features/bts/btsApiSlice';
import FormBTS from './FormBTS';
import DeleteModal from '../../../components/common/DeleteModal';
import { useAllPOPMutation } from '../../../store/features/pop/popApiSlice';
import { setPOP } from '../../../store/features/pop/popSlice';
import { updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';

import SkeletonTable from '../../../components/common/table/SkeletonTable';
import Pagination from '../../../components/common/table/Pagination';
import { selectModalState, setModal } from '../../../store/features/modal/modalSlice';
import Modal from '../../../components/modal/Modal';
import catchError from '../../../services/catchError';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';

function BaseTransceiverStation() {
  const columns = [
    'No',
    'POP',
    'Nama',
    'Penanggung Jawab',
    'No Penanggung Jawab',
    'Lokasi',
    'Koordinat',
    'Aksi',
  ];

  const [rows, setRows] = useState([]);
  const [dataPOP, setdataPOP] = useState([]);
  const [pop, setPOPLocal] = useState('all');
  const [allBts, { isLoading }] = useAllBtsMutation();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState(null);
  const [search, setSearch] = useState('');
  const {data: user} = useSelector(selectCurrentUser);

  const [title, setTitle] = useState('update');

  const dataRow = useSelector(selectAllBTS);
  const stateModal = useSelector(selectModalState);
  const openModal = (modal) => {
    let newState;
    if (modal === 'add bts') {
      newState = { ...stateModal, bts: { ...stateModal.bts, showAddModalBts: true } };
    } else if (modal === 'update bts') {
      newState = { ...stateModal, bts: { ...stateModal.bts, showUpdateModalBts: true } };
    } else if (modal === 'delete bts') {
      newState = { ...stateModal, bts: { ...stateModal.bts, showDeleteModalBts: true } };
    } else if (modal === 'detail bts') {
      newState = { ...stateModal, bts: { ...stateModal.bts, showDetailModalBts: true } };
    }
    dispatch(setModal(newState));
    window.scrollTo(0, 0);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState([5]);
  const [countPage, setCountPage] = useState([1]);

  const onHandleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);

    if (event.target.value.length > 0) {
      const regex = new RegExp(search, 'ig');
      const searchResult = dataRow.data.filter((item) => {
        if (+item.pop.id_pop === +pop) {
          if (item.nama_bts.match(regex) || item.nama_pic.match(regex)) {
            return item;
          }
        }
        if (pop === 'all') {
          if (item.nama_bts.match(regex) || item.nama_pic.match(regex)) {
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

  const [allPOP] = useAllPOPMutation();

  const getAllPOP = async () => {
    try {
      const data = await allPOP().unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        dispatch(setPOP({ ...data }));
        setdataPOP(data.data)
      } else {
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
    }
  };

  const getAllBTS = async (page = 1) => {
    const param = `?page=${page}`;
    try {
      const data = await allBts(param).unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        const result = data.data.data;
        dispatch(setBTS({ data: result }));
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
    dispatch(updateBreadcrumb([{ path: '/base_transceiver_station', title: 'Base Transceiver Station' }]))
    getAllPOP()
    getAllBTS();
  }, []);

  const getInfo = ($event) => {
    if ($event.status === 'success') {
      getAllBTS();
    }
  };

  return (
    <div>
      {user?.role_id === 0 && (
      <div>
        <button
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md w-28"
          onClick={() => {
            setDetail(null);
            setTitle('create');
            openModal('add bts');
          }}
        >
          Tambah
        </button>
      </div>
      )}

      {!isLoading && (
      <div className="flex gap-5 mt-5">
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
                placeholder="Cari data BTS..."
                value={search}
                onChange={onHandleSearch}
              />
            </div>
          </div>
        </div>
        <div className="form-control">
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
      </div>
      )}

      <Modal>
        {stateModal?.bts?.showAddModalBts && <FormBTS stateModal={stateModal} getInfo={getInfo} detail={detail} titleAction={title} /> }
        {stateModal?.bts?.showUpdateModalBts && <FormBTS stateModal={stateModal} getInfo={getInfo} detail={detail} titleAction={title} /> }
        {stateModal?.bts?.showDeleteModalBts && <DeleteModal stateModal={stateModal} getInfo={getInfo} detail={detail} title="BTS" />}
        {stateModal?.bts?.showDetailModalBts && <FormBTS stateModal={stateModal} getInfo={getInfo} detail={detail} titleAction={title} /> }
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
            { rows.map((item, index) => (
              <tr className="text-center" id={item.id} key={index}>
                <td id={item.id}>{index + 1}</td>
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
                <td>{item.nama_bts}</td>
                <td>{item.nama_pic}</td>
                <td>{item.nomor_pic}</td>
                <td>{item.lokasi}</td>
                <td>{item.kordinat}</td>
                <td>
                {user?.role_id === 0 ? (
                <div className="flex flex-row gap-3 justify-center">
                  <div className="tooltip" data-tip="Edit">
                    <HiPencil
                      className="cursor-pointer"
                      size={20}
                      color="#D98200"
                      onClick={() => {
                        setDetail(item);
                        setTitle('update');
                        openModal('update bts');
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
                        openModal('delete bts');
                      }}
                    />
                  </div>
                  <div className="tooltip" data-tip="Detail">
                    <HiEye
                      size={20}
                      color="#0D68F1"
                      className="cursor-pointer"
                      onClick={() => {
                        setDetail(item);
                        setTitle('read');
                        openModal('detail bts');
                      }}
                    />
                  </div>
                </div>
                ) : (
                  <div className="tooltip" data-tip="Detail">
                  <HiEye
                    size={20}
                    color="#0D68F1"
                    className="cursor-pointer"
                    onClick={() => {
                      setDetail(item);
                      setTitle('read');
                      openModal('detail bts');
                    }}
                  />
                </div>
                )}
              </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
      {!isLoading && (<Pagination perPage={perPage} currentPage={currentPage} countPage={countPage} onClick={(i) => getAllBTS(i.target.id)} serverMode />)}
      {/* end table */}
    </div>
  );
}
export default BaseTransceiverStation;
