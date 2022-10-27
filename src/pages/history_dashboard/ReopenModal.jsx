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
import React, { useState, useEffect } from 'react';
import {
  HiOutlineCloudUpload,
  HiSearch,
  HiPencil,
  HiTrash,
  HiEye,
  HiOutlineClipboardCheck,
  HiOutlineClipboardList,
  HiQuestionMarkCircle,
  HiExclamation,
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useComplainHistoryReopenMutation } from '../../store/features/complain_history/complainHistoryApiSlice';
import styles from './HistoryDashboard.module.css';

function ReopenModal({ getInfo, detail }) {
  const [complainHistoryReopen] = useComplainHistoryReopenMutation()

  const onSubmit = async () => {
    try {
      const reopenComplain = await complainHistoryReopen(detail.id_keluhan);

      if (reopenComplain.data.status === 'success') {
        toast.success(`Berhasil membuka kembali keluhan.`, {
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
          document.getElementById('my-modal-revert').click();
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
          htmlFor="my-modal-revert"
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        <h3 className="text-lg font-bold">Konfirmasi Data Keluhan</h3>
        <hr className="my-2" />

        <div className="flex flex-col justify-center align-middle items-center">
          <HiExclamation size={50} color="#FF2E00" />

          <span className="py-4">
            Apakah anda yakin mengembalikan status data keluhan dari
            &nbsp;
            <strong>closed</strong>
            &nbsp; menjadi &nbsp;
            <strong>open ?</strong>
          </span>
        </div>

        <hr className="my-2 mt-5" />
        <div className="modal-action justify-center">
          <label htmlFor="my-modal-revert" className="btn btn-md">
            Batal
          </label>
          <button htmlFor="my-modal-revert" onClick={onSubmit} className="btn btn-md btn-error">
            Kembalikan
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReopenModal;