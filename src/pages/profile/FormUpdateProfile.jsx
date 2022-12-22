import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useEffect } from 'react';
import { HiPencil } from 'react-icons/hi';
import { selectCurrentUser } from '../../store/features/auth/authSlice';
import { selectAllPOP } from '../../store/features/pop/popSlice';
import { selectAllTeam } from '../../store/features/team/teamSlice';
import { selectBreadcrumb, updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import { ProfileSchema } from '../../utils/schema_validation_form';
import PreviewImage from './PreviewImage';
import { selectModalState, setModal } from '../../store/features/modal/modalSlice';
import Modal from '../../components/modal/Modal';
import ModalProfile from './ModalProfile';
import { useState } from 'react';

function FormUpdateProfile({ handleForm, profile }) {
  const { data: user } = useSelector(selectCurrentUser);
  const [valueForm, setValueForm] = useState(null);
  const roleData = useSelector(selectAllTeam);
  const popData = useSelector(selectAllPOP);

  const dispatch = useDispatch()
  const navigasi = useSelector(selectBreadcrumb);

  useEffect(() => {
    const dataNavigation = [...navigasi.data, { path: '/profile', title: 'Ubah Profil' }]
    dispatch(updateBreadcrumb(dataNavigation));
  }, [])

  const onBtnBack = () => {
    handleForm(false);
  };

  const getInfo = ($event) => {
    if ($event.status === 'success') {
      handleForm(false);
    }
  };

  const stateModal = useSelector(selectModalState);
  const openModal = (title, value) => {
    let newState;
    if (title === 'preview') {
      newState = { ...stateModal, profile: { ...stateModal.profile, showPreviewImageModal: true } };
    } else if (title === 'change-password') {
      newState = { ...stateModal, change_password: { ...stateModal.change_password, showChangePasswordModal: true } };
      setValueForm(value);
    }
    dispatch(setModal(newState));
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <Modal>
        {stateModal?.profile?.showPreviewImageModal && <PreviewImage stateModal={stateModal} getInfo={getInfo} /> }
        {stateModal?.change_password?.showChangePasswordModal && <ModalProfile stateModal={stateModal} getInfo={getInfo} payload={valueForm} /> }
      </Modal>
      <Formik
        enableReinitialize
        validationSchema={ProfileSchema}
        initialValues={{
          name: user?.username, email: user?.email, pop_id: user?.pop_id, role_id: user?.role_id, old_password: '', password: '', password_confirmation: ''
        }}
        onSubmit={(values) => {
          // onSubmitData(values);
          openModal('change-password', values);
        }}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          handleBlur,
          handleChange,
        }) => (
          <Form>
            <div className="flex items-start justify-center">
              <div className="text-center">
                <div className="avatar placeholder">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                    <span className="text-3xl">
                      <img src={profile?.avatar} alt={profile?.username} />
                    </span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <HiPencil
                    size={24}
                    className="link link-primary"
                    onClick={() => {
                      openModal('preview')
                    }}
                  />
                </div>
                <h1 className="font-semibold text-xl mt-5">Ubah Informasi</h1>
                <div className="my-5 flex justify-center gap-7">
                  <div className="border-gray-200 rounded-md border-2 w-80 h-auto items-center flex-1 flex-row justify-center">
                    <div className="px-5 py-5">
                      <div className="form-control">
                        <label htmlFor="fullName" className="label">
                          <span className="label-text"> Nama Lengkap:</span>
                        </label>

                        <Field
                          id="name"
                          name="name"
                          placeholder=""
                          disabled={user?.role_id !== 3}
                          value={values.name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="input input-md input-bordered  max-w-full"
                        />
                      </div>

                      <div className="form-control">
                        <label htmlFor="email" className="label">
                          <span className="label-text"> Email:</span>
                        </label>

                        <Field
                          type="email"
                          component="input"
                          id="email"
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="email@citra.net"
                          value={values.email}
                          disabled={user?.role_id !== 3}
                          className="input input-md input-bordered  max-w-full"
                        />
                      </div>

                      <div className="form-control">
                        <label htmlFor="team" className="label">
                          <span className="label-text"> Tim:</span>
                        </label>

                        <Field
                          component="select"
                          id="role_id"
                          name="role_id"
                          value={values?.role_id}
                          onBlur={handleBlur}
                          disabled={user?.role_id !== 3}
                          onChange={handleChange}
                          className="select w-full max-w-full input-bordered"
                        >
                          {roleData.data.map((item) => (
                            <option
                              id={item.id_role}
                              value={item.id_role}
                              label={item.role}
                            >
                              {item.role}
                            </option>
                          ))}
                        </Field>
                      </div>

                      <div className="form-control">
                        <label htmlFor="location" className="label">
                          <span className="label-text"> POP(Lokasi):</span>
                        </label>

                        <Field
                          component="select"
                          id="pop_id"
                          name="pop_id"
                          value={values.pop_id}
                          disabled={user?.role_id !== 3}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="select w-full max-w-full input-bordered"
                        >
                          {popData.data.map((item) => (
                            <option value={item.id_pop} label={item.pop}>
                              {item.pop}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>
                  </div>
                  <div className="border-gray-200 rounded-md border-2 w-80 h-auto items-center flex-1 flex-row justify-center">
                    <div className="px-5 py-5">
                      <div className="form-control ">
                        <label htmlFor="password" className="label">
                          <span className="label-text"> Password:</span>
                        </label>
                        <Field
                          type="password"
                          component="input"
                          id="password"
                          name="password"
                          placeholder="***************"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                          className="input input-md input-bordered  max-w-full"
                        />
                        {errors.password && touched.password ? (
                          <div className="label label-text text-red-500">
                            {errors.password}
                          </div>
                        ) : null}
                      </div>

                      <div className="form-control ">
                        <label htmlFor="password_confirmation" className="label">
                          <span className="label-text">
                            Konfirmsi Password:
                          </span>
                        </label>
                        <Field
                          type="password"
                          id="password_confirmation"
                          name="password_confirmation"
                          placeholder="***************"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password_confirmation}
                          className="input input-md input-bordered  max-w-full"
                        />
                        {errors.password_confirmation
                        && touched.password_confirmation ? (
                          <div className="label label-text text-red-500">
                            {errors.password_confirmation}
                          </div>
                          ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-nowrap gap-5 justify-center">
                  <button
                    type="button"
                    onClick={onBtnBack}
                    className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md bg-black text-white w-24 border-none"
                  >
                    Kembali
                  </button>
                  <button
                    type="submit"
                    className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md w-24 bg-success border-none"
                    disabled={!isValid}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormUpdateProfile;
