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
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import { useAddSumberKeluhanMutation, useUpdateSumberKeluhanMutation } from '../../../store/features/sumber_keluhan/sumberKeluhanApiSlice';
import { FormSumberKeluhanSchema } from '../../../utils/schema_validation_form';

function FormSumberKeluhan({ getInfo, detail, titleAction }) {
  console.log(detail, 'cek render');
  const [addSumberKeluhan] = useAddSumberKeluhanMutation();
  const [updateSumberKeluhan] = useUpdateSumberKeluhanMutation();
  const { data: user } = useSelector(selectCurrentUser);
  const initialValues = {
    sumber: detail?.sumber || '',
  };

  const onSubmitData = async (payload, resetForm) => {
    const body = {
      sumber: payload.sumber,
      user_id: user.id_user,
    };
    try {
      // create
      console.log(detail, 'dt');
      if (detail === null) {
        const add = await addSumberKeluhan({ ...body });
        if (add.data.status === 'success') {
          toast.success('Berhasil tambah data Sumber.', {
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
        const update = await updateSumberKeluhan({
          id: detail.id_sumber,
          body: { ...body, id_sumber: detail.id_sumber },
        });
        console.log(body, 'body');
        if (update.data.status === 'success') {
          toast.success('Berhasil ubah data Sumber.', {
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
          {detail === null && titleAction === 'create' ? 'Tambah Sumber' : titleAction === 'update' && 'Ubah Sumber'}
          {titleAction === 'read' && 'Detail Sumber'}
        </h3>
        <hr className="my-2" />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={FormSumberKeluhanSchema}
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
                <label htmlFor="sumber" className="label">
                  <span className="label-text"> Nama Sumber:</span>
                </label>
                <Field
                  id="sumber"
                  name="sumber"
                  placeholder="Nama Sumber"
                  value={values.sumber}
                  disabled={titleAction === 'read'}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="input input-md input-bordered  max-w-full"
                />
                {errors.sumber && touched.sumber ? (
                  <div className="label label-text text-red-500">{errors.sumber}</div>
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

export default FormSumberKeluhan;