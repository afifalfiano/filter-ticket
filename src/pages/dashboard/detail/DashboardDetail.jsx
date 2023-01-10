/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import { HiDocumentText } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useAddReplyMutation, useComplainByIdMutation, useLampiranFileBalasanMutation } from '../../../store/features/complain/complainApiSlice';
import { selectDetailComplain, setComplainById } from '../../../store/features/complain/complainSlice';
import { selectBreadcrumb, updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import UploadFile from '../../../components/common/forms/UploadFile';
import TextEditor from '../../../components/common/forms/TextEditor';
import { ReplySchema } from '../../../utils/schema_validation_form';
import { usePostNotificationMutation, useReadAllNotificationComplainMutation, useStoreAllNotificationMutation } from '../../../store/features/notification/notificationApiSlice';
import catchError from '../../../services/catchError';
import handleResponse from '../../../services/handleResponse';

function DashboardDetail({ rfoSingle, idComplain}) {
  const location = useLocation();
  const [detailComplain, setDetailComplain] = useState(null);
  const [resetTextEditor, setResetTextEditor] = useState(false);
  const [filesLocal, setFilesLocal] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [complainById] = useComplainByIdMutation();
  const [addReply] = useAddReplyMutation();

  const dispatch = useDispatch();
  const [lampiranFileBalasan] = useLampiranFileBalasanMutation();
  const [storeAllNotification] = useStoreAllNotificationMutation();
  let [countRequest, setCountRequest] = useState(0);

  const navigasi = useSelector(selectBreadcrumb);
  const onHandleFileUpload = ($event) => {
    setFilesLocal($event);
  }

  const getComplainById = async () => {
    try {
      let idConditional;
      if (idComplain !== undefined) {
        idConditional = idComplain;
      } else {
        idConditional = id;
      }
      const data = await complainById(idConditional).unwrap();
      dispatch(setComplainById({ ...data }));
      setDetailComplain(data.data);
      if (countRequest === 0) {
        if (window.location.href.includes('/dashboard/detail/')) {
          doReadAllNotification(data.data);
        }
      }
      setCountRequest(countRequest++);
    } catch (error) {
      catchError(error, true)
    }
  };

  const { data: user } = useSelector(selectCurrentUser);
  const historyUrl = location.pathname.includes('history');
  const [postNotification] = usePostNotificationMutation();

  const [readAllNotificationComplain] = useReadAllNotificationComplainMutation()

  const doReadAllNotification = async (data) => {
    const body = {
      keluhan_id: data.id_keluhan
    };
    try {
      await readAllNotificationComplain({body}).unwrap();
      // getAllNotification();
    } catch (error) {
      catchError(error, false);
      throw new Error("Unsuccess read all notification");
    }
  }


  useEffect(() => {
      getComplainById();
      if (idComplain === undefined) {
      const data = [...navigasi.data, { path: `/dashboard/detail/${id}`, title: 'Detail Dasbor' }]
      dispatch(updateBreadcrumb(data))
        
      setTimeout(() => {
        window.scrollTo(0,document.body.scrollHeight);
      }, 500);

      const intervalId = setInterval(() => {
        getComplainById();
      }, 30000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [])

  const doPostNotification = async (keluhan_id) => {
    try {
      const body = {
        keluhan_id,
        pop_id: user.pop_id,
        id_response: 1
      }
      const data = await postNotification({ body }).unwrap();
      return data;
    } catch (error) {
      catchError(error, true);
    }
  }

  const doStoreAllNotiification = async (notifikasi_id) => {
    try {
      const body = {
        notifikasi_id,
      }
      const data = await storeAllNotification({ body }).unwrap();
      return data;
    } catch (error) {
      catchError(error, true);
    }
  }

  const onSubmitData = async (payload, resetForm) => {
    try {
      const body = {
        balasan: payload.balasan,
        user_id: user.id_user,
        keluhan_id: detailComplain.id_keluhan
      }
      const add = await addReply({ ...body });
      if (add.data.status === 'success' || add.data.status === 'Success') {
        resetForm()
        setResetTextEditor(true);
        handleResponse(add);
        if (filesLocal.length > 0) {
          const formData = new FormData();
          formData.append('balasan_id', add?.data?.id_balasan);
          for (let index = 0; index < filesLocal.length; index++) {
            formData.append(`path[${index}]`, filesLocal[index])
          }

          await lampiranFileBalasan({ body: formData }).unwrap();
        }
        const dataNotification = await doPostNotification(detailComplain.id_keluhan);
        if (dataNotification?.status === 'Success' || dataNotification?.status === 'success') {
          const dataPost = await doStoreAllNotiification(dataNotification?.notifikasi?.id_notifikasi);
          if (dataPost?.status === 'Success' || dataPost?.status === 'success') {
            getComplainById();
            setResetTextEditor(false);
          } else {
            catchError(dataPost, true);
            setResetTextEditor(false);
          }
        } else {
          setResetTextEditor(false);
          catchError(dataNotification, true);
        }
      } else {
        catchError(add, true);
      }
    } catch (error) {
      catchError(error, true);
    }
  }

  return (
    <div>
      {!rfoSingle && (
      <div className="w-full py-5 px-5 flex w-min-full bg-blue-200 rounded-md">
        <div className="flex-1 w-full">
          <table className="border-none items-center w-full">
            <tbody>
              <tr className="text-left">
                <td>Referensi Keluhan</td>
                <td>:</td>
                <td>{detailComplain?.nomor_keluhan}</td>
              </tr>
              <tr className="text-left">
                <td>Pelanggan</td>
                <td>:</td>
                <td>{detailComplain?.id_pelanggan} - {detailComplain?.nama_pelanggan}</td>
              </tr>
              <tr className="text-left">
                <td>Kontak</td>
                <td>:</td>
                <td>{detailComplain?.nama_pelapor} - {detailComplain?.nomor_pelapor}</td>
              </tr>
              <tr className="text-left">
                <td>Sumber Keluhan</td>
                <td>:</td>
                <td>{detailComplain?.sumber?.sumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex-1 w-full">
          <table className="border-none items-center w-full">
            <tbody>
              <tr className="text-left">
                <td>Waktu Dibuat</td>
                <td>:</td>
                <td>{new Date(detailComplain?.created_at).toLocaleString('id-ID')}</td>
              </tr>
              <tr className="text-left">
                <td>Waktu Diubah</td>
                <td>:</td>
                <td>
                  {detailComplain?.balasan.length > 0
                    ? new Date(detailComplain?.balasan[detailComplain.balasan.length - 1].created_at).toLocaleString('id-ID')
                    : new Date(detailComplain?.created_at).toLocaleString('id-ID')}
                </td>
              </tr>
              <tr className="text-left">
                <td>Status Keluhan</td>
                <td>:</td>
                <td>{detailComplain?.status}</td>
              </tr>
              <tr className="text-left">
                <td>Detail Sumber Keluhan</td>
                <td>:</td>
                <td>{detailComplain?.detail_sumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* section reply */}
      <div className="flex w-full flex-col py-5">
        {/* keluhan awal */}
        <div className='flex justify-center items-center gap-5'>
          <div className='w-1/12 flex items-center justify-center ml-2'>
          <div className="avatar">
          <div className={`w-16 rounded-full ring ${detailComplain?.user?.aktif ? 'ring-green-400' : 'ring-red-400'} ring-offset-base-100 ring-offset-2`}>
                <img src={detailComplain?.user?.avatar} alt={detailComplain?.user?.name}/>
                {/* <img src="https://placeimg.com/192/192/people" /> */}
              </div>
            </div>
          </div>
          <div className="w-11/12">
          <p className="justify-start w-full font-semibold">Keluhan Awal</p>
          <div className="flex justify-between py-2">
            <p>
              Dibuat oleh: 
              {detailComplain?.user?.aktif && <span className='pl-1 font-semibold'>{detailComplain?.user?.name} ({detailComplain?.user?.role?.role})</span>} 
            {!detailComplain?.user?.aktif && <span className="pl-1 text-red-600 font-semibold">{detailComplain?.user?.name} ({detailComplain?.user?.role?.role})</span>} 
            </p>
            <p>
              {new Date(detailComplain?.created_at).toLocaleString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour12: false,
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
              })}
            </p>
          </div>
          <div className="form-control">
            <div dangerouslySetInnerHTML={{__html: detailComplain?.keluhan}} className={`textarea resize-none bg-gray-100 h-auto`}/>
          </div>
          <div className="py-2">
            {detailComplain?.lampirankeluhan?.map((file, index) => {
              if (+file.keluhan_id === detailComplain?.id_keluhan) {
                return (
                  <a key={index} className="link inline" href={file.path} target="_blank" rel="noreferrer">
                    <HiDocumentText size={24} color="blue" className="inline mr-2" /> Lampiran File
                  </a>
                )
              }
            })}
          </div>
          </div>
        </div>

        {
          detailComplain?.balasan.length > 0 && detailComplain?.balasan.map((item, index) => (
            <div key={index}>
              <div className='flex justify-center items-center gap-5'>
              <div className='w-1/12 flex items-center justify-center ml-2'>
              <div className="avatar">
              <div className={`w-16 rounded-full ring ${item?.user?.aktif ? 'ring-green-400' : 'ring-red-600'} ring-offset-base-100 ring-offset-2`}>
                    <img src={item?.user?.avatar} alt={item?.user?.name}/>
                    {/* <img src="https://placeimg.com/192/192/people" /> */}
                  </div>
                </div>
              </div>
              <div className="w-11/12">
              <div className="flex justify-between py-2">
                <p>Balasan pesan: 
                  {item?.user?.aktif && <span className='pl-1 font-semibold'>{item?.user?.name} ({item?.user?.role?.role})</span>} 
                  {!item?.user?.aktif && <span className="pl-1 text-red-600 font-semibold">{item?.user?.name} ({item?.user?.role?.role})</span>} 
                </p>
                <p>
                  {new Date(item?.created_at).toLocaleString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour12: false,
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                  })}
                </p>
              </div>
              <div className="form-control">
                  <div dangerouslySetInnerHTML={{__html: item?.balasan}} className={`textarea resize-none bg-gray-100 h-auto`}/>
              </div>
              <div className="py-2">
                {item?.lampiranbalasan?.map((file, index) => {
                  if (+file.balasan_id === +item.id_balasan) {
                    return (
                      <a key={index} className="link inline" href={file.path} target="_blank" rel="noreferrer">
                        <HiDocumentText size={24} color="blue" className="inline mr-2" /> Lampiran File
                      </a>
                    )
                  }
                })}
              </div>
              </div>
              </div>
            </div>
          ))
        }

        <hr className="my-3" />
        {!historyUrl && !rfoSingle && detailComplain?.status === 'open'
          ? (
            <Formik
              enableReinitialize
              validationSchema={ReplySchema}
              initialValues={{ balasan: '' }}
              onSubmit={(values, { resetForm}) => {
                onSubmitData(values, resetForm);
              }}
            >
              {({
                values,
                errors,
                touched,
                isValid,
                setFieldValue,
                handleChange,
                handleBlur,
              }) => (
                <Form id='answer'>
                  <div className="form-control">
                    <label htmlFor="balasan" className="label">
                      <span className="label-text"> Balasan</span>
                    </label>
                    <TextEditor
                    setFieldValue={(val) => setFieldValue('balasan', val)}
                    value={values.balasan}
                    resetData={resetTextEditor}
                    />
                    {errors.balasan && touched.balasan ? (
                      <div className="label label-text text-red-500">{errors.balasan}</div>
                    ) : null}
                  </div>

                  <UploadFile getFile={onHandleFileUpload} />
                  <div className="text-center items-center justify-center mt-10">
                    <button
                      type="button"
                      className="btn btn-md mr-5"
                      onClick={() => {
                        navigate('/dashboard');
                      }}
                    >
                      Kembali
                    </button>
                    <button type="submit" className="btn btn-md btn-success text-white" disabled={!isValid}>
                      Simpan
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : !rfoSingle && (
            <div className="text-center items-center justify-center mt-10">
              <button
                type="button"
                className="btn btn-md mr-5"
                onClick={() => {
                  if (historyUrl) {
                    navigate('/history_dashboard');
                  } else {
                    navigate('/dashboard');
                  }
                }}
              >
                Kembali
              </button>
            </div>
          )}
      </div>
    </div>
  );
}

export default DashboardDetail;
