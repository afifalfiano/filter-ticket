/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable import/no-duplicates */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-template */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import toast, { Toaster } from 'react-hot-toast';
import { Formik, Field, Form } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import styles from './RFOMasalModal.module.css';
import { useAllRFOMasalMutation, useUpdateKeluhanRFOGangguanMutation } from '../../../store/features/rfo/rfoApiSlice';
import { selectAllRFOMasal, setRFOMasal } from '../../../store/features/rfo/rfoSlice';
import { RFOMasalFormSchema } from '../../../utils/schema_validation_form';
import { useComplainClosedMutation } from '../../../store/features/complain/complainApiSlice';

function RFOMasalModal({ getInfo, detail }) {
  const [allRFOMasal] = useAllRFOMasalMutation()
  const [updateKeluhanRFOGangguan] = useUpdateKeluhanRFOGangguanMutation()
  const [complainClosed] = useComplainClosedMutation()
  const dispatch = useDispatch()
  const [dataRFOMasal, setDataRFOMasal] = useState([])

  const doGetAllRFOMasal = async () => {
    try {
      const data = await allRFOMasal();
      console.log(data, 'ms zl');
      if (data.data.status === 'success') {
        dispatch(setRFOMasal({ ...data.data }))
        setDataRFOMasal([...data.data.data]);
        console.log(data.data.data, 'cekkkz');
        console.log(dataRFOMasal, 'hee');
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    doGetAllRFOMasal();
  }, [])

  const onSubmitData = async (payload) => {
    try {
      // create
      const body = {
        rfo_gangguan_id: payload.rfo_gangguan
      };
      const data = await updateKeluhanRFOGangguan({ id: detail.id_keluhan, body });
      console.log(data, 'res');
      if (data.data.status === 'success') {
        toast.success(data.data.message, {
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

        setTimeout(async () => {
          const closed = await complainClosed(detail.id_keluhan);
          console.log(closed, 'cls');
          if (closed?.data?.status === 'success') {
            toast.success('Data Keluhan Berhasil Ditutup.', {
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

            setTimeout(async () => {
              document.getElementById('my-modal-rfo-masal').click();
              getInfo({ status: 'success' });
            }, 1000)
          } else {
            toast.error(`${closed?.data?.message}`, {
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
          console.log(closed, 'cek');
        }, 1000);

        // setTimeout(() => {
        //   document.getElementById('my-modal-rfo-masal').click();
        //   getInfo({ status: 'success' });
        // }, 2000)
      } else {
        toast.error(`${data.data.message}`, {
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
      console.log(error);
      toast.error(error.data.message, {
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
  console.log(detail, 'masal');
  return (
    <div className="modal">
      <div className={`${styles['modal-box-custom']}`}>
        <label
          htmlFor="my-modal-rfo-masal"
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        <h3 className="text-lg font-bold">Reason of Outage Masal</h3>
        <hr className="my-2" />

        <div className="w-full py-5 px-5 flex w-min-full bg-blue-200 rounded-md mt-5">
          <div className="w-full">
            <table className="border-none items-center w-full">
              <tbody>
                <tr className="text-left">
                  <td>Referensi Keluhan</td>
                  <td>:</td>
                  <td>{detail?.nomor_keluhan}</td>
                </tr>
                <tr className="text-left">
                  <td>Pelanggan</td>
                  <td>:</td>
                  <td>{detail?.id_pelanggan} - {detail?.nama_pelanggan}</td>
                </tr>
                <tr className="text-left">
                  <td>Kontak</td>
                  <td>:</td>
                  <td>{detail?.nama_pelapor} - {detail?.nomor_pelapor}</td>
                </tr>
                <tr className="text-left">
                  <td>Waktu Dibuat</td>
                  <td>:</td>
                  <td>{new Date(detail?.created_at).toLocaleString('id-ID')}</td>
                </tr>
                <tr className="text-left">
                  <td>Waktu Diubah</td>
                  <td>:</td>
                  <td>
                    {detail?.balasan.length > 0
                      ? new Date(detail?.balasan[detail.balasan.length - 1]?.created_at).toLocaleString('id-ID')
                      : new Date(detail?.created_at).toLocaleString('id-ID')}
                  </td>
                </tr>
                <tr className="text-left">
                  <td>Status Keluhan</td>
                  <td>:</td>
                  <td>{detail?.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <Formik
          enableReinitialize
          validationSchema={RFOMasalFormSchema}
          initialValues={{ rfo_gangguan: '' }}
          onSubmit={(values, { resetForm }) => {
            onSubmitData(values);
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
              <div className="mt-2">
                <div className="form-control">
                  <label htmlFor="rfo_gangguan" className="label">
                    <span className="label-text"> Topik RFO Gangguan Masal</span>
                  </label>

                  <Field
                    component="select"
                    id="rfo_gangguan"
                    name="rfo_gangguan"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.rfo_gangguan}
                    className="select w-full max-w-full input-bordered"
                  >
                    <option value="">Pilih RFO Gangguan</option>
                    {dataRFOMasal?.map((item) => (
                      <option value={item.id_rfo_gangguan} label={item.problem}>{item.problem}</option>
                    ))}
                  </Field>
                  {errors.rfo_gangguan && touched.rfo_gangguan ? (
                    <div className="label label-text text-red-500">{errors.rfo_gangguan}</div>
                  ) : null}
                </div>
              </div>

              <hr className="my-2 mt-5" />
              <div className="modal-action justify-center">
                <label htmlFor="my-modal-rfo-masal" className="btn btn-md">
                  Batal
                </label>
                <button
                  type="submit"
                  htmlFor="my-modal-rfo-masal"
                  className="btn btn-md btn-success"
                  disabled={!isValid}
                >
                  Simpan
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RFOMasalModal;