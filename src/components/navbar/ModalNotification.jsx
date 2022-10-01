/* eslint-disable */

const ModalNotification = () => {
  return (
    <>
      <div
        tabIndex={0}
        className="mt-3 card card-compact dropdown-content w-96 bg-neutral shadow"
      >
        <div className="card-body">
          <span className="font-bold text-lg">Pemberitahuan</span>
            <div className="card-body bg-white rounded-md">
            <span className="text-base text-gray-900">Internet lambat</span>
            </div>
            <div className="card-body bg-white rounded-md">
            <span className="text-base text-gray-900">Router lambat</span>
            </div>
            <div className="card-body bg-white rounded-md">
            <span className="text-base text-gray-900">Sinyal lambat</span>
            </div>
          <div className="card-actions mt-3">
            <button className="btn btn-primary btn-block btn-sm">Lihat Semua</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalNotification;