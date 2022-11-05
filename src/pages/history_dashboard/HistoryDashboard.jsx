/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-template */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import {
  HiOutlineCloudUpload,
  HiSearch,
  HiPencil,
  HiTrash,
  HiEye,
  HiOutlineClipboardCheck,
  HiOutlineClipboardList,
  HiQuestionMarkCircle,
  HiExclamation,
} from 'react-icons/hi';
import { FaUndoAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './HistoryDashboard.module.css';
import { useAllComplainHistoryMutation } from '../../store/features/complain_history/complainHistoryApiSlice';
import { selectAllComplainHistory, setComplainHistory } from '../../store/features/complain_history/complainHistorySlice';
import ReopenModal from './ReopenModal';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import { useAllPOPMutation } from '../../store/features/pop/popApiSlice';
import { setPOP } from '../../store/features/pop/popSlice';
import Pagination from '../../components/common/table/Pagination';
import SkeletonTable from '../../components/common/table/SkeletonTable';

function HistoryDashboard() {
  const columns = [
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
  const [showTable, setShowTable] = useState(false);
  const [pop, setPOPLocal] = useState('all');
  const [dataPOP, setdataPOP] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const [allComplainHistory, { isLoading }] = useAllComplainHistoryMutation();
  const [detail, setDetail] = useState(null);

  const getAllComplainHistory = async () => {
    try {
      const data = await allComplainHistory().unwrap();
      if (data.status === 'success') {
        setShowTable(true);
        dispatch(setComplainHistory({ ...data.data }));
        setRows(data.data.data);
        console.log(data, 'data complain');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const dataRow = useSelector(selectAllComplainHistory);

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

  const onHandleSearch = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    console.log(event.target.value.length, 'ooo');
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
  }, []);

  const handlePOP = (event) => {
    console.log(event.target, 'cek');
    setPOPLocal(event.target.value);
    console.log(event.target.value, 'how');
    const dataChanged = dataRow.data.filter((item) => {
      if (+item.pop_id === +event.target.value) {
        return item;
      }
    })
    if (event.target.value === 'all') {
      console.log(dataRow, 'cek gan');
      setRows(dataRow.data);
    } else {
      setRows(dataChanged);
    }
  };

  const getInfo = ($event) => {
    console.log($event);
    if ($event.status === 'success') {
      getAllComplainHistory();
    }
  };

  return (
    <div>

      {/* modal revert */}
      <input type="checkbox" id="my-modal-revert" className="modal-toggle" />
      <ReopenModal getInfo={getInfo} detail={detail} />

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
                  <td className="text-left">{item.keluhan}</td>
                  <td className="text-left">
                    {item.balasan.length > 0
                      ? `${item.balasan[
                        item.balasan.length - 1
                      ].balasan.slice(0, 20)}...`
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
                  <td>
                    <div className="flex flex-row gap-3 justify-center">
                      <FaUndoAlt
                        size={20}
                        color="#D98200"
                        className="cursor-pointer"
                        onClick={() => {
                          setDetail(item);
                          document
                            .getElementById('my-modal-revert')
                            .click();
                        }}
                      />
                      <HiEye
                        size={20}
                        color="#0D68F1"
                        className="cursor-pointer"
                        onClick={() => {
                          navigate(`/history_dashboard/detail/${item.id_keluhan}`);
                        }}
                      />
                      {item.rfo_keluhan_id !== null ? (
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
                      ) : (
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
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!isLoading && (<Pagination />)}
      </>
      )}
      {/* end table */}
    </div>
  );
}

export default HistoryDashboard;
