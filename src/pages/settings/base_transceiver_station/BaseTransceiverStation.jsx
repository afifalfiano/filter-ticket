/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
/* eslint-disable default-param-last */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  HiSearch,
  HiQuestionMarkCircle,
  HiTrash,
  HiEye,
  HiPencil,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { selectAllBTS, setBTS } from '../../../store/features/bts/btsSlice';
import styles from './BaseTransceiverStation.module.css';
import { useAllBtsMutation } from '../../../store/features/bts/btsApiSlice';
import FormBTS from './FormBTS';
import DeleteModal from '../../../components/common/DeleteModal';
import { useAllPOPMutation } from '../../../store/features/pop/popApiSlice';
import { selectAllPOP, setPOP } from '../../../store/features/pop/popSlice';
import { updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';

import SkeletonTable from '../../../components/common/table/SkeletonTable';
import Pagination from '../../../components/common/table/Pagination';

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
  const [allBts, { isLoading, isSuccess }] = useAllBtsMutation();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState(null);
  const [search, setSearch] = useState('');

  const [title, setTitle] = useState('update');

  const dataRow = useSelector(selectAllBTS);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    currentFilterPage: 5,
    pageNumbers: [1],
    filterPage: [5, 10, 25, 50, 100]
  });

  const handlePagination = (targetPage = 1, data) => {
    console.log(data, 'opo ikih');
    setPagination({ ...pagination, currentPage: targetPage, currentFilterPage: pagination.currentFilterPage })
    console.log(pagination, 'cek ombak');
    const indexOfLastPost = targetPage * pagination.currentFilterPage;
    const indexOfFirstPost = indexOfLastPost - pagination.currentFilterPage;
    let currentPosts;
    if (data === undefined) {
      currentPosts = dataRow?.data.slice(indexOfFirstPost, indexOfLastPost);
    } else {
      currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
    }
    setRows(currentPosts);
  }

  const doGetPageNumber = (dataFix) => {
    console.log(dataFix, 'fixxxxxx ');
    console.log(pagination.currentFilterPage, 'filpter');
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataFix.length / pagination.currentFilterPage); i++) {
      pageNumbers.push(i);
    }
    console.log(pageNumbers, 'cekk');
    setPagination({ ...pagination, pageNumbers });
  }

  const handleFilterPagination = (selectFilter) => {
    // setPagination({ ...pagination, currentFilterPage: selectFilter });
    const indexOfLastPost = pagination.currentPage * selectFilter;
    const indexOfFirstPost = indexOfLastPost - selectFilter;
    const currentPosts = dataRow?.data.slice(indexOfFirstPost, indexOfLastPost);
    setRows(currentPosts);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataRow.data.length / selectFilter); i++) {
      pageNumbers.push(i);
    }
    console.log(pageNumbers, 'cekk');
    setPagination({ ...pagination, pageNumbers, currentFilterPage: selectFilter });
    console.log('cek ombak filter', pagination);
  }

  const onHandleSearch = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    console.log(event.target.value.length, 'ooo');
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
      setPagination({
        currentPage: 1,
        currentFilterPage: 100,
        pageNumbers: [1],
        filterPage: [5, 10, 25, 50, 100]
      });
    } else {
      setRows(dataRow.data.filter((item) => {
        if (+item.pop.id_pop === +pop) {
          return item;
        }
        if (pop === 'all') {
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
    console.log(event.target, 'cek');
    setPOPLocal(event.target.value);
    // setPOP(event.target.value);
    console.log(event.target.value, 'how');
    const dataChanged = dataRow.data.filter((item) => {
      if (+item.pop_id === +event.target.value) {
        return item;
      }
    })
    if (event.target.value === 'all') {
      console.log(dataRow, 'cek gan');
      setRows(dataRow.data)
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

  const getAllPOP = async () => {
    try {
      const data = await allPOP().unwrap();
      console.log(data, 'ceksaja');
      if (data.status === 'success') {
        dispatch(setPOP({ ...data }));
        console.log('set data', data);
        setdataPOP(data.data)
        console.log(dataPOP, 'pp');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBTS = async () => {
    try {
      const data = await allBts().unwrap();
      if (data.message === 'success') {
        dispatch(setBTS({ ...data }));
        setRows(data.data);
        handlePagination(1, data.data);
        doGetPageNumber(data.data);
        console.log(data, 'data rows');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(updateBreadcrumb([{ path: '/base_transceiver_station', title: 'BTS' }]))
    getAllPOP()
    getAllBTS();
  }, []);

  const getInfo = ($event) => {
    console.log($event);
    if ($event.status === 'success') {
      getAllBTS();
    }
  };

  return (
    <div>
      <div>
        <button
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md w-28"
          onClick={() => {
            setDetail(null);
            setTitle('create');
            document.getElementById('my-modal-3').click();
          }}
        >
          Tambah
        </button>
      </div>

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
            <option value="all" label="Semua">All</option>
            {dataPOP?.map((item) => (
              <option value={item.id_pop} label={item.pop}>{item.pop}</option>
            ))}
          </select>
        </div>
      </div>
      )}

      {/* modal craete or update */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <FormBTS getInfo={getInfo} detail={detail} titleAction={title} />

      {/* modal delete */}
      <input type="checkbox" id="my-modal-delete" className="modal-toggle" />
      <DeleteModal getInfo={getInfo} detail={detail} title="BTS" />

      {isLoading && <SkeletonTable countRows={8} countColumns={10} totalFilter={2} />}

      {/* start table */}
      {!isLoading && (
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
            { rows.map((item, index) => (
              <tr className="text-center" id={item.id}>
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
                  <div className="flex flex-row gap-3 justify-center">
                    <div className="tooltip" data-tip="Edit">
                      <HiPencil
                        className="cursor-pointer"
                        size={20}
                        color="#D98200"
                        onClick={() => {
                          setDetail(item);
                          setTitle('update');
                          document.getElementById('my-modal-3').click();
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
                          document.getElementById('my-modal-delete').click();
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
                          document.getElementById('my-modal-3').click();
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
      {!isLoading && <Pagination serverMode={false} currentFilterPage={pagination.currentFilterPage} perPage={pagination.filterPage} currentPage={pagination.currentPage} countPage={pagination.pageNumbers} onClick={(i) => handlePagination(i.target.id, undefined)} handlePerPage={(x) => handleFilterPagination(x.target.value)} />}
      {/* end table */}
    </div>
  );
}
export default BaseTransceiverStation;
