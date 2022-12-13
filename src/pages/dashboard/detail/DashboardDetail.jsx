/* eslint-disable camelcase */
/* eslint-disable default-param-last */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { HiDocumentText, HiOutlineCloudUpload } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useAddReplyMutation, useComplainByIdMutation, useLampiranFileBalasanMutation } from '../../../store/features/complain/complainApiSlice';
import { selectDetailComplain, setComplainById } from '../../../store/features/complain/complainSlice';
import { selectBreadcrumb, updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import UploadFile from '../../../components/common/forms/UploadFile';
import { ReplySchema } from '../../../utils/schema_validation_form';
import { usePostNotificationMutation, useStoreAllNotificationMutation } from '../../../store/features/notification/notificationApiSlice';

function DashboardDetail({ rfoSingle, idComplain, showPaginate = true }) {
  console.log(idComplain, 'zuuu');
  const location = useLocation();
  console.log(location, ';loc');
  const [detailComplain, setDetailComplain] = useState(null);
  const [filesLocal, setFilesLocal] = useState([]);
  const { id } = useParams();
  console.log(id, 'param');
  const navigate = useNavigate();
  const [complainById, { ...status }] = useComplainByIdMutation();
  const [addReply, { isSuccess: isSuccessReplpy }] = useAddReplyMutation();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    currentFilterPage: 10,
    pageNumbers: [1],
  });
  const dispatch = useDispatch();
  // const doGetPageNumber = (dataFix) => {
  //   const pageNumbers = [];
  //   for (let i = 1; i <= Math.ceil(dataFix.length / pagination.currentFilterPage); i++) {
  //     pageNumbers.push(i);
  //   }
  //   setPagination({ ...pagination, pageNumbers });
  // }
  const [lampiranFileBalasan] = useLampiranFileBalasanMutation();
  const [storeAllNotification] = useStoreAllNotificationMutation();

  const detailState = useSelector(selectDetailComplain);

  const navigasi = useSelector(selectBreadcrumb);
  const onHandleFileUpload = ($event) => {
    console.log($event, 'file');
    setFilesLocal($event);
    console.log(detailState, 'cekk detail state');
  }

  const handlePagination = (targetPage = 1, data = undefined) => {
    console.log(data, 'opo ikih');
    console.log(detailState, 'opo ikih part 2');
    console.log(pagination, 'cek ombak');
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
    console.log('reply', reply);
    console.log('new state', newState);
    // console.log(newState, 'cek reply pagination');
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
        console.log(data.data, 'mantapq');
        handlePagination(1, data.data);
        console.log(idComplain, 'id aja');
        // doGetPageNumber(data.data.balasan)
      }
      console.log(data, 'data');
    } catch (err) {
      console.log(err);
    }
  };

  const { data: user } = useSelector(selectCurrentUser);
  const historyUrl = location.pathname.includes('history');
  const [postNotification] = usePostNotificationMutation();

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
        pop_id: user.pop_id
      }
      const data = await postNotification({ body }).unwrap();
      console.log(data, 'res');
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const doStoreAllNotiification = async (notifikasi_id) => {
    try {
      const body = {
        notifikasi_id,
      }
      const data = await storeAllNotification({ body }).unwrap();
      console.log(data, 'res');
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmitData = async (payload, resetForm) => {
    console.log(detailComplain, 'log');
    try {
      const body = {
        balasan: payload.balasan,
        user_id: user.id_user,
        keluhan_id: detailComplain.id_keluhan
      }
      console.log(body);
      const add = await addReply({ ...body });
      if (add.data.status === 'success') {
        resetForm()
        toast.success('Berhasil membalasa data keluhan.', {
          style: {
            padding: '16px',
            backgroundColor: '#36d399',
            color: 'white',
          },
          duration: 2000,
          position: 'top-right',
          id: 'success',
          icon: false,
        });

        if (filesLocal.length > 0) {
          const formData = new FormData();
          formData.append('balasan_id', add?.data?.id_balasan);
          for (let index = 0; index < filesLocal.length; index++) {
            formData.append(`path[${index}]`, filesLocal[index])
          }

          const dataLampiran = await lampiranFileBalasan({ body: formData }).unwrap();
          console.log(dataLampiran, 'lampiran');
        }
        const dataNotification = await doPostNotification(add?.data?.id_keluhan?.id_keluhan);
        console.log(dataNotification, 'log data notif');
        doStoreAllNotiification(dataNotification?.notifikasi?.id_notifikasi);
        getComplainById();
      } else {
        toast.error(`${add.data.message}`, {
          style: {
            padding: '16px',
            backgroundColor: '#ff492d',
            color: 'white',
          },
          duration: 2000,
          position: 'top-right',
          id: 'error',
          icon: false,
        });
      }
    } catch (error) {
      toast.error(`${error.data.message}`, {
        style: {
          padding: '16px',
          backgroundColor: '#ff492d',
          color: 'white',
        },
        duration: 2000,
        position: 'top-right',
        id: 'error',
        icon: false,
      });
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
        <div>
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
            <textarea
              className="textarea textarea-bordered h-28"
              disabled
              value={detailComplain?.keluhan}
              style={{ resize: 'none' }}
            />
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

        {
          detailComplain?.balasan.length > 0 && detailComplain?.balasan.map((item) => (
            <div>
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
                <textarea
                  className="textarea textarea-bordered h-28"
                  disabled
                  value={item?.balasan}
                  style={{ resize: 'none' }}
                />
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
              onSubmit={(values, { resetForm }) => {
                onSubmitData(values, resetForm);
              }}
            >
              {({
                values,
                errors,
                touched,
                isValid,
                handleChange,
                handleBlur,
              }) => (
                <Form>
                  <div className="form-control">
                    <label htmlFor="balasan" className="label">
                      <span className="label-text"> Balasan</span>
                    </label>

                    <Field
                      id="balasan"
                      name="balasan"
                      component="textarea"
                      placeholder="Balasan"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.balasan}
                      className="textarea textarea-bordered h-28"
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
                    <button type="submit" className="btn btn-md btn-success" disabled={!isValid}>
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
