/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  HiOutlineCloudUpload,
  HiSearch,
  HiPencil,
  HiTrash,
  HiEye,
  HiOutlineClipboardCheck,
  HiOutlineClipboardList,
  HiQuestionMarkCircle,
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

function Dashboard() {
  const navigate = useNavigate();
  const columns = [
    'No',
    'ID Pelanggan',
    'Nama Pelanggan',
    'Kontak',
    'Keluhan',
    'Progress',
    'Waktu',
    'Status',
    'Aksi',
  ];
  const rows = [
    {
      uuid: '12123',
      id_pelanggan: '3123123',
      nama_pelanggan: 'putra',
      kontak: 'Ardi - 08123123',
      keluhan: 'internet lemot',
      progress: 'router perlu dicek kembali',
      waktu_dibuat: new Date().toLocaleString('id-ID'),
      waktu_diubah: new Date().toLocaleString('id-ID'),
      status: 'open',
    },
    {
      uuid: '12123',
      id_pelanggan: '3123123',
      nama_pelanggan: 'putra',
      kontak: 'Ardi - 08123123',
      keluhan: 'internet lemot',
      progress: 'router perlu dicek kembali',
      waktu_dibuat: new Date().toLocaleString('id-ID'),
      waktu_diubah: new Date().toLocaleString('id-ID'),
      status: 'open',
    },
    {
      uuid: '12123',
      id_pelanggan: '3123123',
      nama_pelanggan: 'putra',
      kontak: 'Ardi - 08123123',
      keluhan: 'internet lemot',
      progress: 'router perlu dicek kembali',
      waktu_dibuat: new Date().toLocaleString('id-ID'),
      waktu_diubah: new Date().toLocaleString('id-ID'),
      status: 'open',
    },
    {
      uuid: '12123',
      id_pelanggan: '3123123',
      nama_pelanggan: 'putra',
      kontak: 'Ardi - 08123123',
      keluhan: 'internet lemot',
      progress: 'router perlu dicek kembali',
      waktu_dibuat: new Date().toLocaleString('id-ID'),
      waktu_diubah: new Date().toLocaleString('id-ID'),
      status: 'open',
    },
    {
      uuid: '12123',
      id_pelanggan: '3123123',
      nama_pelanggan: 'putra',
      kontak: 'Ardi - 08123123',
      keluhan: 'internet lemot',
      progress: 'router perlu dicek kembali',
      waktu_dibuat: new Date().toLocaleString('id-ID'),
      waktu_diubah: new Date().toLocaleString('id-ID'),
      status: 'open',
    },
  ];
  return (
    <div>
      <div>
        <label
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md w-28"
          htmlFor="my-modal-3"
        >
          Tambah
        </label>
      </div>

      <div className="flex gap-5 mt-5">
        <div className="form-control">
          <label htmlFor="location" className="label font-semibold">
            <span className="label-text"> Status Keluhan</span>
          </label>

          <select className="select w-full max-w-full input-bordered">
            <option disabled>Pilih Status</option>
            <option>Open Case</option>
            <option>Closed Case</option>
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="location" className="label font-semibold">
            <span className="label-text"> Cari</span>
          </label>
          <div className="flex items-center">
            <div class="relative w-full">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <HiSearch />
              </div>
              <input
                type="text"
                id="voice-search"
                class="input input-md input-bordered pl-10 p-2.5 "
                placeholder="Cari data keluhan..."
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal tambah */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className={`${styles['modal-box-custom']}`}>
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Tambah Keluhan</h3>
          <hr className="my-2" />
          <div className="flex flex-row gap-3">
            <div className="form-control flex-1">
              <label htmlFor="email" className="label">
                <span className="label-text"> ID Pelanggan</span>
              </label>

              <input
                type="text"
                className="input input-md input-bordered max-w-full"
              />
            </div>

            <div className="form-control flex-1">
              <label htmlFor="email" className="label">
                <span className="label-text"> Nama Pelanggan</span>
              </label>

              <input
                type="text"
                className="input input-md input-bordered  max-w-full"
              />
            </div>
          </div>

          <div className="flex flex-row gap-3">
            <div className="form-control flex-grow-1 w-1/2">
              <label htmlFor="location" className="label">
                <span className="label-text"> POP (Lokasi)</span>
              </label>

              <select className="select w-full max-w-full input-bordered">
                <option disabled>Pilih Lokasi</option>
                <option>Yogyakarta</option>
                <option>Solo</option>
                <option>Surakarta</option>
              </select>
            </div>
          </div>

          <div className="flex flex-row gap-3">
            <div className="form-control flex-1">
              <label htmlFor="location" className="label">
                <span className="label-text"> Sumber Keluhan</span>
              </label>

              <select className="select w-full max-w-full input-bordered">
                <option disabled>Pilih Sumber</option>
                <option>Twitter</option>
                <option>Whatsapp</option>
                <option>Email</option>
                <option>Lainnya</option>
              </select>
            </div>

            <div className="form-control flex-1">
              <label htmlFor="email" className="label">
                <span className="label-text"> Kontak Sumber Keluhan</span>
              </label>

              <input
                type="text"
                className="input input-md input-bordered  max-w-full"
              />
            </div>
          </div>

          <div className="flex flex-row gap-3">
            <div className="form-control flex-1">
              <label htmlFor="email" className="label">
                <span className="label-text"> Nama Kontak</span>
              </label>

              <input
                type="text"
                className="input input-md input-bordered  max-w-full"
              />
            </div>

            <div className="form-control flex-1">
              <label htmlFor="email" className="label">
                <span className="label-text"> Nomor Kontak</span>
              </label>

              <input
                type="text"
                className="input input-md input-bordered  max-w-full"
              />
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text"> Keluhan Awal:</span>
            </label>

            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Keluhan awal ..."
            />
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
      <div className="modal">
        <div className={`${styles['modal-box-custom']}`}>
          <label
            htmlFor="my-modal-delete"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Hapus Data Keluhan</h3>
          <hr className="my-2" />

          <div className="flex flex-col justify-center align-middle items-center">
            <HiQuestionMarkCircle size={50} color="#FF2E00" />

            <p className="py-4">
              Apakah anda yakin akan menghapus data keluhan?
            </p>
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

      <div className="overflow-x-auto mt-8">
        <table className="table w-full">
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
                <td>{index + 1}</td>
                <td>{item.id_pelanggan}</td>
                <td>{item.nama_pelanggan}</td>
                <td>{item.kontak}</td>
                <td>{item.keluhan}</td>
                <td>{item.progress}</td>
                <td className="text-left">
                  <p>
                    Dibuat:
                    {item.waktu_dibuat}
                  </p>
                  <p>
                    Diubah:
                    {item.waktu_diubah}
                  </p>
                </td>
                <td>
                  <span className="badge badge-accent text-white">
                    {item.status}
                  </span>
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
                    <HiOutlineClipboardList
                      size={20}
                      color="#0007A3"
                      className="cursor-pointer"
                      onClick={() => {
                        document.getElementById('my-modal-4').click();
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
    </div>
  );
}

export default Dashboard;
