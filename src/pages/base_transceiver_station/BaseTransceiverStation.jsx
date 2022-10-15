/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
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
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectAllBTS, setBTS } from '../../store/features/bts/btsSlice';
import styles from './BaseTransceiverStation.module.css';
import { useAllBtsMutation } from '../../store/features/bts/btsApiSlice';
import FormBTS from './FormBTS';

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

  const [rows, setRows] = useState([]);
  const [pop, setPOP] = useState('all');
  const [allBts, { ...status }] = useAllBtsMutation();
  const dispatch = useDispatch();

  const handlePOP = (event) => {
    setPOP(event.target.value);
  };

  const getAllBTS = async () => {
    try {
      const data = await allBts().unwrap();
      if (data.message === 'success') {
        dispatch(setBTS({ ...data }));
        setRows(data.data);
        console.log(data, 'data');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllBTS();
  }, []);

  return (
    <div>
      <div>
        <button
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md w-28"
          onClick={() => document.getElementById('my-modal-3').click()}
        >
          Tambah
        </button>
      </div>
      <div className="flex gap-5 mt-5">
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
      </div>

      {/* modal craete or update */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <FormBTS />

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
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              {columns.map((item) => (
                <th className="text-center">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 &&
              rows.map((item, index) => (
                <tr className="text-center" id={item.id}>
                  <td id={item.id}>{index + 1}</td>
                  <td>{item.nama_bts}</td>
                  <td>{item.nama_pic}</td>
                  <td>{item.nomor_pic}</td>
                  <td>{item.lokasi}</td>
                  <td>{item.kordinat}</td>
                  <td>{item.pop.pop}</td>
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
