/* eslint-disable jsx-a11y/label-has-associated-control */
function RFODetailMass() {
  return (
    <div className="flex w-full gap-5">
      <div className="flex-1 w-full">
        <h1 className="text-center font-semibold">Reason Of Outage Masal</h1>

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

        <div className="flex gap-3">
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
      </div>
      <div className="flex-1 w-full">
        <h1 className="text-center font-semibold">
          Daftar Data Keluhan Terdampak
        </h1>

        <div className="border-2 border-gray-100 rounded-md p-3 mt-9">
          <table className="border-none items-center w-full">
            <tbody>
              <tr className="text-left">
                <td>ID Pelanggan</td>
                <td>:</td>
                <td>123123</td>
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
                <td>Twitter - 08123123123</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RFODetailMass;
