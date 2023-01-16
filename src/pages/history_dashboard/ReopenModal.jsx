import {
  HiExclamation,
} from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { useComplainHistoryReopenMutation } from '../../store/features/complain_history/complainHistoryApiSlice';
import styles from './ReopenModal.module.css';
import { useDeleteRFOKeluhanMutation } from '../../store/features/rfo/rfoApiSlice';
import { initState, setModal } from '../../store/features/modal/modalSlice';
import catchError from '../../services/catchError';
import handleResponse from '../../services/handleResponse';

function ReopenModal({ stateModal, getInfo, detail }) {
  const [complainHistoryReopen] = useComplainHistoryReopenMutation()
  const [deleteRFOKeluhan] = useDeleteRFOKeluhanMutation();

  const dispatch = useDispatch();
  const onBtnClose = () => {
    dispatch(setModal(initState));
  };
  const onSubmit = async () => {
    try {
      if (detail.rfo_keluhan_id !== null) {
        const reopenComplain = await complainHistoryReopen(detail.id_keluhan);
        if (reopenComplain.data.status === 'success' || reopenComplain.data.status === 'Success') {
          handleResponse(reopenComplain);
          const deleteKeluhan = await deleteRFOKeluhan(detail.rfo_keluhan_id);
          if (deleteKeluhan.data.status === 'success' || deleteKeluhan.data.status === 'Success') {
            setTimeout(() => {
              dispatch(setModal(initState));
              getInfo({ status: 'success' });
            }, 2000);
          } else {
            catchError(deleteKeluhan, true);
          }
        } else {
          catchError(reopenComplain, true);
        }
      } else {
        const reopenComplain = await complainHistoryReopen(detail.id_keluhan);

        if (reopenComplain.data.status === 'success' || reopenComplain.data.status === 'Success') {
          handleResponse(reopenComplain);
          setTimeout(() => {
            dispatch(setModal(initState));
            getInfo({ status: 'success' });
          }, 2000);
        } else {
          catchError(reopenComplain, true);
        }
      }
    } catch (error) {
      catchError(error, true);
    }
  };

  return (
    <div className="fixed w-screen h-screen bg-opacity-80 bg-gray-700 top-0 pt-10 left-0 bottom-0 right-0 z-50 flex justify-center">
      <div className={`modal-box h-fit max-h-fit ${styles['modal-box-custom']}`}>
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onBtnClose}
        >
          ✕
        </button>
        <h3 className="text-lg font-bold">Konfirmasi Data Keluhan</h3>
        <hr className="my-2" />

        <div className="flex flex-col justify-center align-middle items-center">
          <HiExclamation size={50} color="#FF2E00" />

          <span className="py-4 text-center">
            Apakah anda yakin mengembalikan status data keluhan dari
            &nbsp;
            <strong>closed</strong>
            &nbsp; menjadi &nbsp;
            <strong>open ?</strong>
          </span>
        </div>

        <hr className="my-2 mt-5" />
        <div className="modal-action justify-center">
          <button htmlFor="my-modal-revert" className="btn btn-md  w-32" onClick={onBtnClose}>
            Batal
          </button>
          <button htmlFor="my-modal-revert" onClick={onSubmit} className="btn btn-md  w-32 btn-error text-white">
            Kembalikan
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReopenModal;