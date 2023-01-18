
function TemplateReport({...props}) {
    return (
        <div
        id="preview-report"
        className="w-full max-w-screen-xl m-0 p-9"
        style={{
          width: '1440px !important',
          height: '4500px !important' }}
      >
        <h1 className="text-center font-bold text-2xl mt-0 pt-0">Daily Complaint Report Helpdesk</h1>
        <div className="flex justify-between align-middle items-center mt-5">
          <div className="flex-1">
            <div className="flex gap-5">
              <div>
                <p>Tanggal</p>
                <p>Sesi</p>
                <p>POP</p>
                <p>Helpdesk</p>
                <p>NOC</p>
              </div>
              <div>
                <p>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <div className="">{props.allShiftLocal?.map((item, index) => {
                  if (item.id_shift === +props.bodyKeluhan.shift) {
                    return (
                      <span key={index}>{`${item.shift} (${item.mulai})-(${item.selesai})`}</span>
                    );
                  }
                })}
                </div>
                <p>{props.allPOPLocal.find((item) => item.id_pop === +props.bodyKeluhan.pop_id)['pop']}</p>
                <p>{props.getAllHelpdesk()}</p>
                <p>{props.getAllNOC()}</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col items-end">
              <img src="/report_logo.png" alt="Repor" width={157} className="image-full mt-4" />
            </div>
          </div>
        </div>

        <div className="text-center rounded-xl bg-gray-300 p-2 font-bold mt-5">
          <h2>Keluhan Open</h2>
        </div>

        <div className="flex mt-5 border-gray-300 rounded-lg flex-wrap">
          {props.keluhanLaporanLocal?.keluhan_open.map((item, index) => (
            <div key={index} className={`flex p-2 border border-gray-300 w-1/2 ${index % 2 === 0 ? 'rounded-l-lg' : 'rounded-r-lg'}`}>
              <div className="flex gap-5 w-full">
                <div className="flex-1">
                  <p>Nomor</p>
                  <p>Nomor Keluhan</p>
                  <p>ID Pelanggan</p>
                  <p>Nama Pelanggan</p>
                  <p>Sumber Keluhan</p>
                  <p>Detail Sumber</p>
                </div>
                <div className="flex-1">
                  <p>{index + 1}</p>
                  <p>#{item?.nomor_keluhan}</p>
                  <p>{item?.id_pelanggan}</p>
                  <p>{item?.nama_pelanggan}</p>
                  <p>{item?.sumber?.sumber}</p>
                  <p>{item?.detail_sumber}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center rounded-xl bg-gray-300 p-2 font-bold mt-5">
          <h2>Keluhan Closed</h2>
        </div>

        <div className="flex mt-5 border-gray-300 rounded-lg flex-wrap">
          {props.keluhanLaporanLocal?.keluhan_close.map((item, index) => (
            <div key={index} className={`flex p-2 border border-gray-300 w-1/2 ${index % 2 === 0 ? 'rounded-l-lg' : 'rounded-r-lg'}`}>
              <div className="flex gap-5 w-full">
                <div className="flex-1">
                  <p>Nomor</p>
                  <p>Nomor Keluhan</p>
                  <p>ID Pelanggan</p>
                  <p>Nama Pelanggan</p>
                  <p>Sumber Keluhan</p>
                  <p>Detail Sumber</p>
                </div>
                <div className="flex-1">
                  <p>{index + 1}</p>
                  <p>#{item?.nomor_keluhan}</p>
                  <p>{item?.id_pelanggan}</p>
                  <p>{item?.nama_pelanggan}</p>
                  <p>{item?.sumber?.sumber}</p>
                  <p>{item?.detail_sumber}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center rounded-xl bg-gray-300 p-2 font-bold mt-5">
          <h2>RFO Gangguan</h2>
        </div>

        <div className="flex mt-5 border-gray-300 rounded-lg flex-wrap">
          {props.keluhanLaporanLocal?.rfo_gangguan.map((item, index) => (
            <div key={index} className={`flex p-2 border border-gray-300 w-1/2 ${index % 2 === 0 ? 'rounded-l-lg' : 'rounded-r-lg'}`}>
              <div className="flex gap-5 w-full">
                <div className="flex-1">
                  <p>Nomor</p>
                  <p>Nomor RFO Gangguan</p>
                  <p>Mulai Gangguan</p>
                  <p>Selesai Gangguan</p>
                  <p>Problem</p>
                  <p>Action</p>
                  <p>Status</p>
                </div>
                <div className="flex-1">
                  <p>{index + 1}</p>
                  <p>#{item?.nomor_rfo_gangguan}</p>
                  <p>{item?.mulai_gangguan}</p>
                  <p>{item?.selesai_gangguan}</p>
                  <p>{item?.problem}</p>
                  <p>{item?.action}</p>
                  <p>{item?.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center rounded-xl bg-gray-300 p-2 font-bold mt-5">
          <h2>Total</h2>
        </div>

        <div className="flex mt-5 border border-gray-300 rounded-lg flex-wrap">
          <div className="flex p-2 border border-gray-300 rounded-l-lg rounded-r-lg w-full">
            <div className="flex gap-5 w-full">
              <div className="flex-1">
                <p>Total Keluhan Open</p>
                <p>Total Keluhan Closed</p>
                <p>Total RFO Gangguan</p>
              </div>
              <div className="flex-1">
                <p>{props.keluhanLaporanLocal?.total_keluhan_open}</p>
                <p>{props.keluhanLaporanLocal?.total_keluhan_closed}</p>
                <p>{props.keluhanLaporanLocal?.total_rfo_gangguan}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default TemplateReport;