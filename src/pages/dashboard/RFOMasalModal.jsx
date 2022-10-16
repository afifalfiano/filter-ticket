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
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './RFOMasalModal.module.css';
import { useAllRFOMasalMutation } from '../../store/features/rfo/rfoApiSlice';
import { selectAllRFOMasal, setRFOMasal } from '../../store/features/rfo/rfoSlice';

function RFOMasalModal({ getInfo, detail }) {
  const [allRFOMasal] = useAllRFOMasalMutation()
  const dispatch = useDispatch()
  const dataRFOMasal = useSelector(selectAllRFOMasal);

  const doGetAllRFOMasal = async () => {
    try {
      const data = await allRFOMasal();
      if (data.data.status === 'success') {
        dispatch(setRFOMasal({ ...data.data }))
        console.log(dataRFOMasal, 'msl');
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
      };
      //   const rfoMasal = await rfoMasalKeluhan(body);
      let rfoMasal;
      console.log(rfoMasal, 'res');
      if (rfoMasal.data.status === 'success') {
        toast.success('Berhasil membuat akun baru.', {
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

        setTimeout(() => {
          document.getElementById('my-modal-rfo-masal').click();
          getInfo({ status: 'success' });
        }, 2000)
      } else {
        toast.error(`${rfoMasal.data.message}`, {
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
          initialValues={{ rfo_gangguan: '' }}
          onSubmit={(values, { resetForm }) => {
            onSubmitData(values);
          }}
        >
          {({
            values,
            errors,
            isSubmitting,
            isValid,
            setFieldValue,
            handleChange,
            resetForm,
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
                    value={values.rfo_gangguan}
                    className="select w-full max-w-full input-bordered"
                  >
                    <option value="1">Fiber Optik Mati</option>
                    <option value="2">Tower Rusak</option>
                  </Field>
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