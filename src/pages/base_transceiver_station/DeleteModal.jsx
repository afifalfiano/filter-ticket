/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { HiQuestionMarkCircle } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useDeleteBtsMutation } from '../../store/features/bts/btsApiSlice';
import styles from './BaseTransceiverStation.module.css';

function DeleteModal({ getInfo, detail }) {
  console.log(detail, 'dtl');

  const [deleteBts] = useDeleteBtsMutation();
  const onSubmit = async () => {
    try {
      const deleteData = await deleteBts(detail.id_bts);
      if (deleteData.data.status === 'success') {
        toast.success('Berhasil hapus data bts.', {
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
          document.getElementById('my-modal-delete').click();
          getInfo({ status: 'success' });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal">
      <div className={`${styles['modal-box-custom']}`}>
        <label
          htmlFor="my-modal-delete"
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        <h3 className="text-lg font-bold">Hapus Data BTS</h3>
        <hr className="my-2" />

        <div className="flex flex-col justify-center align-middle items-center">
          <HiQuestionMarkCircle size={50} color="#FF2E00" />

          <p className="py-4">Apakah anda yakin akan menghapus data BTS?</p>
        </div>

        <hr className="my-2 mt-5" />
        <div className="modal-action justify-center">
          <label htmlFor="my-modal-delete" className="btn btn-md">
            Batal
          </label>
          <button
            onClick={onSubmit}
            type="submit"
            htmlFor="my-modal-delete"
            className="btn btn-md btn-error"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
