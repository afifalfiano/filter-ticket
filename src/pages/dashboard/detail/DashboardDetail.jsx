/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useAddReplyMutation, useComplainByIdMutation, useLampiranFileBalasanMutation } from '../../../store/features/complain/complainApiSlice';
import { setComplainById } from '../../../store/features/complain/complainSlice';
import { selectBreadcrumb, updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import { ReplySchema } from '../../../utils/schema_validation_form';
import { usePostNotificationMutation, useReadAllNotificationComplainMutation, useStoreAllNotificationMutation } from '../../../store/features/notification/notificationApiSlice';
import catchError from '../../../services/catchError';
import handleResponse from '../../../services/handleResponse';
import { Button, Progress, FirstComplain, SectionInformation, UploadFile, TextEditor } from '../../../components';

function DashboardDetail({ rfoSingle, idComplain }) {
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
      await readAllNotificationComplain({ body }).unwrap();
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
        window.scrollTo(0, document.body.scrollHeight);
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
      {!rfoSingle && <SectionInformation detailComplain={detailComplain} />}

      <div className="flex w-full flex-col py-5">
        <FirstComplain detailComplain={detailComplain} />
        <hr />

        {
          detailComplain?.balasan?.length > 0 && detailComplain?.balasan?.map((item, index) => (
            <Progress item={item} key={index} />
          ))
        }

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
                setFieldValue
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
                    <Button className={`mr-5`} onClick={() => navigate('/dashboard')}>Kembali</Button>
                    <Button type={"submit"} disabled={!isValid} className={`btn-success`}>Simpan</Button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : !rfoSingle && (
            <div className="text-center items-center justify-center mt-10">
              <Button className={`mr-5`} onClick={() => historyUrl ? navigate('/history_dashboard') : navigate('/dashboard')}>Kembali</Button>
            </div>
          )}
      </div>
    </div>
  );
}

export default DashboardDetail;
