import { HiQuestionMarkCircle } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { clearModal, initState, setModal } from '../../store/features/modal/modalSlice';
import catchError from '../../services/catchError';
import handleResponse from '../../services/handleResponse';
import { useChangePasswordMutation, useLogoutMutation } from '../../store/features/auth/authApiSlice';
import { clearBTS } from '../../store/features/bts/btsSlice';
import { clearComplain } from '../../store/features/complain/complainSlice';
import { clearComplainHistory } from '../../store/features/complain_history/complainHistorySlice';
import { clearNotification } from '../../store/features/notification/notificationSlice';
import { clearReport } from '../../store/features/report/reportSlice';
import { clearRFO } from '../../store/features/rfo/rfoSlice';
import { clearShift } from '../../store/features/shift/shiftSlice';
import { clearSumberKeluhan } from '../../store/features/sumber_keluhan/sumberKeluhanSlice';
import { clearUsers } from '../../store/features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { setLogOut } from '../../store/features/auth/authSlice';
import { clearPOP } from '../../store/features/pop/popSlice';
import { clearTeam } from '../../store/features/team/teamSlice';

function ModalProfile({ stateModal, getInfo, detail, title, payload }) {

  const [changePassword,] = useChangePasswordMutation();
  const dispatch = useDispatch();
  const onBtnClose = () => {
    dispatch(setModal(initState));
  };

  const navigate = useNavigate();


  const [logout] = useLogoutMutation();

  const onSubmitLogout = async (e) => {
    try {
      const userLogout = await logout().unwrap();
      if (userLogout?.status === 'success' || userLogout?.status === 'Success') {
        dispatch((action) => {
          action(setLogOut());
          action(clearBTS());
          action(clearComplain());
          action(clearComplainHistory());
          action(clearModal());
          action(clearNotification());
          action(clearPOP());
          action(clearReport());
          action(clearRFO());
          action(clearShift());
          action(clearSumberKeluhan());
          action(clearTeam());
          action(clearUsers());
        });
        localStorage.clear();
        navigate('/sign_in', {replace: true});
      } else {
        catchError(userLogout, true);
      }

    } catch (error) {
      catchError(error, true);
    }

  }

  const onSubmitDataChangePassword = async (payload) => {
    try {
      // create
      let body;
      if (payload.password.trim().length > 0 && payload.password_confirmation.trim().length > 0) {
        body = {
          name: payload.name,
          pop_id: payload.pop_id,
          role_id: payload?.role_id,
          email: payload.email,
          password: payload.password,
          password_confirmation: payload.password_confirmation,
        };
      } else {
        body = {
          name: payload.name,
          pop_id: payload.pop_id,
          role_id: payload?.role_id,
          email: payload.email,
        };
      }
      const data = await changePassword(body).unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        handleResponse(data);
        setTimeout(() => {
            onSubmitLogout();
        }, 1000)
      } else {
        catchError(data, true);
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
        <h3 className="text-lg font-bold">Ganti Password</h3>
        <hr className="my-2" />

        <div className="flex flex-col justify-center align-middle items-center">
          <HiQuestionMarkCircle size={50} color="#FF2E00" />

          <p className="py-4">Apakah anda yakin akan mengganti password akun? Jika ya, maka secara otomatis akun anda akan logout.</p>
        </div>

        <hr className="my-2 mt-5" />
        <div className="modal-action justify-center">
          <button className="btn btn-md" onClick={onBtnClose}>
            Batal
          </button>
          <button
            onClick={() => onSubmitDataChangePassword(payload)}
            type="submit"
            className="btn btn-md btn-error text-white"
          >
            Ya
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalProfile;
