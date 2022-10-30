/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { HiQuestionMarkCircle } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useDeleteBtsMutation } from '../../store/features/bts/btsApiSlice';
import styles from './DeleteModal.module.css';
import { useDeleteComplainMutation } from '../../store/features/complain/complainApiSlice';
import { useDeletePOPMutation } from '../../store/features/pop/popApiSlice';
import { useDeleteTeamMutation } from '../../store/features/team/teamApiSlice';
import { useDeleteSumberKeluhanMutation } from '../../store/features/sumber_keluhan/sumberKeluhanApiSlice';

function DeleteModal({ getInfo, detail, title }) {
  console.log(detail, 'dtl');

  const [deleteBts] = useDeleteBtsMutation();
  const [deleteComplain] = useDeleteComplainMutation();
  const [deletePOP] = useDeletePOPMutation();
  const [deleteTeam] = useDeleteTeamMutation();
  const [deleteSumberKeluhan] = useDeleteSumberKeluhanMutation();

  const onSubmit = async () => {
    try {
      let deleteData;
      if (title === 'BTS') {
        deleteData = await deleteBts(detail.id_bts);
      } else if (title === 'keluhan') {
        deleteData = await deleteComplain(detail.id_keluhan);
      } else if (title === 'POP') {
        deleteData = await deletePOP(detail.id_pop);
      } else if (title === 'Team') {
        deleteData = await deleteTeam(detail.id_role);
      } else if (title === 'Sumber Keluhan') {
        deleteData = await deleteSumberKeluhan(detail.id_sumber);
      }
      console.log(deleteData);
      if (deleteData?.data?.status === 'success') {
        toast.success(`Berhasil hapus data ${title}.`, {
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
      } else {
        toast.error(deleteData.data.message, {
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
        <h3 className="text-lg font-bold">Hapus Data {title}</h3>
        <hr className="my-2" />

        <div className="flex flex-col justify-center align-middle items-center">
          <HiQuestionMarkCircle size={50} color="#FF2E00" />

          <p className="py-4">Apakah anda yakin akan menghapus data {title}?</p>
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
