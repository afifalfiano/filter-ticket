/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import { HiDocumentText } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { useAddReplyMutation, useComplainByIdMutation, useLampiranFileBalasanMutation } from '../../../store/features/complain/complainApiSlice';
import { selectDetailComplain, setComplainById } from '../../../store/features/complain/complainSlice';
import { selectBreadcrumb, updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import UploadFile from '../../../components/common/forms/UploadFile';
import TextEditor from '../../../components/common/forms/TextEditor';
import { ReplySchema } from '../../../utils/schema_validation_form';
import { usePostNotificationMutation, useReadAllNotificationComplainMutation, useReadAllNotificationMutation, useStoreAllNotificationMutation } from '../../../store/features/notification/notificationApiSlice';
import catchError from '../../../services/catchError';
import handleResponse from '../../../services/handleResponse';
import { ContentState, convertFromRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

function DashboardDetail({ rfoSingle, idComplain, showPaginate = true }) {
  const location = useLocation();
  const [detailComplain, setDetailComplain] = useState(null);
  const [resetTextEditor, setResetTextEditor] = useState(false);
  const [filesLocal, setFilesLocal] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [complainById] = useComplainByIdMutation();
  const [addReply] = useAddReplyMutation();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    currentFilterPage: 10,
    pageNumbers: [1],
  });
  const dispatch = useDispatch();
  const [lampiranFileBalasan] = useLampiranFileBalasanMutation();
  const [storeAllNotification] = useStoreAllNotificationMutation();
  let [countRequest, setCountRequest] = useState(0);

  const detailState = useSelector(selectDetailComplain);

  const navigasi = useSelector(selectBreadcrumb);
  const onHandleFileUpload = ($event) => {
    setFilesLocal($event);
  }

  const handlePagination = (targetPage = 1, data = undefined) => {
    const indexOfLastPost = targetPage * pagination.currentFilterPage;
    const indexOfFirstPost = indexOfLastPost - pagination.currentFilterPage;
    let reply;
    let newState;
    if (data === undefined) {
      reply = detailState.balasan.slice(indexOfFirstPost, indexOfLastPost);
      newState = { ...detailState, balasan: reply }
    } else {
      reply = data.balasan.slice(indexOfFirstPost, indexOfLastPost);
      newState = { ...data, balasan: reply }
    }
    const pageNumbers = [];
    let dataSource = [];
    if (data === undefined) {
      dataSource = detailState.balasan;
    } else {
      dataSource = data.balasan;
    }
    for (let i = 1; i <= Math.ceil(dataSource.length / pagination.currentFilterPage); i++) {
      pageNumbers.push(i);
    }
    setPagination({ ...pagination, currentPage: +targetPage, pageNumbers })
    setDetailComplain(newState);
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
      if (showPaginate) {
        handlePagination(1, data.data);
      }
      if (countRequest === 0) {
        if (window.location.href.includes('/dashboard/detail/')) {
          doReadAllNotification(data.data);
        }
      }
      setCountRequest(countRequest++);
    } catch (error) {
      catchError(error)
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
      catchError(error, 'read-all');
      throw new Error("Unsuccess read all notification");
    }
  }

  useEffect(() => {
      getComplainById();
      if (idComplain === undefined) {
      const data = [...navigasi.data, { path: `/dashboard/detail/${id}`, title: 'Detail Dasbor' }]
      dispatch(updateBreadcrumb(data))

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
      catchError(error);
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
      catchError(error);
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
            catchError(dataPost);
            setResetTextEditor(false);
          }
        } else {
          setResetTextEditor(false);
          catchError(dataNotification);
        }
      } else {
        catchError(add);
      }
    } catch (error) {
      catchError(error);
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
              <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={detailComplain?.user?.avatar} alt={detailComplain?.user?.name}/>
                {/* <img src="https://placeimg.com/192/192/people" /> */}
              </div>
            </div>
          </div>
          <div className="w-11/12">
          <p className="justify-start w-full font-semibold">Keluhan Awal</p>
          <div className="flex justify-between py-2">
            <p>Dibuat oleh: {detailComplain?.user?.name} ({detailComplain?.user?.role?.role}) </p>
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
            {/* <textarea
              className={`textarea textarea-bordered resize-none ${detailComplain?.keluhan.length > 1500 ? 'h-96' : 'h-28'}`}
              disabled
              value={detailComplain?.keluhan}
            /> */}
            <div dangerouslySetInnerHTML={{__html: detailComplain?.keluhan}} className={`textarea resize-none bg-gray-100 h-auto`}/>
          </div>
          <div className="py-2">
            {detailComplain?.lampiranbalasan?.map((file) => {
              if (+file.balasan_id === +item.id_balasan) {
                return (
                  <a className="link inline" href={file.path} target="_blank" rel="noreferrer">
                    <HiDocumentText size={24} color="blue" className="inline mr-2" /> Lampiran File
                  </a>
                )
              }
            })}
          </div>
          </div>
        </div>

        {
          detailComplain?.balasan.length > 0 && detailComplain?.balasan.map((item) => (
            <div>
              <div className='flex justify-center items-center gap-5'>
              <div className='w-1/12 flex items-center justify-center ml-2'>
              <div className="avatar">
                  <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={item?.user?.avatar} alt={item?.user?.name}/>
                    {/* <img src="https://placeimg.com/192/192/people" /> */}
                  </div>
                </div>
              </div>
              <div className="w-11/12">
              <div className="flex justify-between py-2">
                <p>Balasan pesan: {item?.user?.name} ({item?.user?.role?.role}) </p>
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
                {/* <textarea
                  className={`textarea textarea-bordered resize-none ${item?.balasan.length > 1500 ? 'h-96' : 'h-28'}`}
                  disabled
                  value={item?.balasan}
                /> */}
                  <div dangerouslySetInnerHTML={{__html: item?.balasan}} className={`textarea resize-none bg-gray-100 h-auto`}/>
              </div>
              <div className="py-2">
                {item?.lampiranbalasan?.map((file) => {
                  if (+file.balasan_id === +item.id_balasan) {
                    return (
                      <a className="link inline" href={file.path} target="_blank" rel="noreferrer">
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

        {showPaginate && (
        <div className="flex justify-center">
          <div className="btn-group">
            {pagination.pageNumbers?.map((item) => (
              <button className={`btn btn-outline ${+pagination.currentPage === item && 'btn-active'}`} onClick={(e) => handlePagination(e.target.id, undefined)} id={item}>{item}</button>
            ))}
          </div>
        </div>
        )}

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
                <Form>
                  <div className="form-control">
                    <label htmlFor="balasan" className="label">
                      <span className="label-text"> Balasan</span>
                    </label>

                    {/* <Field
                      id="balasan"
                      name="balasan"
                      component="textarea"
                      placeholder="Balasan"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.balasan}
                      className="textarea textarea-bordered h-28"
                    /> */}
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
