import { HiDocumentText } from 'react-icons/hi';

/* eslint-disable jsx-a11y/label-has-associated-control */
function RFODetailSingle() {
  return (
    <>
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
                <td>Closed</td>
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
                disabled
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
                disabled
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
                disabled
                value="deskripsi baru"
              />
            </div>

            <div className="flex gap-5">
              <div className="form-control flex-1">
                <label htmlFor="email" className="label">
                  <span className="label-text"> Waktu Mulai Keluhan</span>
                </label>

                <input
                  type="date"
                  className="input input-md input-bordered  max-w-full"
                  disabled
                />
              </div>

              <div className="form-control flex-1">
                <label htmlFor="email" className="label">
                  <span className="label-text"> Waktu Selesai Keluhan</span>
                </label>

                <input
                  type="date"
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
                disabled
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

          <div className="pt-5">
            <p className="link inline">
              <HiDocumentText size={24} color="blue" className="inline mr-2" />
              file_lampiran_rfo.pdf
            </p>
          </div>

          <div className="modal-action justify-center mt-10">
            <label className="btn btn-md">Kembali</label>
          </div>
        </div>

        <div className=" border-gray-100 border-2" />

        {/* className="w-full overflow-auto mt-6" style={{ height: '35rem' }} */}
        <div
          className="flex-1 overflow-auto mt-6 w-full"
          style={{ height: '40rem' }}
        >
          <h1 className="text-center font-semibold">
            Riwayat Follow Up Keluhan
          </h1>

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
                <HiDocumentText
                  size={24}
                  color="blue"
                  className="inline mr-2"
                />
                file_lampiran.pdf
              </p>
            </div>
          </div>

          {[1, 2, 3, 4, 5].map((item) => (
            <div className="">
              <div className="flex justify-between py-2">
                <p>Dibuat oleh: Farhan Kurnia (Helpdesk)</p>
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
              {item % 2 === 0 ? (
                <div className="py-2">
                  <p className="link inline">
                    <HiDocumentText
                      size={24}
                      color="blue"
                      className="inline mr-2"
                    />
                    file_lampiran.pdf
                  </p>
                </div>
              ) : (
                <div className="py-2" />
              )}
            </div>
          ))}

          {/* <div
            className="w-full overflow-auto mt-6"
            style={{ minHeight: '100px', height: '35rem' }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <div className="border-2 border-gray-100 rounded-md mt-3 p-3">
                <table className="border-none items-center w-full">
                  <tbody>
                    <tr className="text-left">
                      <td>ID Pelanggan</td>
                      <td>:</td>
                      <td>
                        123123
                        {item}
                      </td>
                    </tr>
                    <tr className="text-left">
                      <td>Nama Pelanggan</td>
                      <td>:</td>
                      <td>Putra saja</td>
                    </tr>
                    <tr className="text-left">
                      <td>Kontak</td>
                      <td>:</td>
                      <td>Putri - 08123123123</td>
                    </tr>
                    <tr className="text-left">
                      <td>Sumber Keluhan</td>
                      <td>:</td>
                      <td>Twitter - @putra</td>
                    </tr>
                    <tr className="text-left">
                      <td>Keluhan</td>
                      <td>:</td>
                      <td>Internet sangat lambat</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
}
export default RFODetailSingle;
