/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  HiSearch,
  HiQuestionMarkCircle,
  HiTrash,
  HiEye,
  HiPencil,
} from 'react-icons/hi';
import styles from './BaseTransceiverStation.module.css';

function BaseTransceiverStation() {
  const columns = [
    'No',
    'Nama',
    'Penanggung Jawab',
    'No Penanggung Jawab',
    'Lokasi',
    'Koordinat',
    'POP',
    'Aksi',
  ];
  const rows = [
    {
      uuid: '12123',
      nama: 'BTS Yogyakarta',
      penanggung_jawab: 'Putra',
      no_penanggung_jawab: '08123123',
      lokasi: 'Yogyakarta',
      koordinat: '-1231211112312, 123123123',
      pop: '-',
    },
    {
      uuid: '12123',
      nama: 'BTS Yogyakarta',
      penanggung_jawab: 'Putra',
      no_penanggung_jawab: '08123123',
      lokasi: 'Yogyakarta',
      koordinat: '-1231211112312, 123123123',
      pop: '-',
    },
    {
      uuid: '12123',
      nama: 'BTS Yogyakarta',
      penanggung_jawab: 'Putra',
      no_penanggung_jawab: '08123123',
      lokasi: 'Yogyakarta',
      koordinat: '-1231211112312, 123123123',
      pop: '-',
    },
    {
      uuid: '12123',
      nama: 'BTS Yogyakarta',
      penanggung_jawab: 'Putra',
      no_penanggung_jawab: '08123123',
      lokasi: 'Yogyakarta',
      koordinat: '-1231211112312, 123123123',
      pop: '-',
    },
    {
      uuid: '12123',
      nama: 'BTS Yogyakarta',
      penanggung_jawab: 'Putra',
      no_penanggung_jawab: '08123123',
      lokasi: 'Yogyakarta',
      koordinat: '-1231211112312, 123123123',
      pop: '-',
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

      <div className="mt-4">
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
                placeholder="Cari data BTS..."
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* modal craete or update */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-2xl">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Tambah BTS</h3>
          <hr className="my-2" />
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text"> Nama BTS:</span>
            </label>

            <input
              type="text"
              className="input input-md input-bordered  max-w-full"
            />
          </div>

          <div className="flex flex-row gap-3">
            <div className="form-control flex-1">
              <label htmlFor="email" className="label">
                <span className="label-text"> Nama PIC</span>
              </label>

              <input
                type="text"
                className="input input-md input-bordered max-w-full"
              />
            </div>

            <div className="form-control flex-1">
              <label htmlFor="email" className="label">
                <span className="label-text"> Kontak PIC</span>
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
                <span className="label-text"> Alamat Lengkap</span>
              </label>

              <input
                type="text"
                className="input input-md input-bordered  max-w-full"
              />
            </div>
            <div className="form-control flex-1">
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

          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text"> Koordinat:</span>
            </label>

            <input
              type="text"
              className="input input-md input-bordered  max-w-full"
            />
          </div>

          <hr className="my-2 mt-10" />
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
          <h3 className="text-lg font-bold">Hapus Data BTS</h3>
          <hr className="my-2" />

          <div className="flex flex-col justify-center align-middle items-center">
            <HiQuestionMarkCircle size={50} color="#FF2E00" />

            <p className="py-4">Apakah anda yakin akan menghapus data BTS?</p>
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
            {rows.map((item, index) => (
              <tr className="text-center">
                <td>{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.penanggung_jawab}</td>
                <td>{item.no_penanggung_jawab}</td>
                <td>{item.lokasi}</td>
                <td>{item.koordinat}</td>
                <td>{item.pop}</td>
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
                      onClick={() => {}}
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
export default BaseTransceiverStation;
