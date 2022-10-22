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
import { useState, useEffect } from 'react';
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
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styles from './Dashboard.module.css';
import { useAllComplainMutation } from '../../store/features/complain/complainApiSlice';
import { selectAllComplain, setComplain } from '../../store/features/complain/complainSlice';
import DeleteModal from '../../components/common/DeleteModal';
import ComplainModalForm from './ComplainModalForm';
import RFOMasalModal from './RFOMasalModal';
import { useAllPOPMutation } from '../../store/features/pop/popApiSlice';
import { setPOP } from '../../store/features/pop/popSlice';

function Dashboard() {
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
  const [statusData, setStatusData] = useState('open');
  const [detail, setDetail] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [allComplain, { isLoading, isSuccess }] = useAllComplainMutation();
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [dataPOP, setdataPOP] = useState([]);
  const [pop, setPOPLocal] = useState('all');
  const dataRow = useSelector(selectAllComplain);

  const getAllComplain = async () => {
    try {
      const data = await allComplain().unwrap();
      if (data.status === 'success') {
        setShowTable(true);
        dispatch(setComplain({ ...data }));
        setRows(data.data);
        console.log(data, 'data complain');
      }
    } catch (err) {
      console.log(err);
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

  useEffect(() => {
    getAllPOP()
    getAllComplain();
  }, []);

  const handleStatus = (event) => {
    setStatusData(event.target.value);
    console.log(event.target.value, 'status');
    console.log(dataRow, 'row');
    const dataChanged = dataRow.data.filter((item) => {
      if (item.status === event.target.value) {
        return item;
      }
    })
    setRows(dataChanged);
  };

  const getInfo = ($event) => {
    console.log($event);
    if ($event.status === 'success') {
      getAllComplain();
    }
  };

  return (
    <div>
      <div>
        <button
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md w-28"
          htmlFor="my-modal-complain"
          onClick={() => {
            setDetail(null);
            document.getElementById('my-modal-complain').click();
          }}
        >
          Tambah
        </button>
      </div>

      <div className="flex gap-5 mt-5">
        <div className="form-control">
          <label htmlFor="location" className="label font-semibold">
            <span className="label-text"> Status Keluhan</span>
          </label>

          <select
            className="select w-full max-w-full input-bordered"
            onChange={handleStatus}
          >
            <option value="open" label="Open Case">Open Case</option>
            <option value="closed" label="Closed Case">Closed Case</option>
          </select>
        </div>

        <div className="form-control w-40">
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

      {/* Modal tambah */}
      <input type="checkbox" id="my-modal-complain" className="modal-toggle" />
      <ComplainModalForm detail={detail} getInfo={getInfo} />

      {/* Modal rfo masal */}
      <input type="checkbox" id="my-modal-rfo-masal" className="modal-toggle" />
      <RFOMasalModal detail={detail} getInfo={getInfo} />

      {/* modal delete */}
      <input type="checkbox" id="my-modal-delete" className="modal-toggle" />
      <DeleteModal getInfo={getInfo} detail={detail} title="keluhan" />

      {/* modal revert */}
      <input type="checkbox" id="my-modal-revert" className="modal-toggle" />
      <div className="modal">
        <div className={`${styles['modal-box-custom']}`}>
          <label
            htmlFor="my-modal-delete"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Konfirmasi Data Keluhan</h3>
          <hr className="my-2" />

          <div className="flex flex-col justify-center align-middle items-center">
            <HiExclamation size={50} color="#FF2E00" />

            <span className="py-4">
              Apakah anda yakin mengembalikan status data keluhan dari &nbsp;
              <strong>closed</strong>
              &nbsp; menjadi &nbsp;
              <strong>open ?</strong>
            </span>
          </div>

          <hr className="my-2 mt-5" />
          <div className="modal-action justify-center">
            <label htmlFor="my-modal-revert" className="btn btn-md">
              Batal
            </label>
            <label htmlFor="my-modal-revert" className="btn btn-md btn-error">
              Kembalikan
            </label>
          </div>
        </div>
      </div>
      {/* start table */}
      <div className="overflow-x-auto mt-8">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              {columns.map((item) => (
                <th className="text-center">{isLoading ? (<Skeleton count={1} />) : (item)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((item, index) => (
              <tr className="text-center">
                <th>{!isSuccess ? (<Skeleton count={1} />) : index + 1}</th>
                <td className="text-left">
                  { !isSuccess ? (<Skeleton count={1} />)
                    : item.pop.pop === 'Yogyakarta' ? (
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
                    )}
                </td>
                <td>{!isSuccess ? (<Skeleton count={1} />) : (item.id_pelanggan)}</td>
                <td>{!isSuccess ? (<Skeleton count={1} />) : (item.nama_pelanggan)}</td>
                <td>{!isSuccess ? (<Skeleton count={1} />) : (<>{item.nama_pelapor} - {item.nomor_pelapor}</>)}</td>
                <td className="text-left">{!isSuccess ? (<Skeleton count={1} />) : (item.keluhan)}</td>
                <td className="text-left">{!isSuccess ? (<Skeleton count={1} />) : (item.balasan.length > 0 ? item.balasan[item.balasan.length - 1].balasan.slice(0, 20) + '...' : 'Belum ada tindakan')}</td>
                <td className="text-left">
                  {!isSuccess ? (<Skeleton count={1} />) : (
                    <>
                      <p>
                        Dibuat:
                        {new Date(item.created_at).toLocaleString('id-ID')}
                      </p>
                      <p>
                        Diubah:
                        {item.balasan.length > 0
                          ? new Date(item.balasan[item.balasan.length - 1].created_at).toLocaleString('id-ID')
                          : new Date(item.created_at).toLocaleString('id-ID')}
                      </p>
                    </>
                  )}
                </td>
                <td>
                  {!isSuccess ? (<Skeleton count={1} />)
                    : item.status === 'open' ? (
                      <span className="badge badge-accent text-white">
                        {item.status}
                      </span>
                    ) : (
                      <span className="badge badge-info text-white">
                        {item.status}
                      </span>
                    )}
                </td>
                <td>
                  <div className="flex flex-row gap-3 justify-center">
                    {!isSuccess ? (<Skeleton />) : statusData === 'open' ? (
                      <>
                        <HiPencil
                          className="cursor-pointer"
                          size={20}
                          color="#D98200"
                          onClick={() => {
                            setDetail(item);
                            document.getElementById('my-modal-complain').click();
                          }}
                        />
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
                        <HiEye
                          size={20}
                          color="#0D68F1"
                          className="cursor-pointer"
                          onClick={() => {
                            navigate(`/dashboard/detail/${item.id_keluhan}`);
                          }}
                        />
                        <HiOutlineClipboardCheck
                          size={20}
                          color="#065F46"
                          className="cursor-pointer"
                          onClick={() => {
                            navigate(`/dashboard/rfo_single/${item.id_keluhan}`);
                          }}
                        />
                        <HiOutlineClipboardList
                          size={20}
                          color="#0007A3"
                          className="cursor-pointer"
                          onClick={() => {
                            setDetail(item);
                            document.getElementById('my-modal-rfo-masal').click();
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <FaUndoAlt
                          size={20}
                          color="#D98200"
                          className="cursor-pointer"
                          onClick={() => {
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
                            navigate(`/dashboard/detail/${item.uuid}`);
                          }}
                        />
                        <HiOutlineClipboardCheck
                          size={20}
                          color="#065F46"
                          className="cursor-pointer"
                          onClick={() => {
                            navigate(`/dashboard/rfo_single/${item.uuid}`);
                          }}
                        />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isLoading ? (<Skeleton className="mt-5" count={1} />) : (
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
      )}
      {/* end table */}
    </div>
  );
}

export default Dashboard;
