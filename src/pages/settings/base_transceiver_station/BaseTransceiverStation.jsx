/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectAllBTS, setBTS } from '../../../store/features/bts/btsSlice';
import { useAllBtsMutation } from '../../../store/features/bts/btsApiSlice';
import FormBTS from './FormBTS';
import { useAllPOPMutation } from '../../../store/features/pop/popApiSlice';
import { setPOP } from '../../../store/features/pop/popSlice';
import { updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';

import { selectModalState, setModal } from '../../../store/features/modal/modalSlice';
import catchError from '../../../services/catchError';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import { DoDelete, SelectPOP, DoDetail, DoUpdate, SkeletonTable, Modal, DeleteModal, Pagination, LabelStatusPOP, Search, Button } from '../../../components';
import { debounce } from 'lodash';
import { useCallback } from 'react';

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

function BaseTransceiverStation() {

  const [rows, setRows] = useState([]);
  const [dataPOP, setdataPOP] = useState([]);
  const [pop, setPOPLocal] = useState('');
  const [allBts, { isLoading }] = useAllBtsMutation();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState(null);
  const [search, setSearch] = useState('');
  const { data: user } = useSelector(selectCurrentUser);

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
    getAllBTS(pop, event.target.value, currentPage);

    // if (event.target.value.length > 0) {
    //   const regex = new RegExp(search, 'ig');
    //   const searchResult = dataRow.data.filter((item) => {
    //     if (+item.pop.id_pop === +pop) {
    //       if (item.nama_bts.match(regex) || item.nama_pic.match(regex)) {
    //         return item;
    //       }
    //     }
    //     if (pop === 'all') {
    //       if (item.nama_bts.match(regex) || item.nama_pic.match(regex)) {
    //         return item;
    //       }
    //     }
    //   });
    //   setRows(searchResult);
    // } else {
    //   setRows(dataRow.data.filter((item) => {
    //     if (+item.pop.id_pop === +pop) {
    //       return item;
    //     }
    //     if (pop === 'all') {
    //       return item;
    //     }
    //   }));
    // }
  }

  const handlePOP = (event) => {
    setPOPLocal(event.target.value);
    getAllBTS(event.target.value, search, currentPage);
    // const dataChanged = dataRow.data.filter((item) => {
    //   if (+item.pop_id === +event.target.value) {
    //     return item;
    //   }
    // })
    // if (event.target.value === 'all') {
    //   setRows(dataRow.data)
    // } else {
    //   setRows(dataChanged);
    // }
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

  const getAllBTS = useCallback(debounce(async (pop = '', search = '', page = 1) => {
    const param = `?page=${page}&pop_id=${pop}&keyword=${search}`;

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
  }, 1000), []);

  useEffect(() => {
    dispatch(updateBreadcrumb([{ path: '/base_transceiver_station', title: 'Base Transceiver Station' }]))
    getAllPOP()
    getAllBTS(pop, search, currentPage);
  }, []);

  const getInfo = ($event) => {
    if ($event.status === 'success') {
      getAllBTS(pop, search, currentPage);
    }
  };


  const addData = () => {
    setDetail(null);
    setTitle('create');
    openModal('add bts');
  }

  const updateData = (item) => {
    setDetail(item);
    setTitle('update');
    openModal('update bts');
  }

  const deleteData = (item) => {
    setDetail(item);
    openModal('delete bts');
  }

  const detailData = (item) => {
    setDetail(item);
    setTitle('read');
    openModal('detail bts');
  }

  return (
    <div>
      {user?.role_id === 0 && (
        <div>
          <Button type="button" onClick={() => addData()} >Tambah</Button>
        </div>
      )}

        <div className="gap-5 mt-5 flex flex-col md:flex md:flex-row">
          <div className="form-control w-full md:w-52">
            <SelectPOP dataPOP={dataPOP} handlePOP={handlePOP} server={true} />
          </div>
          <Search search={search} onHandleSearch={onHandleSearch} placeholder={'Cari data BTS...'} />
        </div>

      <Modal>
        {stateModal?.bts?.showAddModalBts && <FormBTS stateModal={stateModal} getInfo={getInfo} detail={detail} titleAction={title} />}
        {stateModal?.bts?.showUpdateModalBts && <FormBTS stateModal={stateModal} getInfo={getInfo} detail={detail} titleAction={title} />}
        {stateModal?.bts?.showDeleteModalBts && <DeleteModal stateModal={stateModal} getInfo={getInfo} detail={detail} title="BTS" />}
        {stateModal?.bts?.showDetailModalBts && <FormBTS stateModal={stateModal} getInfo={getInfo} detail={detail} titleAction={title} />}
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
                <tr className="text-center" id={item.id} key={index}>
                  <td id={item.id}>{index + 1}</td>
                  <td>
                    <LabelStatusPOP status={item?.pop?.pop} />
                  </td>
                  <td>{item.nama_bts}</td>
                  <td>{item.nama_pic}</td>
                  <td>{item.nomor_pic}</td>
                  <td>{item.lokasi}</td>
                  <td>{item.kordinat}</td>
                  <td>
                    {user?.role_id === 0 ? (
                      <div className="flex flex-row gap-3 justify-center">
                        <DoUpdate onClick={() => updateData(item)} />
                        <DoDelete onClick={() => deleteData(item)} />
                        <DoDetail onClick={() => detailData(item)} />
                      </div>
                    ) : <DoDetail onClick={() => detailData(item)} />
                    }
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!isLoading && (<Pagination perPage={perPage} currentPage={currentPage} countPage={countPage} onClick={(i) => getAllBTS(pop, search, i.target.id)} serverMode />)}
      {/* end table */}
    </div>
  );
}
export default BaseTransceiverStation;
