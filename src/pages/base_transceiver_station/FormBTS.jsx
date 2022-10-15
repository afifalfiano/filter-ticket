/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-alert */
import { Formik, Field, Form } from 'formik';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { selectCurrentUser } from '../../store/features/auth/authSlice';

import { useAddBtsMutation } from '../../store/features/bts/btsApiSlice';

function FormBTS() {
  const initialValues = {
    btsName: '',
    picName: '',
    picContact: '',
    fullAddress: '',
    popLocation: '',
    coordinat: '',
  };
  const [defaultValue, setDefaultValue] = useState(initialValues);
  const [addData] = useAddBtsMutation();

  const { data: user } = useSelector(selectCurrentUser);

  const handlePOP = ($event) => {
    console.log($event, 'ev');
  };

  const onSubmitData = async (payload) => {
    try {
      const body = {
        nama_bts: payload.btsName,
        nama_pic: payload.picName,
        nomor_pic: payload.picContact,
        lokasi: payload.fullAddress,
        pop_id: 1,
        kordinat: payload.coordinat,
        user_id: user.id_user,
      };
      const add = await addData({ ...body });
      if (add.data.status === 'success') {
        toast.success('Berhasil tambah data bts.', {
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
      }

      setTimeout(() => {
        document.getElementById('my-modal-3').click();
        setDefaultValue({
          btsName: '',
          picName: '',
          picContact: '',
          fullAddress: '',
          popLocation: '',
          coordinat: '',
        });
      }, 2000);
      console.log(add);
    } catch (error) {
      console.log(error);
    }
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
        <h3 className="text-lg font-bold">Tambah BTS</h3>
        <hr className="my-2" />
        <Formik
          initialValues={defaultValue}
          onSubmit={(values) => {
            console.log(values);
            onSubmitData(values);
          }}
        >
          <Form>
            <div className="form-control">
              <label htmlFor="btsName" className="label">
                <span className="label-text"> Nama BTS:</span>
              </label>
              <Field
                id="btsName"
                name="btsName"
                placeholder="Nama BTS"
                className="input input-md input-bordered  max-w-full"
              />
            </div>

            <div className="flex flex-row gap-3">
              <div className="form-control flex-1">
                <label htmlFor="picName" className="label">
                  <span className="label-text"> Nama PIC</span>
                </label>
                <Field
                  id="picName"
                  name="picName"
                  placeholder="Nama PIC"
                  className="input input-md input-bordered max-w-full"
                />
              </div>

              <div className="form-control flex-1">
                <label htmlFor="picContact" className="label">
                  <span className="label-text"> Kontak PIC</span>
                </label>

                <Field
                  id="picContact"
                  name="picContact"
                  placeholder="Kontak PIC"
                  className="input input-md input-bordered max-w-full"
                />
              </div>
            </div>

            <div className="flex flex-row gap-3">
              <div className="form-control flex-1">
                <label htmlFor="fullAddress" className="label">
                  <span className="label-text"> Alamat Lengkap</span>
                </label>
                <Field
                  id="fullAddress"
                  name="fullAddress"
                  placeholder="Alamat Lengkap"
                  className="input input-md input-bordered max-w-full"
                />
              </div>
              <div className="form-control flex-1">
                <label htmlFor="location" className="label">
                  <span className="label-text"> POP (Lokasi)</span>
                </label>
                <Field
                  component="select"
                  id="popLocation"
                  name="popLocation"
                  className="select w-full max-w-full input-bordered"
                  onChange={handlePOP}
                >
                  <option value="1">Yogyakarta</option>
                  <option value="2">Solo</option>
                  <option value="3">Surakarta</option>
                </Field>
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="coordinat" className="label">
                <span className="label-text"> Koordinat:</span>
              </label>

              <Field
                id="coordinat"
                name="coordinat"
                placeholder="Koordinat"
                className="input input-md input-bordered max-w-full"
              />
            </div>
            {/* <button type="submit">Submit</button> */}
            <hr className="my-2 mt-10" />
            <div className="modal-action justify-center">
              <label htmlFor="my-modal-3" className="btn btn-md">
                Batal
              </label>
              <button
                type="submit"
                htmlFor="my-modal-3"
                className="btn btn-md btn-success"
              >
                Simpan
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default FormBTS;
