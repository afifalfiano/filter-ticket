import { HiQuestionMarkCircle } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { useDeleteBtsMutation } from '../../store/features/bts/btsApiSlice';
import { useDeleteComplainMutation } from '../../store/features/complain/complainApiSlice';
import { useDeletePOPMutation } from '../../store/features/pop/popApiSlice';
import { useDeleteTeamMutation } from '../../store/features/team/teamApiSlice';
import { useDeleteSumberKeluhanMutation } from '../../store/features/sumber_keluhan/sumberKeluhanApiSlice';
import { useDeleteRFOGangguanMutation } from '../../store/features/rfo/rfoApiSlice';
import { useDeleteLaporanMutation } from '../../store/features/report/reportApiSlice';
import { useDeleteShiftMutation } from '../../store/features/shift/shiftApiSlice';
import { useActivateUserMutation, useDeactivateUserMutation } from '../../store/features/users/usersApiSlice';
import { initState, setModal } from '../../store/features/modal/modalSlice';
import catchError from '../../services/catchError';
import handleResponse from '../../services/handleResponse';

function DeleteModal({ stateModal, getInfo, detail, title, message = 'Apakah anda yakin akan menghapus data', titleModal = 'Hapus Data', titleAction = 'Hapus' }) {
  const [deleteBts] = useDeleteBtsMutation();
  const [deleteComplain] = useDeleteComplainMutation();
  const [deletePOP] = useDeletePOPMutation();
  const [deleteTeam] = useDeleteTeamMutation();
  const [deleteSumberKeluhan] = useDeleteSumberKeluhanMutation();
  const [deleteRFOGangguan] = useDeleteRFOGangguanMutation();
  const [deleteLaporan] = useDeleteLaporanMutation();
  const [deleteShift] = useDeleteShiftMutation();
  const [activateUser] = useActivateUserMutation();
  const [deactivateUser] = useDeactivateUserMutation();

  const dispatch = useDispatch();
  const onBtnClose = () => {
    dispatch(setModal(initState));
  };

  const onSubmit = async () => {
    try {
      let deleteData;
      if (title === 'BTS') {
        deleteData = await deleteBts(detail.id_bts);
      } else if (title === 'keluhan') {
        deleteData = await deleteComplain(detail.id_keluhan);
      } else if (title === 'POP') {
        deleteData = await deletePOP(detail.id_pop);
      } else if (title === 'Team') {
        deleteData = await deleteTeam(detail.id_role);
      } else if (title === 'Sumber Keluhan') {
        deleteData = await deleteSumberKeluhan(detail.id_sumber);
      } else if (title === 'RFO Gangguan') {
        deleteData = await deleteRFOGangguan(detail.id_rfo_gangguan);
      } else if (title === 'laporan') {
        deleteData = await deleteLaporan(detail.id_laporan);
      } else if (title === 'Shift') {
        deleteData = await deleteShift(detail.id_shift);
      } else if (title === 'Aktifkan user') {
        deleteData = await activateUser({id: detail.id_user});
      } else if (title === 'Nonaktifkan user') {
        deleteData = await deactivateUser({id: detail.id_user});
      }
      if (deleteData?.data?.status === 'success' || deleteData?.data?.status === 'Success') {
        handleResponse(deleteData);
        setTimeout(() => {
          onBtnClose();
          getInfo({ status: 'success' });
        }, 2000);
      } else {
        catchError(deleteData, true);
      }
    } catch (error) {
      catchError(error, true);
    }
  };

  return (
    <div className="fixed w-screen h-screen bg-opacity-80 bg-gray-700 top-0 pt-10 left-0 bottom-0 right-0 z-50 flex justify-center">
      <div
        className={`modal-box h-fit max-h-fit modal-box-custom`}
      >
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onBtnClose}
        >
          ✕
        </button>
        <h3 className="text-lg font-bold">{titleModal} {title}</h3>
        <hr className="my-2" />

        <div className="flex flex-col justify-center align-middle items-center">
          <HiQuestionMarkCircle size={50} color="#FF2E00" />

          <p className="py-4">{message} {title}?</p>
        </div>

        <hr className="my-2 mt-5" />
        <div className="modal-action justify-center">
          <button className="btn btn-md" onClick={onBtnClose}>
            Batal
          </button>
          <button
            onClick={onSubmit}
            type="submit"
            htmlFor="my-modal-delete"
            className="btn btn-md btn-error text-white"
          >
            {titleAction}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
