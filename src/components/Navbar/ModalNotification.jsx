import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import catchError from "../../services/catchError";
import { useGetProfileMutation, useLogoutMutation } from "../../store/features/auth/authApiSlice";
import { setLogOut } from "../../store/features/auth/authSlice";
import { clearBTS } from "../../store/features/bts/btsSlice";
import { clearComplain } from "../../store/features/complain/complainSlice";
import { clearComplainHistory } from "../../store/features/complain_history/complainHistorySlice";
import { clearModal } from "../../store/features/modal/modalSlice";
import { useGetNotificationMutation, useReadAllNotificationMutation, useReadNotificationMutation } from "../../store/features/notification/notificationApiSlice";
import { clearNotification, selectTotalCountNotification, setTotalCount } from "../../store/features/notification/notificationSlice";
import { clearPOP } from "../../store/features/pop/popSlice";
import { clearReport } from "../../store/features/report/reportSlice";
import { clearRFO } from "../../store/features/rfo/rfoSlice";
import { clearShift } from "../../store/features/shift/shiftSlice";
import { clearSumberKeluhan } from "../../store/features/sumber_keluhan/sumberKeluhanSlice";
import { clearTeam } from "../../store/features/team/teamSlice";
import { clearUsers } from "../../store/features/users/usersSlice";
import {usubscribeBeamAndLogout} from '../../utils/push_notification';

const ModalNotification = ({totalCount, data}) => {

  const [dataNotification, setDataNotification] = useState([]);
  const [getNotification ] = useGetNotificationMutation();
  const [readNotification ] = useReadNotificationMutation();
  const [readAllNotification] = useReadAllNotificationMutation();
  const [getProfile] = useGetProfileMutation();
  const dispatch = useDispatch();
  const totalCountState = useSelector(selectTotalCountNotification);
  
  const [logout] = useLogoutMutation();

  const onLogout = async (e) => {
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

        usubscribeBeamAndLogout()
        navigate('/sign_in', {replace: true});
      } else {
        catchError(userLogout, true);
      }

    } catch (error) {
      catchError(error, true);
    }
  }

  const getCurrentProfile = async () => {
    try {
      const data = await getProfile().unwrap();
      if (data.status === 'Success') {
        if(!data.data.aktif) {
          onLogout();
        }
      } else {
       catchError(data, true); 
      }
    } catch (error) {
      catchError(data, true);
    }
  }
  const getAllNotification = async () => {
    try {
      const data = await getNotification().unwrap();
      if (data?.data?.status !== 'Unauthenticated') {
        setDataNotification(data.data);
        let total = 0;
        data?.data?.forEach((item, i) => {
          if (item.is_read === false) {
            total++;
          }
        })
        setTimeout(() => {
          dispatch(setTotalCount(total));
        }, 1000);
      } else {
      catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
    }
  }

  const doReadNotification = async (id) => {
    try {
      const data = await readNotification({body: {id_notifikasiread: id } }).unwrap();
      getAllNotification();
    } catch (error) {
      catchError(error, true);
    }
  }

  const navigate = useNavigate();

  const doReadAllNotification = async () => {
    try {
      const data = await readAllNotification().unwrap();
      getAllNotification();
    } catch (error) {
      catchError(error, true);
    }
  }

  useEffect(() => {
    getAllNotification();
    const intervalId = setInterval(() => {
      getAllNotification();
      getCurrentProfile();
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [])

  const onClickNotification = (id_keluhan, id_notifikasi, title) => {
    if (title === 'unread') {
      if (id_keluhan !== null) {
        doReadNotification(id_notifikasi);
        dispatch(setTotalCount(+totalCountState - 1));
        setTimeout(() => {
          navigate(`/dashboard/detail/${id_keluhan}`);
        }, 500)
      } else {
        const response = {
          status: 500,
          data: {
            message: 'Data keluhan tidak ada.'
          }
        };
        catchError(response, true);
      }
    } else {
      if (id_keluhan !== null) {
        setTimeout(() => {
          navigate(`/dashboard/detail/${id_keluhan}`);
        }, 500)
      } else {
        const response = {
          status: 500,
          data: {
            message: 'Data keluhan tidak ada.'
          }
        };
        catchError(response, true);
      }
    }
    
  }
  
  return (
    <>
      <div
        tabIndex={0}
        className="mt-4 card card-compact dropdown-content w-56 md:w-52 lg:w-96 bg-neutral shadow"
      >
        <div className="card-body h-96">
          <span className="font-bold text-lg">Pemberitahuan ({totalCountState})</span>
          <span className="font-semibold text-md font-white cursor-pointer" onClick={() => doReadAllNotification()}>Baca semua</span>
          <div className="flex flex-col-reverse gap-3 overflow-y-auto">
          {
            dataNotification?.map((item, index) => {
                  if (item.is_read === true) {
                    return (
                      <div key={index} className="card-body bg-gray-500 rounded-md cursor-pointer" id={item.id_notifikasiread} onClick={() => onClickNotification(item.notifikasi.keluhan_id, item.id_notifikasiread, 'read')} >
                      <span className="text-base text-white">{item.notifikasi.judul}</span>
                      <span className="text-sm text-slate-200">{item.notifikasi.detail}</span>
                      <span className="text-white text-xs">{new Date(item.notifikasi.created_at).toLocaleString('id-ID')}</span>
                      </div>
          
                    )
                  } else {
                    return (
                      <div key={index} className="card-body bg-white rounded-md cursor-pointer" id={item.id_notifikasiread} onClick={() => onClickNotification(item.notifikasi.keluhan_id, item.id_notifikasiread, 'unread')} >
                      <span className="text-base text-slate-800">{item.notifikasi.judul}</span>
                      <span className="text-sm text-slate-500">{item.notifikasi.detail}</span>
                      <span className="text-slate-400 text-xs">{new Date(item.notifikasi.created_at).toLocaleString('id-ID')}</span>
                      </div>
                    )
                  }
            })
          }
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalNotification;