/* eslint-disable max-len */
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
import { useAddPOPMutation, useUpdatePOPMutation } from '../../../store/features/pop/popApiSlice';
import { FormPOPSchema } from '../../../utils/schema_validation_form';
import { setModal } from '../../../store/features/modal/modalSlice';

function FormPOP({ stateModal, getInfo, detail, titleAction }) {
  console.log(detail, 'cek render');
  const [addPOP] = useAddPOPMutation();
  const [updatePOP] = useUpdatePOPMutation();
  const { data: user } = useSelector(selectCurrentUser);
  const initialValues = {
    pop: detail?.pop || '',
  };

  const dispatch = useDispatch();

  const onBtnClose = () => {
    const newState = {
      ...stateModal,
      pop: { ...stateModal.pop, showAddModalSourceComplain: false, showUpdateModalSourceComplain: false },
    };
    dispatch(setModal(newState));
  };

  const onSubmitData = async (payload, resetForm) => {
    const body = {
      id_pop: Math.floor(Math.random() * 90 + 10),
      pop: payload.pop,
      user_id: user.id_user,
    };
    try {
      // create
      console.log(detail, 'dt');
      if (detail === null) {
        const add = await addPOP({ ...body });
        if (add.data.status === 'success') {
          toast.success('Berhasil tambah data POP.', {
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
            onBtnClose();
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
        const update = await updatePOP({
          id: detail.id_pop,
          body: { ...body, id_pop: detail.id_pop },
        });
        console.log(body, 'body');
        if (update.data.status === 'success') {
          toast.success('Berhasil ubah data POP.', {
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
            onBtnClose();
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
    onBtnClose();
  };

  return (
    <div className="fixed w-screen h-screen bg-opacity-80 bg-gray-700 top-0 left-0 bottom-0 right-0 z-50 flex justify-center">
      <div className="modal-box  h-fit max-h-fit  max-w-lg">
        <button
          type="button"
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onBtnClose}
        >
          ✕
        </button>
        <h3 className="text-lg font-bold">
          {detail === null && titleAction === 'create' ? 'Tambah POP' : titleAction === 'update' && 'Ubah POP'}
          {titleAction === 'read' && 'Detail POP'}
        </h3>
        <hr className="my-2" />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={FormPOPSchema}
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
                <label htmlFor="pop" className="label">
                  <span className="label-text"> Nama POP:</span>
                </label>
                <Field
                  id="pop"
                  name="pop"
                  placeholder="Nama POP"
                  value={values.pop}
                  disabled={titleAction === 'read'}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="input input-md input-bordered  max-w-full"
                />
                {errors.pop && touched.pop ? (
                  <div className="label label-text text-red-500">{errors.pop}</div>
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

export default FormPOP;
