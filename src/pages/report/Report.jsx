/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable max-len */
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
import { useDispatch, useSelector } from 'react-redux';
import styles from './Report.module.css';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import { useAllReportMutation } from '../../store/features/report/reportApiSlice';
import Pagination from '../../components/common/table/Pagination';
import DeleteModal from '../../components/common/DeleteModal';
import { selectAllReport, setReport } from '../../store/features/report/reportSlice';
import { useAllPOPMutation } from '../../store/features/pop/popApiSlice';
import { setPOP } from '../../store/features/pop/popSlice';

function Report() {
  const columns = [
    'No',
    'POP',
    'Tanggal',
    'Shift',
    'Petugas',
    'Aksi',
  ];
  const [showTable, setShowTable] = useState(true);
  // const [pop, setPOP] = useState('all');
  const [dataPOP, setdataPOP] = useState([]);
  const [rows, setRows] = useState([]);
  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();
  const [allReport] = useAllReportMutation();
  const dataRow = useSelector(selectAllReport);
  const [allPOP] = useAllPOPMutation();
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

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

  const handlePOP = (event) => {
    console.log(event.target, 'cek');
    setPOP(event.target.value);
    console.log(event.target.value, 'how');
    const dataChanged = dataRow.data.filter((item) => {
      if (+item.pop_id === +event.target.value) {
        return item;
      }
    })
    if (event.target.value === 'all') {
      console.log(dataRow, 'cek gan');
      setRows(dataRow.data)
    } else {
      setRows(dataChanged);
    }
  };

  const onHandleSearch = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    console.log(event.target.value.length, 'ooo');
    setSearch(event.target.value);

    if (event.target.value.length > 0) {
      const regex = new RegExp(search, 'ig');
      const searchResult = rows.filter((item) => item.petugas.match(regex) || item.pop.pop.match(regex));
      setRows(searchResult);
    } else {
      setRows(dataRow.data);
    }
  }

  const doGetAllReport = async () => {
    try {
      const data = await allReport().unwrap();
      console.log(data, 'dat');
      if (data.status === 'success') {
        dispatch(setReport({ ...data }));
        setRows(data.data);
        console.log(data.data, 'rw');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch(updateBreadcrumb([{ path: '/report', title: 'Laporan' }]));
    getAllPOP();
    doGetAllReport();
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
                placeholder="Cari data keluhan..."
                value={search}
                onChange={onHandleSearch}
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
                <td>{item.pop.pop}</td>
                <td className="text-left">{new Date(item.tanggal).toLocaleDateString('id-ID')}</td>
                <td>{item.shift.shift} ({item.shift.mulai} - {item.shift.selesai})</td>
                <td>{item.petugas}</td>
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
                        onClick={(e) => {
                          // <a href={item.lampiran_laporan} target="_blank" rel="noreferrer" />
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(
                            `${item.lampiran_laporan}`,
                            '_blank' // <- This is what makes it open in a new window.
                          );
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
