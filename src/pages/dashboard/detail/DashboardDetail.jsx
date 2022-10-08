/* eslint-disable jsx-a11y/label-has-associated-control */
import { HiDocumentText, HiOutlineCloudUpload } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

function DashboardDetail() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full py-5 px-5 flex w-min-full bg-blue-200 rounded-md">
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

      {/* section reply */}
      <div className="flex w-full flex-col py-5">
        <p className="justify-start w-full">Keluhan Awal</p>
        <div className="flex justify-between py-2">
          <p>Dibuat oleh: Farhan Kurnia (Helpdesk) </p>
          <p>
            {new Date().toLocaleString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour12: false,
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
            })}
          </p>
        </div>
        <div className="form-control">
          <textarea
            className="textarea textarea-bordered h-28"
            placeholder="Keluhan awal ..."
            disabled
            value="internet sangat lambat"
            style={{ resize: 'none' }}
          />
        </div>
        <div className="py-2">
          <p className="link inline">
            <HiDocumentText size={24} color="blue" className="inline mr-2" />
            file_lampiran.pdf
          </p>
        </div>

        <hr className="my-3" />
        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="label-text"> Balasan</span>
          </label>

          <textarea
            className="textarea textarea-bordered h-28"
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
        <div className="text-center items-center justify-center mt-10">
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
    </div>
  );
}

export default DashboardDetail;