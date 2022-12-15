/* eslint-disable */

import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import catchError from "../../services/catchError";
import { selectCurrentUser } from "../../store/features/auth/authSlice";
import { useGetNotificationMutation, useReadAllNotificationMutation, useReadNotificationMutation } from "../../store/features/notification/notificationApiSlice";
import { selectAllNotification, selectTotalCountNotification, setTotalCount } from "../../store/features/notification/notificationSlice";

const ModalNotification = ({totalCount, data}) => {

  console.log(data, 'data nihhhhh')
  const [dataNotification, setDataNotification] = useState([]);
  const [getNotification ] = useGetNotificationMutation();
  const [readNotification ] = useReadNotificationMutation();
  const [readAllNotification] = useReadAllNotificationMutation();
  const {data: user} = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const totalCountState = useSelector(selectTotalCountNotification);
  
  const getAllNotification = async () => {
    try {
      const data = await getNotification().unwrap();
      console.log(data, 'data notif');
      setDataNotification(data.data);
      let total = 0;
      data.data.forEach((item, i) => {
        if (item.is_read === false) {
          total++;
        }
      })
      setTimeout(() => {
        dispatch(setTotalCount(total));
        console.log(total, 'ini totalnya');
      }, 1000);
    } catch (error) {
      console.log(error, 'error');
    }
  }

  const doReadNotification = async (id) => {
    try {
      const data = await readNotification({body: {id_notifikasiread: id } }).unwrap();
      console.log(data, 'success read');
      getAllNotification();
    } catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate();

  const doReadAllNotification = async () => {
    try {
      const data = await readAllNotification().unwrap();
      console.log(data, 'success read all');
      getAllNotification();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllNotification();
    const intervalId = setInterval(() => {
      getAllNotification();
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [])

  const onClickNotification = (id_keluhan, id_notifikasi, title) => {
    console.log(id_keluhan, id_notifikasi, title, 'cek click');
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
        catchError(response);
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
        catchError(response);
      }
    }
    
  }
  
  return (
    <>
      <div
        tabIndex={0}
        className="mt-3 card card-compact dropdown-content w-96 bg-neutral shadow"
      >
        <div className="card-body" style={{height: '700px'}}>
          <span className="font-bold text-lg">Pemberitahuan ({totalCountState})</span>
          <span className="font-semibold text-md font-white cursor-pointer" onClick={() => doReadAllNotification()}>Baca semua</span>
          <div className="flex flex-col-reverse gap-3 overflow-y-auto">
          {
            dataNotification?.map((item) => {
              // const index = item.notifikasi_read.findIndex(item => +item.user_id === +user.id_user);
              // console.log(index, 'ketemu');
                  if (item.is_read === true) {
                    return (
                      <div className="card-body bg-gray-500 rounded-md cursor-pointer" id={item.id_notifikasiread} onClick={() => onClickNotification(item.notifikasi.keluhan_id, item.id_notifikasiread, 'read')} >
                      <span className="text-base text-white">{item.notifikasi.judul}</span>
                      <span className="text-sm text-slate-200">{item.notifikasi.detail}</span>
                      <span className="text-white text-xs">{new Date(item.notifikasi.created_at).toLocaleString('id-ID')}</span>
                      </div>
          
                    )
                  } else {
                    return (
                      <div className="card-body bg-white rounded-md cursor-pointer" id={item.id_notifikasiread} onClick={() => onClickNotification(item.notifikasi.keluhan_id, item.id_notifikasiread, 'unread')} >
                      <span className="text-base text-slate-800">{item.notifikasi.judul}</span>
                      <span className="text-sm text-slate-500">{item.notifikasi.detail}</span>
                      <span className="text-slate-400 text-xs">{new Date(item.notifikasi.created_at).toLocaleString('id-ID')}</span>
                      </div>
                    )
                  }
            })
          }
          </div>
          {/* {data.length === 0 && (
            <div className="card-body bg-white rounded-md text-center">
            <span className="text-base text-gray-900">Tidak ada pemberitahuan</span>
            </div>
          )} */}
            {/* <div className="card-body bg-white rounded-md">
            <span className="text-base text-gray-900">Comming Soon...</span>
            </div>
            <div className="card-body bg-white rounded-md">
            <span className="text-base text-gray-900">Comming Soon...</span>
            </div>
            <div className="card-body bg-white rounded-md">
            <span className="text-base text-gray-900">Comming Soon...</span>
            </div> */}
          {/* <div className="card-actions mt-3">
            <button className="btn btn-primary btn-block btn-sm">Lihat Semua</button>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default ModalNotification;