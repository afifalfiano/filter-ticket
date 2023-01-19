import { Formik, Field, Form } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './RFOMasalModal.module.css';
import { useAllRFOMasalMutation, useUpdateKeluhanRFOGangguanMutation } from '../../../store/features/rfo/rfoApiSlice';
import { setRFOMasal } from '../../../store/features/rfo/rfoSlice';
import { RFOMasalFormSchema } from '../../../utils/schema_validation_form';
import { useComplainClosedMutation } from '../../../store/features/complain/complainApiSlice';
import { setModal } from '../../../store/features/modal/modalSlice';
import handleResponse from '../../../services/handleResponse';
import catchError from '../../../services/catchError';
import { ButtonIconExit, Button } from '../../../components';

function RFOMasalModal({ stateModal, getInfo, detail }) {
  const [allRFOMasal] = useAllRFOMasalMutation()
  const [updateKeluhanRFOGangguan] = useUpdateKeluhanRFOGangguanMutation()
  const [complainClosed] = useComplainClosedMutation()
  const dispatch = useDispatch()
  const [dataRFOMasal, setDataRFOMasal] = useState([])

  const onBtnClose = () => {
    const newState = {
      ...stateModal,
      dashboard: { ...stateModal.dashboard, showRFOTroubleModal: false },
    };
    dispatch(setModal(newState));
  };
  const doGetAllRFOMasal = async (page = 1) => {
    const param = `?page=${page}`;
    try {
      const data = await allRFOMasal(param).unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        const result = data.data.data;
        dispatch(setRFOMasal({ data: result }))
        setDataRFOMasal([...result]);
      } else {
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
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
      if (data.data.status === 'success' || data.data.status === 'Success') {
        handleResponse(data);
        const closed = await complainClosed(detail.id_keluhan);
        if (closed?.data?.status === 'success' || closed?.data?.status === 'Success') {
          handleResponse(closed);
          setTimeout(async () => {
            onBtnClose();
            getInfo({ status: 'success' });
          }, 1000)
        } else {
          catchError(closed, true);
        }
      } else {
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
    }
  }
  return (
    <div className="fixed w-screen h-screen bg-opacity-80 bg-gray-700 top-0 pt-10 left-0 bottom-0 right-0 z-50 flex justify-center">
      <div className={`modal-box h-fit max-h-fit ${styles['modal-box-custom']}`}>
        <ButtonIconExit onClick={onBtnClose} />
        <h3 className="text-lg font-bold">Reason For Outage Gangguan</h3>
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
                    {dataRFOMasal?.map((item, index) => (
                      <option key={index} value={item.id_rfo_gangguan} label={item.problem}>{item.problem}</option>
                    ))}
                  </Field>
                  {errors.rfo_gangguan && touched.rfo_gangguan ? (
                    <div className="label label-text text-red-500">{errors.rfo_gangguan}</div>
                  ) : null}
                </div>
              </div>

              <hr className="my-2 mt-5" />
              <div className="modal-action justify-center">
                <Button type="button" onClick={() => onBtnClose()}>Batal</Button>
                <Button type="submit" disabled={!isValid} className="btn-success">Simpan</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RFOMasalModal;