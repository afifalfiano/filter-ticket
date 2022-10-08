/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import {
  HiOutlineCloudUpload,
  HiSearch,
  HiPencil,
  HiTrash,
  HiEye,
  HiQuestionMarkCircle,
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import styles from './ReasonOfOutage.module.css';

function ReasonOfOutage() {
  const [statusData, setStatusData] = useState('all');

  const navigate = useNavigate();

  const handleStatus = (event) => {
    setStatusData(event.target.value);
  };

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
  const rows = [
    {
      uuid: '12123',
      pelanggan: 'Putra',
      waktu_dibuat: new Date().toLocaleString('id-ID'),
      waktu_selesai: new Date().toLocaleString('id-ID'),
      durasi: '3 hari',
      masalah: 'internet lambat',
      lampiran: 'file_lampiran_gangguan_single.pdf',
      keterangan: '-',
      status: 'sendiri',
    },
    {
      uuid: '12123',
      pelanggan: '-',
      waktu_dibuat: new Date().toLocaleString('id-ID'),
      waktu_selesai: new Date().toLocaleString('id-ID'),
      durasi: '7 hari',
      masalah: 'cut off FO janti',
      lampiran: 'file_lampiran_gangguan_masal.pdf',
      keterangan: '-',
      status: 'masal',
    },
    {
      uuid: '12123',
      pelanggan: 'Putra',
      waktu_dibuat: new Date().toLocaleString('id-ID'),
      waktu_selesai: new Date().toLocaleString('id-ID'),
      durasi: '3 hari',
      masalah: 'internet lambat',
      lampiran: 'file_lampiran_gangguan_single.pdf',
      keterangan: '-',
      status: 'sendiri',
    },
  ];
  return (
    <div>
      <div>
        <label
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md w-auto"
          htmlFor="my-modal-3"
        >
          Tambah RFO Gangguan Masal
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
            <option value="all">Semua</option>
            <option value="sendiri">Sendiri</option>
            <option value="masal">Masal</option>
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
                required
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
        <table className="table w-full">
          <thead>
            <tr>
              {columns.map((item) => (
                <th className="text-center">{item}</th>
              ))}
            </tr>
          </thead>
          {/* rows.map((item) => {}) */}
          <tbody>
            {rows.map((item, index) => {
              if (statusData === 'all') {
                return (
                  <tr className="text-center">
                    <td>{index + 1}</td>
                    <td>{item.pelanggan}</td>
                    <td className="text-left">
                      <p>
                        Dibuat:
                        {item.waktu_dibuat}
                      </p>
                      <p>
                        Diubah:
                        {item.waktu_selesai}
                      </p>
                    </td>
                    <td>{item.durasi}</td>
                    <td>{item.masalah}</td>
                    <td className="link-primary link">{item.lampiran}</td>
                    <td>{item.keterangan}</td>
                    <td>
                      {item.status === 'sendiri' ? (
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
                            if (item.status === 'sendiri') {
                              navigate(
                                `/reason_of_outage/detail_single/${item.uuid}`
                              );
                            }
                            if (item.status === 'masal') {
                              navigate(
                                `/reason_of_outage/detail_masal/${item.uuid}`
                              );
                            }
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              }

              if (item.status === statusData) {
                return (
                  <tr className="text-center">
                    <td>{index + 1}</td>
                    <td>{item.pelanggan}</td>
                    <td className="text-left">
                      <p>
                        Dibuat:
                        {item.waktu_dibuat}
                      </p>
                      <p>
                        Diubah:
                        {item.waktu_selesai}
                      </p>
                    </td>
                    <td>{item.durasi}</td>
                    <td>{item.masalah}</td>
                    <td className="link-primary link">{item.lampiran}</td>
                    <td>{item.keterangan}</td>
                    <td>
                      {item.status === 'sendiri' ? (
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
                            if (item.status === 'sendiri') {
                              navigate(
                                `/reason_of_outage/detail_single/${item.uuid}`
                              );
                            }
                            if (item.status === 'masal') {
                              navigate(
                                `/reason_of_outage/detail_masal/${item.uuid}`
                              );
                            }
                          }}
                        />
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
      {/* end table */}
    </div>
  );
}

export default ReasonOfOutage;
