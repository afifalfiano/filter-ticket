import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useChangeAvatarMutation } from '../../store/features/auth/authApiSlice';
import { notifChangeProfile } from '../../store/features/auth/authSlice';
import { setModal } from '../../store/features/modal/modalSlice';
import catchError from '../../services/catchError';
import handleResponse from '../../services/handleResponse';
import { Button, ButtonIconExit, ButtonUpload } from '../../components';

function PreviewImage({ stateModal, getInfo }) {
  const [avatar, setAvatar] = useState(null);
  const [file, setFile] = useState(null);
  const [changeAvatar] = useChangeAvatarMutation();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  }
  const onBtnClose = () => {
    const newState = {
      ...stateModal,
      profile: { ...stateModal.profile, showPreviewImageModal: false },
    };
    dispatch(setModal(newState));
  };
  const onSubmitData = async () => {
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      const update = await changeAvatar(formData).unwrap();
      if (update.status === 'success' || update.status === 'Success') {
        handleResponse(update);
        dispatch(notifChangeProfile('updated'));
        setTimeout(() => {
          getInfo({ status: 'success' });
          onBtnClose();
          dispatch(notifChangeProfile(null));
        }, 2000);
      } else {
        catchError(update, true);
      }
    } catch (error) {
      catchError(error, true);
    }
  };

  const onHandleReset = () => {
    setFile(null);
    setAvatar(null);
    onBtnClose();
  };

  return (
    <div className="fixed w-screen h-screen bg-opacity-80 bg-gray-700 top-0 left-0 bottom-0 right-0 z-50 flex justify-center">
      <div className="modal-box mt-3  h-fit max-h-fit  max-w-lg">
        <ButtonIconExit onClick={onBtnClose} />

        <h3 className="text-lg font-bold">Preview Profile Baru</h3>
        <hr className="my-2" />
        <div className="flex justify-center align-middle items-center  flex-col text-cennter">
          <ButtonUpload onChange={(e) => handleChange(e)} />
          <div className="border rounded-md mt-5 p-5">
            {avatar && <img fetchpriority="high" width={'100%'} height={'100%'} src={avatar} alt="avatar" className="image-full max-w-md" />}
            {!avatar && <p>Belum ada gambar</p>}
          </div>
        </div>
        <hr className="my-2 mt-10" />

        <div className="modal-action justify-center">
          <Button type="button" onClick={() => onHandleReset()}>Batal</Button>
          <Button type="button" className="btn-success" onClick={() => onSubmitData()}>Simpan</Button>
        </div>
      </div>
    </div>
  );
}

export default PreviewImage;
