/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
function BaseTransceiverStation() {
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
    </div>
  );
}
export default BaseTransceiverStation;
