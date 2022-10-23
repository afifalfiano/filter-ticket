/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import {
  HiOutlineCloudUpload,
  HiSearch,
  HiPencil,
  HiTrash,
  HiEye,
  HiQuestionMarkCircle,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import {
  useAllRFOMutation,
  useAllRFOMasalMutation,
} from '../../store/features/rfo/rfoApiSlice';
import {
  selectAllRFO,
  selectAllRFOMasal,
  setRFO,
  setRFOMasal,
} from '../../store/features/rfo/rfoSlice';
import styles from './ReasonOfOutage.module.css';

function ReasonOfOutage() {
  const [statusData, setStatusData] = useState('sendiri');
  const [showTable, setShowTable] = useState(false);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [rowsMasal, setRowsMasal] = useState([]);
  const dispatch = useDispatch();
  const [allRFO] = useAllRFOMutation();
  const [allRFOMasal] = useAllRFOMasalMutation();

  const dataKeluhan = useSelector(selectAllRFO);
  const dataGangguan = useSelector(selectAllRFOMasal);
  const allData = [].concat(dataKeluhan, dataGangguan);
  const [search, setSearch] = useState('');

  const handleStatus = (event) => {
    setStatusData(event.target.value);
    console.log(event.target.value, 'status');
    console.log(dataKeluhan, 'row keluhan');
    console.log(dataGangguan, 'row gangguan');
    const dataChanged = allData.filter((item) => {
      if (event.target.value === 'sendiri') {
        if (item.hasOwnProperty('id_rfo_keluhan')) {
          return item;
        }
      } else if (event.target.value === 'masal') {
        if (item.hasOwnProperty('id_rfo_gangguan')) {
          return item;
        }
      }
    });
    if (event.target.value === 'all') {
      console.log(allData, 'cek gan');
      setRows(allData);
    } else {
      setRows(dataChanged);
    }
  };

  const getAllRFOMasal = async () => {
    try {
      const data = await allRFOMasal().unwrap();
      if (data.status === 'success') {
        setShowTable(true);
        dispatch(setRFOMasal({ ...data }));
        setRowsMasal(data.data);
        console.log(data, 'data rfo masal');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllRFO = async () => {
    try {
      const data = await allRFO().unwrap();
      if (data.status === 'success') {
        setShowTable(true);
        dispatch(setRFO({ ...data }));
        setRows(data.data);
        console.log(data, 'data rfo');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(
      updateBreadcrumb([
        { path: '/reason_of_outage', title: 'Reason Of Outage' },
      ])
    );
    getAllRFO();
    getAllRFOMasal();
  }, []);

  const onHandleSearch = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    console.log(event.target.value.length, 'ooo');
    setSearch(event.target.value);

    if (event.target.value.length > 0) {
      const regex = new RegExp(search, 'ig');
      const searchResult = rows.filter((item) => item.problem.match(regex));
      setRows(searchResult);
    } else {
      setRows(allData);
    }
  }

  const columns = [
    'No',
    'Pelanggan',
    'Waktu Gangguan',
    'Durasi',
    'Masalah',
    'Lampiran',
    'Keterangan',
    'Status RFO',
    'Aksi',
  ];
  return (
    <div>
      { statusData === 'masal' && (
      <div className="mb-5">
        <label
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md w-auto"
          htmlFor="my-modal-3"
        >
          Tambah RFO Gangguan Masal
        </label>
      </div>
      )}

      <div className="flex gap-5">
        <div className="form-control">
          <label htmlFor="location" className="label font-semibold">
            <span className="label-text"> Status Keluhan</span>
          </label>

          <select
            className="select w-full max-w-full input-bordered"
            onChange={handleStatus}
            value={statusData}
          >
            <option disabled>Pilih Status</option>
            <option value="all" label="Semua" selected>
              Semua
            </option>
            <option value="sendiri" label="Sendiri" selected>
              Sendiri
            </option>
            <option value="masal" label="Masal">
              Masal
            </option>
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
                placeholder="Cari data rfo..."
                value={search}
                onChange={onHandleSearch}
              />
            </div>
          </div>
        </div>
      </div>

      {/* modal delete */}
      <input type="checkbox" id="my-modal-delete" className="modal-toggle" />
      <div className="modal">
        <div className={`${styles['modal-box-custom']}`}>
          <label
            htmlFor="my-modal-delete"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Hapus Data RFO</h3>
          <hr className="my-2" />

          <div className="flex flex-col justify-center align-middle items-center">
            <HiQuestionMarkCircle size={50} color="#FF2E00" />

            <p className="py-4">Apakah anda yakin akan menghapus data RFO?</p>
          </div>

          <hr className="my-2 mt-5" />
          <div className="modal-action justify-center">
            <label htmlFor="my-modal-delete" className="btn btn-md">
              Batal
            </label>
            <label htmlFor="my-modal-delete" className="btn btn-md btn-error">
              Hapus
            </label>
          </div>
        </div>
      </div>

      {/* modal add or edit  */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className={`${styles['modal-box-custom']}`}>
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Tambah Reason Of Outage Masal</h3>
          <hr className="my-2" />

          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text"> Masalah:</span>
            </label>

            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="masalah..."
            />
          </div>

          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text"> Aksi:</span>
            </label>

            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="aksi..."
            />
          </div>

          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text"> Deskripsi:</span>
            </label>

            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="deskripsi..."
            />
          </div>

          <div className="flex flex-row gap-3">
            <div className="form-control flex-1">
              <label htmlFor="email" className="label">
                <span className="label-text"> Waktu Mulai Keluhan</span>
              </label>

              <input
                type="date"
                className="input input-md input-bordered  max-w-full"
              />
            </div>

            <div className="form-control flex-1">
              <label htmlFor="email" className="label">
                <span className="label-text"> Waktu Selesai Keluhan</span>
              </label>

              <input
                type="date"
                className="input input-md input-bordered  max-w-full"
              />
            </div>
          </div>

          <div className="flex flex-row gap-3">
            <div className="form-control flex-1">
              <label htmlFor="email" className="label">
                <span className="label-text"> Tiket Pelaporan (Opsional)</span>
              </label>

              <input
                type="text"
                className="input input-md input-bordered  max-w-full"
              />
            </div>

            <div className="form-control flex-1">
              <label htmlFor="email" className="label">
                <span className="label-text"> Durasi</span>
              </label>

              <input
                type="text"
                className="input input-md input-bordered  max-w-full"
                disabled
              />
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text"> Unggah Lampiran:</span>
            </label>

            <div className="flex justify-center items-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center w-full h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer "
              >
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                  <HiOutlineCloudUpload size={28} />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PDF, WORD, JPG, JPEG
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>

          <hr className="my-2 mt-5" />
          <div className="modal-action justify-center">
            <label htmlFor="my-modal-3" className="btn btn-md">
              Batal
            </label>
            <label htmlFor="my-modal-3" className="btn btn-md btn-success">
              Simpan
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
                <th className="text-center">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((item, index) => (
              <tr className="text-center">
                <th>{index + 1}</th>
                <td>
                  { item.hasOwnProperty('id_rfo_keluhan') && (<>{item?.keluhan?.id_pelanggan} - {item?.keluhan?.nama_pelanggan}</>)}
                  { item.hasOwnProperty('id_rfo_gangguan') && (<p>Gangguan Masal</p>)}
                </td>
                <td className="text-left">
                  { item.hasOwnProperty('id_rfo_keluhan') && (

                  <>
                    <p>
                      Dibuat:
                      {new Date(item?.mulai_keluhan).toLocaleString()}
                    </p>
                    <p>
                      Diubah:
                      {new Date(item?.selesai_keluhan).toLocaleString()}
                    </p>
                  </>
                  )}
                  { item.hasOwnProperty('id_rfo_gangguan') && (
                  <>
                    <p>
                      Dibuat:
                      {new Date(item?.mulai_gangguan).toLocaleString()}
                    </p>
                    <p>
                      Diubah:
                      {new Date(item?.selesai_gangguan).toLocaleString()}
                    </p>
                  </>
                  )}
                </td>
                <td>{item?.durasi || 0}</td>
                <td>{item?.problem}</td>
                <td
                  className={
                    item?.lampiran_rfo_keluhan ? 'link-primary link' : ''
                  }
                >
                  {item?.lampiran_rfo_keluhan || '-'}
                </td>
                <td>{item?.deskripsi || '-'}</td>
                <td>
                  {item?.status === 'open' ? (
                    <span className="badge badge-accent text-white">
                      {item?.status}
                    </span>
                  ) : (
                    <span className="badge badge-info text-white">
                      {item?.status}
                    </span>
                  )}
                </td>
                <td>
                  <div className="flex flex-row gap-3 justify-center">
                    <HiPencil
                      className="cursor-pointer"
                      size={20}
                      color="#D98200"
                      onClick={() => {
                        document.getElementById('my-modal-3').click();
                      }}
                    />
                    <HiTrash
                      size={20}
                      color="#FF2E00"
                      className="cursor-pointer"
                      onClick={() => {
                        document.getElementById('my-modal-delete').click();
                      }}
                    />
                    <HiEye
                      size={20}
                      color="#0D68F1"
                      className="cursor-pointer"
                      onClick={() => {
                        if (item.hasOwnProperty('id_rfo_keluhan')) {
                          navigate(
                            `/reason_of_outage/detail_single/${item.id_rfo_keluhan}`
                          );
                        }
                        if (item.hasOwnProperty('id_rfo_gangguan')) {
                          navigate(
                            `/reason_of_outage/detail_masal/${item.id_rfo_gangguan}`
                          );
                        }
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
      {/* end table */}
    </div>
  );
}

export default ReasonOfOutage;
