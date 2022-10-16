/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { HiDocumentText, HiOutlineCloudUpload } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useComplainByIdMutation } from '../../../store/features/complain/complainApiSlice';
import { setComplainById } from '../../../store/features/complain/complainSlice';
import { seelectRFODetail } from '../../../store/features/rfo/rfoSlice';
import DashboardDetail from '../detail/DashboardDetail';

function DashboardRFOSingle() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location, ';loc');
  const [detailComplain, setDetailComplain] = useState(null);
  const { id } = useParams();
  console.log(id, 'param');
  const [complainById, { ...status }] = useComplainByIdMutation();
  const dispatch = useDispatch();

  const getComplainById = async () => {
    try {
      const data = await complainById(id).unwrap();
      dispatch(setComplainById({ ...data }));
      setDetailComplain(data.data);
      console.log(data, 'data');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getComplainById();
  }, []);

  return (
    <>
      <div className="w-full py-5 px-5 flex w-min-full bg-blue-200 rounded-md">
        <div className="flex-1 w-full">
          <table className="border-none items-center w-full">
            <tbody>
              <tr className="text-left">
                <td>Referensi Keluhan</td>
                <td>:</td>
                <td>{detailComplain?.nomor_keluhan}</td>
              </tr>
              <tr className="text-left">
                <td>Pelanggan</td>
                <td>:</td>
                <td>{detailComplain?.id_pelanggan} - {detailComplain?.nama_pelanggan}</td>
              </tr>
              <tr className="text-left">
                <td>Kontak</td>
                <td>:</td>
                <td>{detailComplain?.nama_pelapor} - {detailComplain?.nomor_pelapor}</td>
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
                <td>{new Date(detailComplain?.created_at).toLocaleString('id-ID')}</td>
              </tr>
              <tr className="text-left">
                <td>Waktu Diubah</td>
                <td>:</td>
                <td>
                  {detailComplain?.balasan.length > 0
                    ? new Date(detailComplain?.balasan[detailComplain.balasan.length - 1].created_at).toLocaleString('id-ID')
                    : new Date(detailComplain?.created_at).toLocaleString('id-ID')}
                </td>
              </tr>
              <tr className="text-left">
                <td>Status Keluhan</td>
                <td>:</td>
                <td>{detailComplain?.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex w-full gap-5 mt-5">
        <div className="flex-1 w-full">
          <h1 className="text-center font-semibold">Reason Of Outage Single</h1>

          <div className="flex flex-col gap-3">
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text"> Masalah:</span>
              </label>

              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="masalah..."
                value="masalah baru"
              />
            </div>

            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text"> Aksi:</span>
              </label>

              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="aksi..."
                value="aksi baru"
              />
            </div>

            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text"> Deskripsi:</span>
              </label>

              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="deskripsi..."
                value="deskripsi baru"
              />
            </div>

            <div className="flex gap-5">
              <div className="form-control flex-1">
                <label htmlFor="email" className="label">
                  <span className="label-text"> Waktu Mulai Keluhan</span>
                </label>

                <input
                  type="text"
                  value={new Date(detailComplain?.created_at).toLocaleDateString('id-ID')}
                  className="input input-md input-bordered  max-w-full"
                  disabled
                />
              </div>

              <div className="form-control flex-1">
                <label htmlFor="email" className="label">
                  <span className="label-text"> Waktu Selesai Keluhan</span>
                </label>

                <input
                  type="text"
                  value={detailComplain?.balasan.length > 0
                    ? new Date(detailComplain?.balasan[detailComplain.balasan.length - 1].created_at).toLocaleDateString('id-ID')
                    : new Date(detailComplain?.created_at).toLocaleDateString('id-ID')}
                  className="input input-md input-bordered  max-w-full"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
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

          <div className="modal-action justify-center mt-10">
            <button
              type="button"
              className="btn btn-md mr-5"
              onClick={() => {
                navigate('/dashboard');
              }}
            >
              Kembali
            </button>
            <button type="button" className="btn btn-md btn-success">
              Simpan
            </button>
          </div>
        </div>

        <div className=" border-gray-100 border-2" />

        <div
          className="flex-1 overflow-auto mt-6 w-full"
          style={{ height: '50rem' }}
        >
          <h1 className="text-center font-semibold">
            Riwayat Follow Up Keluhan
          </h1>

          <DashboardDetail rfoSingle />
        </div>
      </div>
    </>
  );
}
export default DashboardRFOSingle;
