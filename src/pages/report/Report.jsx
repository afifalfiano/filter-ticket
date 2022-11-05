/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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
  HiOutlinePrinter
} from 'react-icons/hi';
import { FaUndoAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Report.module.css';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import Pagination from '../../components/common/table/Pagination';
import DeleteModal from '../../components/common/DeleteModal';

function Report() {
  const columns = [
    'No',
    'POP',
    'Tanggal',
    'Shift',
    'Petugas',
    'Keluhan Open',
    'Keluhan Closed',
    'Aksi',
  ];

  const rows = [
    {
      id_report: 1,
      pop: 'Yogyakarta',
      tanggal: new Date().toLocaleDateString('id-ID'),
      shift: '1 ( 08.00 - 16.00 )',
      petugas: 'Putra, Putri, ',
      keluhan_open: '...',
      keluhan_closed: '...'
    }
  ];
  const [showTable, setShowTable] = useState(true);
  const [pop, setPOP] = useState('all');
  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();

  const handlePOP = (event) => {
    setPOP(event.target.value);
  };

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateBreadcrumb([{ path: '/report', title: 'Laporan' }]));
  }, [])

  const getInfo = ($event) => {
    console.log($event);
    if ($event.status === 'success') {
      // getAllComplain();
    }
  };

  return (
    <div>
      <div>
        <label
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md w-28"
          htmlFor="my-modal-3"
          onClick={() => {
            navigate(`/report/create`);
          }}
        >
          Tambah
        </label>
      </div>

      <input type="checkbox" id="my-modal-delete" className="modal-toggle" />
      <DeleteModal getInfo={getInfo} detail={detail} title="laporan" />

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
                placeholder="Cari laporan..."
                required
              />
            </div>
          </div>
        </div>
      </div>
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
                <td>{item.pop}</td>
                <td className="text-left">{item.tanggal}</td>
                <td>{item.shift}</td>
                <td>{item.petugas}</td>
                <td className="text-left">{item.keluhan_open}</td>
                <td className="text-left">{item.keluhan_closed}</td>
                <td>
                  <div className="flex flex-row gap-3 justify-center">
                    <div className="tooltip" data-tip="Detail">
                      <HiEye
                        size={20}
                        color="#0D68F1"
                        className="cursor-pointer"
                        onClick={() => {
                          navigate(`/report/detail/${item.id_report}`);
                        }}
                      />
                    </div>
                    <div className="tooltip" data-tip="Cetak">
                      <HiOutlinePrinter
                        size={20}
                        color="#0D68F1"
                        className="cursor-pointer"
                        onClick={() => {
                          navigate(`/report/detail/${item.id_report}`);
                        }}
                      />
                    </div>
                    <div className="tooltip" data-tip="Hapus">
                      <HiTrash
                        size={20}
                        color="#FF2E00"
                        className="cursor-pointer"
                        onClick={() => {
                          document
                            .getElementById('my-modal-delete')
                            .click();
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
      <Pagination />
      {/* end table */}
    </div>
  )
}
export default Report;
