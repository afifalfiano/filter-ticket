/* eslint-disable array-callback-return */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-alert */
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import { FormShiftSchema } from '../../../utils/schema_validation_form';
import { useCreateShiftMutation, useUpdateShiftMutation } from '../../../store/features/shift/shiftApiSlice';

function FormShift({ getInfo, detail, titleAction }) {
  console.log(detail, 'cek render');
  const [createShift] = useCreateShiftMutation();
  const [updateShift] = useUpdateShiftMutation();
  const { data: user } = useSelector(selectCurrentUser);
  const initialValues = {
    shift: detail?.shift || '',
    mulai: detail?.mulai || '',
    selesai: detail?.selesai || '',
  };

  const onSubmitData = async (payload, resetForm) => {
    const body = {
      shift: payload.shift,
      mulai: payload.mulai,
      selesai: payload.selesai,
      user_id: user.id_user,
    };
    try {
      // create
      console.log(detail, 'dt');
      if (detail === null) {
        const add = await createShift({ body });
        if (add.data.status === 'success') {
          toast.success('Berhasil tambah data Shift.', {
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
            resetForm();
            document.getElementById('my-modal-3').click();
            getInfo({ status: 'success' });
          }, 2000);
        } else {
          toast.error(add.data.message, {
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
      } else {
        // update
        const update = await updateShift({
          id: detail.id_shift,
          body: { ...body, id_shift: detail.id_shift },
        });
        console.log(body, 'body');
        if (update.data.status === 'success') {
          toast.success('Berhasil ubah data shift.', {
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
            getInfo({ status: 'success' });
            document.getElementById('my-modal-3').click();
          }, 2000);
        } else {
          toast.error(update.data.message, {
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
  };

  const onHandleReset = (reset) => {
    reset();
    document.getElementById('my-modal-3').click();
  };

  return (
    <div className="modal">
      <div className="modal-box max-w-2xl">
        <label
          htmlFor="my-modal-3"
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        <h3 className="text-lg font-bold">
          {detail === null && titleAction === 'create' ? 'Tambah Shift' : titleAction === 'update' && 'Ubah Shift'}
          {titleAction === 'read' && 'Detail Shift'}
        </h3>
        <hr className="my-2" />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={FormShiftSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmitData(values, resetForm);
          }}
        >
          {({
            values,
            errors,
            touched,
            isValid,
            handleBlur,
            handleChange,
            resetForm,
          }) => (
            <Form>
              <div className="form-control">
                <label htmlFor="shift" className="label">
                  <span className="label-text"> Nama shift:</span>
                </label>
                <Field
                  id="shift"
                  name="shift"
                  placeholder="Nomor Shift"
                  value={values.shift}
                  disabled={titleAction === 'read'}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="input input-md input-bordered  max-w-full"
                />
                {errors.shift && touched.shift ? (
                  <div className="label label-text text-red-500">{errors.shift}</div>
                ) : null}
              </div>

              <div className="form-control">
                <label htmlFor="mulai" className="label">
                  <span className="label-text"> Mulai:</span>
                </label>
                {/* <Field
                  id="mulai"
                  name="mulai"
                  component="time"
                  placeholder="Nomor mulai"
                  value={values.mulai}
                  disabled={titleAction === 'read'}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="input input-md input-bordered  max-w-full"
                /> */}
                <input type="time" name="mulai" id="mulai" disabled={titleAction === 'read'} value={values.mulai} onChange={handleChange} onBlur={handleBlur} className="input input-md input-bordered  max-w-full" />
                {errors.mulai && touched.mulai ? (
                  <div className="label label-text text-red-500">{errors.mulai}</div>
                ) : null}
              </div>

              <div className="form-control">
                <label htmlFor="selesai" className="label">
                  <span className="label-text"> Selesai:</span>
                </label>
                <input type="time" name="selesai" id="selesai" disabled={titleAction === 'read'} value={values.selesai} onChange={handleChange} onBlur={handleBlur} className="input input-md input-bordered  max-w-full" />
                {/* <Field
                  id="selesai"
                  name="selesai"
                  component="time"
                  placeholder="Nomor selesai"
                  value={values.selesai}
                  disabled={titleAction === 'read'}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="input input-md input-bordered  max-w-full"
                /> */}
                {errors.selesai && touched.selesai ? (
                  <div className="label label-text text-red-500">{errors.selesai}</div>
                ) : null}
              </div>

              <hr className="my-2 mt-10" />
              {titleAction !== 'read' && (
              <div className="modal-action justify-center">
                <button
                  type="button"
                  htmlFor="my-modal-3"
                  className="btn btn-md"
                  onClick={() => {
                    onHandleReset(resetForm);
                  }}
                >
                  Batal
                </button>
                <button
                  disabled={!isValid}
                  type="submit"
                  htmlFor="my-modal-3"
                  className="btn btn-md btn-success"
                >
                  Simpan
                </button>
              </div>
              )}
              {titleAction === 'read' && (
              <div className="modal-action justify-center">
                <button
                  type="button"
                  htmlFor="my-modal-3"
                  className="btn btn-md"
                  onClick={() => {
                    onHandleReset(resetForm);
                  }}
                >
                  Kembali
                </button>
              </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default FormShift;
