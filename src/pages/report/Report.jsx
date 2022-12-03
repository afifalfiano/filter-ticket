/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable default-param-last */
/* eslint-disable no-nested-ternary */
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
import { selectCurrentUser } from '../../store/features/auth/authSlice';
import ReportDetail from './detail/ReportDetail';

function Report() {
  const columns = [
    'No',
    'POP',
    'Tanggal',
    'Shift',
    'Petugas NOC',
    'Petugas Helpdesk',
    'Aksi',
  ];
  const [showTable, setShowTable] = useState(true);
  const [pop, setPOPLocal] = useState('all');
  const [dataPOP, setdataPOP] = useState([]);
  const [rows, setRows] = useState([]);
  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();
  const [allReport] = useAllReportMutation();
  const dataRow = useSelector(selectAllReport);
  const [allPOP] = useAllPOPMutation();
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const { data: user } = useSelector(selectCurrentUser);

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

  const getAllPOP = async () => {
    try {
      const data = await allPOP().unwrap();
      console.log(data, 'ceksaja');
      if (data.status === 'success') {
        let dataFix;
        if (user?.role_id === 2) {
          const dataFilter = data.data.filter((pop) => {
            if (pop.id_pop === user.pop_id) {
              return pop;
            }
          });
          dataFix = dataFilter
        } else {
          dataFix = data.data
        }
        dispatch(setPOP({ data: dataFix }));
        console.log('set data', data);
        setdataPOP(dataFix);
        console.log(dataPOP, 'pp');
        // dispatch(setPOP({ ...data }));
        // console.log('set data', data);
        // setdataPOP(data.data)
        // console.log(dataPOP, 'pp');
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const onHandleSearch = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    console.log(event.target.value.length, 'ooo');
    setSearch(event.target.value);

    if (event.target.value.length > 0) {
      const regex = new RegExp(search, 'ig');
      const searchResult = dataRow.data.filter((item) => {
        if (+item.pop.id_pop === +pop) {
          if (item.noc.match(regex) || item.helpdesk.match(regex) || item.pop.pop.match(regex)) {
            return item;
          }
        }
        if (pop === 'all') {
          if (item.noc.match(regex) || item.helpdesk.match(regex) || item.pop.pop.match(regex)) {
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

  const doGetAllReport = async () => {
    try {
      const data = await allReport().unwrap();
      console.log(data, 'dat');
      if (data.status === 'success') {
        let dataFix;
        if (user?.role_id === 2) {
          const dataFilter = data.data.filter((item) => {
            if (item.pop_id === user.pop_id) {
              return item;
            }
          });
          dataFix = dataFilter
          dispatch(setReport({ data: dataFix }));
          setRows(dataFix);
          handlePagination(1, dataFix);
          doGetPageNumber(dataFix);
          console.log(dataFix, 'data complain');
        } else {
          dispatch(setReport({ ...data }));
          setRows(data.data);
          handlePagination(1, data.data);
          doGetPageNumber(data.data);
        }
        // dispatch(setReport({ ...data }));
        // setRows(data.data);
        // console.log(data.data, 'rw');
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

      {/* Modal tambah */}
      <input type="checkbox" id="my-modal-detail" className="modal-toggle" />
      {/* <RenderModal> */}
      {/* {showModal && <ModalActivity onClose={setShowModal} detail={detail} title="edit" />} */}
      <ReportDetail detailData={detail} />

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
                placeholder="Cari data laporan..."
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
                <td className="text-left">{new Date(item.tanggal).toLocaleDateString('id-ID')}</td>
                <td>{item.shift.shift} ({item.shift.mulai} - {item.shift.selesai})</td>
                <td>{item.noc}</td>
                <td>{item.helpdesk}</td>
                <td>
                  <div className="flex flex-row gap-3 justify-center">
                    <div className="tooltip" data-tip="Detail">
                      <HiEye
                        size={20}
                        color="#0D68F1"
                        className="cursor-pointer"
                        onClick={() => {
                          // setDetail(item);
                          // navigate(`/report/detail/${item.id_laporan}`);
                          setDetail(item);
                          document
                            .getElementById('my-modal-detail')
                            .click();
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
                          setDetail(item);
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
      <Pagination serverMode={false} currentFilterPage={pagination.currentFilterPage} perPage={pagination.filterPage} currentPage={pagination.currentPage} countPage={pagination.pageNumbers} onClick={(i) => handlePagination(i.target.id, undefined)} handlePerPage={(x) => handleFilterPagination(x.target.value)} />
      {/* end table */}
    </div>
  )
}
export default Report;
