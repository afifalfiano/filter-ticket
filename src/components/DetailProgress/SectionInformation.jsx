

function SectionInformation({...props}) {
    return (
        <div className="w-full py-5 px-5 flex-col gap-3 lg:flex-row md:gap-0 flex w-min-full bg-blue-200 rounded-md">
        <div className="flex-1 w-full">
          <table className="border-none items-center w-full">
            <tbody>
              <tr className="text-left">
                <td className="w-36 md:w-52 lg:w-auto">Referensi Keluhan</td>
                <td>:</td>
                <td>{props?.detailComplain?.nomor_keluhan}</td>
              </tr>
              <tr className="text-left">
                <td className="w-36 md:w-52 lg:w-auto">Pelanggan</td>
                <td>:</td>
                <td>{props?.detailComplain?.id_pelanggan} - {props?.detailComplain?.nama_pelanggan}</td>
              </tr>
              <tr className="text-left">
                <td className="w-36 md:w-52 lg:w-auto">Kontak</td>
                <td>:</td>
                <td>{props?.detailComplain?.nama_pelapor} - {props?.detailComplain?.nomor_pelapor}</td>
              </tr>
              <tr className="text-left">
                <td className="w-36 md:w-52 lg:w-auto">Sumber Keluhan</td>
                <td>:</td>
                <td>{props?.detailComplain?.sumber?.sumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex-1 w-full">
          <table className="border-none items-center w-full">
            <tbody>
              <tr className="text-left">
                <td className="w-36 md:w-52 lg:w-auto">Waktu Dibuat</td>
                <td>:</td>
                <td>{new Date(props?.detailComplain?.created_at).toLocaleString('id-ID')}</td>
              </tr>
              <tr className="text-left">
                <td className="w-36 md:w-52 lg:w-auto">Waktu Diubah</td>
                <td>:</td>
                <td>
                  {props?.detailComplain?.balasan.length > 0
                    ? new Date(props?.detailComplain?.balasan[props?.detailComplain.balasan.length - 1].created_at).toLocaleString('id-ID')
                    : new Date(props?.detailComplain?.created_at).toLocaleString('id-ID')}
                </td>
              </tr>
              <tr className="text-left">
                <td className="w-36 md:w-52 lg:w-auto">Status Keluhan</td>
                <td>:</td>
                <td>{props?.detailComplain?.status}</td>
              </tr>
              <tr className="text-left">
                <td className="w-36 md:w-52 lg:w-auto">Detail Sumber Keluhan</td>
                <td>:</td>
                <td>{props?.detailComplain?.detail_sumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
}


export default SectionInformation;