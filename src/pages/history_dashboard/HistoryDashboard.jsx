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
import { useDispatch } from 'react-redux';
import styles from './HistoryDashboard.module.css';
import { useAllComplainHistoryMutation } from '../../store/features/complain_history/complainHistoryApiSlice';
import { setComplainHistory } from '../../store/features/complain_history/complainHistorySlice';
import ReopenModal from './ReopenModal';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';

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
  const [pop, setPOP] = useState('all');
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const [allComplainHistory, { ...status }] = useAllComplainHistoryMutation();
  const [detail, setDetail] = useState(null);

  const getAllComplainHistory = async () => {
    try {
      const data = await allComplainHistory().unwrap();
      if (data.status === 'success') {
        setShowTable(true);
        dispatch(setComplainHistory({ ...data }));
        setRows(data.data);
        console.log(data, 'data complain');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(updateBreadcrumb([{ path: '/history_dashboard', title: 'Riwayat Dasbor' }]))
    getAllComplainHistory();
  }, []);

  const handlePOP = (event) => {
    setPOP(event.target.value);
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

      <div className="flex gap-5 mt-5">
        <div className="form-control">
          <label htmlFor="location" className="label font-semibold">
            <span className="label-text"> POP</span>
          </label>

          <select
            className="select w-full max-w-full input-bordered"
            onChange={handlePOP}
          >
            <option disabled>Pilih POP</option>
            <option value="yogyakarta">Yogyakarta</option>
            <option value="solo">Solo</option>
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
                placeholder="Cari data keluhan..."
                required
              />
            </div>
          </div>
        </div>
      </div>

      {!showTable
            && (
            <h1 className="mt-8">Loading...</h1>
            )}
      {/* start table */}
      {showTable && (
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
                      <HiOutlineClipboardCheck
                        size={20}
                        color="#065F46"
                        className="cursor-pointer"
                        onClick={() => {
                          navigate(
                            `/history_dashboard/rfo_single/${item.id_keluhan}`
                          );
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-5 pb-20">
          <div className="flex flex-row gap-1">
            <label htmlFor="location" className="label font-semibold">
              <span className="label-text"> Halaman 1 dari 1</span>
            </label>
            <div className="form-control">
              <select className="select input-bordered">
                <option>5</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
          </div>
          <div className="">
            <div className="btn-group">
              <button className="btn btn-outline btn-active">1</button>
              <button className="btn btn-outline">2</button>
              <button className="btn btn-outline">3</button>
              <button className="btn btn-outline">4</button>
            </div>
          </div>
        </div>
      </>
      )}
      {/* end table */}
    </div>
  );
}

export default HistoryDashboard;
