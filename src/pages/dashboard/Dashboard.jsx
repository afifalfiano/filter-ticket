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
import { useDispatch } from 'react-redux';
import styles from './Dashboard.module.css';
import { useAllComplainMutation } from '../../store/features/complain/complainApiSlice';
import { setComplain } from '../../store/features/complain/complainSlice';
import DeleteModal from '../../components/common/DeleteModal';
import ComplainModalForm from './ComplainModalForm';

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
  const [pop, setPOP] = useState('all');
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [allComplain, { ...status }] = useAllComplainMutation();
  const dispatch = useDispatch();

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

  useEffect(() => {
    getAllComplain();
  }, []);

  const handleStatus = (event) => {
    setStatusData(event.target.value);
  };

  const handlePOP = (event) => {
    setPOP(event.target.value);
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
        <label
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md w-28"
          htmlFor="my-modal-complain"
        >
          Tambah
        </label>
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
            <option disabled>Pilih Status</option>
            <option value="open">Open Case</option>
            <option value="closed">Closed Case</option>
          </select>
        </div>

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

      {/* Modal tambah */}
      <input type="checkbox" id="my-modal-complain" className="modal-toggle" />
      <ComplainModalForm detail={detail} getInfo={getInfo} />

      {/* Modal rfo masal */}
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <div className="modal">
        <div className={`${styles['modal-box-custom']}`}>
          <label
            htmlFor="my-modal-4"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Reason of Outage Masal</h3>
          <hr className="my-2" />

          <div className="w-full py-5 px-5 flex w-min-full bg-blue-200 rounded-md mt-5">
            <div className="flex-1 w-full">
              <table className="border-none items-center w-full">
                <tbody>
                  <tr className="text-left">
                    <td>Referensi Keluhan</td>
                    <td>:</td>
                    <td>123123</td>
                  </tr>
                  <tr className="text-left">
                    <td>Pelanggan</td>
                    <td>:</td>
                    <td>3123123 - Pratama</td>
                  </tr>
                  <tr className="text-left">
                    <td>Kontak</td>
                    <td>:</td>
                    <td>Putri - 08123123123</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex-1 w-full">
              <table className="border-none items-center w-full">
                <tbody>
                  <tr className="text-left">
                    <td>Waktu Dibuat</td>
                    <td>:</td>
                    <td>{new Date().toLocaleString('id-ID')}</td>
                  </tr>
                  <tr className="text-left">
                    <td>Waktu Diubah</td>
                    <td>:</td>
                    <td>{new Date().toLocaleString('id-ID')}</td>
                  </tr>
                  <tr className="text-left">
                    <td>Status Keluhan</td>
                    <td>:</td>
                    <td>Open</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-2">
            <div className="form-control">
              <label htmlFor="location" className="label">
                <span className="label-text"> Topik RFO Gangguan Masal</span>
              </label>

              <select className="select w-full max-w-full input-bordered">
                <option disabled>Pilih RFO Topik Gangguan Masal</option>
                <option>Fiber Optik Mati</option>
                <option>Tower Rusak</option>
              </select>
            </div>
          </div>

          <hr className="my-2 mt-5" />
          <div className="modal-action justify-center">
            <label htmlFor="my-modal-4" className="btn btn-md">
              Batal
            </label>
            <label htmlFor="my-modal-4" className="btn btn-md btn-success">
              Simpan
            </label>
          </div>
        </div>
      </div>

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

      {!showTable
            && (
            <h1 className="mt-8">Loading...</h1>
            )}
      {/* start table */}
      {showTable
      && (
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
                {rows.map((item, index) => {
                  if (item.status === statusData) {
                    return (
                      <tr className="text-center">
                        <th>{index + 1}</th>
                        <td className="text-left">{item.pop.pop}</td>
                        <td>{item.id_pelanggan}</td>
                        <td>{item.nama_pelanggan}</td>
                        <td>{item.nama_pelapor} - {item.nomor_pelapor}</td>
                        <td className="text-left">{item.keluhan}</td>
                        <td className="text-left">{item.balasan.length > 0 ? item.balasan[item.balasan.length - 1].balasan.slice(0, 20) + '...' : 'Belum ada tindakan'}</td>
                        <td className="text-left">
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
                        </td>
                        <td>
                          {item.status === 'open' ? (
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
                            {statusData === 'open' ? (
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
                                    document.getElementById('my-modal-4').click();
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
                    );
                  }
                })}
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

export default Dashboard;
