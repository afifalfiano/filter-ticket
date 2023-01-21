import { useDispatch } from "react-redux";
import { Button, ButtonIconExit } from "../../../components";
import { setModal } from "../../../store/features/modal/modalSlice";

function ReportDetail({ stateModal, detailData }) {
  const dispatch = useDispatch()
  const onBtnClose = () => {
    const newState = {
      ...stateModal,
      report: { ...stateModal.report, showDetailModalReport: false },
    };
    dispatch(setModal(newState));
  };

  return (
    <div className="fixed w-screen h-screen bg-opacity-80 bg-gray-700 top-0 left-0 bottom-0 right-0 z-50 flex justify-center">
      <div className="modal-box h-fit max-h-fit max-w-xl">
        <ButtonIconExit onClick={onBtnClose} />

        <h3 className="text-lg font-bold">
          Detail Laporan
        </h3>
        <hr className="my-2" />
        <div className="overflow-x-auto">
          <table className="table w-full border-0">
            <thead>
              <tr />
            </thead>
            <tbody>
              <tr>
                <th>Tanggal</th>
                <td>:</td>
                <td>{detailData?.tanggal || '-'}</td>
              </tr>
              <tr>
                <th>Shift</th>
                <td>:</td>
                <td>{`${detailData?.shift.shift} (${detailData?.shift.mulai}) - (${detailData?.shift.selesai})` || '-'}</td>
              </tr>
              <tr>
                <th>Petugas NOC</th>
                <td>:</td>
                <td>{detailData?.noc || '-'}</td>
              </tr>
              <tr>
                <th>Petugas HELPDESK</th>
                <td>:</td>
                <td>{detailData?.helpdesk || '-'}</td>
              </tr>
              <tr>
                <th>POP</th>
                <td>:</td>
                <td>{detailData?.pop.pop || '-'}</td>
              </tr>
              <tr>
                <th>File Laporan</th>
                <td>:</td>
                <td><a href={detailData?.lampiran_laporan} className="link link-hover" target="_blank" rel="noreferrer">Download file</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr className="my-2 mt-10" />
        <div className="modal-action justify-center">
          <Button type="button" onClick={() => onBtnClose()} >Kembali</Button>
        </div>
      </div>
    </div>
  )
}

export default ReportDetail;