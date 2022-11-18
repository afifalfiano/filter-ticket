/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
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

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-hot-toast';
import { selectBreadcrumb, updateBreadcrumb } from "../../../store/features/breadcrumb/breadcrumbSlice";
import { useAllShiftMutation, useGetKeluhanLaporanMutation, useGetUserLaporanMutation } from "../../../store/features/report/reportApiSlice";
import { useAllPOPMutation } from "../../../store/features/pop/popApiSlice"

function ReportDetail() {
  const [allUserLocal, setAllUserLocal] = useState([]);
  const [checkedState, setCheckedState] = useState(
    new Array(2).fill(false)
  );
  const [allShiftLocal, setAllShiftLocal] = useState([]);
  const [allPOPLocal, setAllPOPLocal] = useState([])
  const [bodyKeluhan, setBodyKeluhan] = useState({});
  const [keluhanLaporanLocal, setKeluhanLaporanLocal] = useState(null);

  const [getUserLaporan] = useGetUserLaporanMutation()
  const [allShift] = useAllShiftMutation();
  const [allPOP] = useAllPOPMutation();
  const [getKeluhanLaporan] = useGetKeluhanLaporanMutation()
  const dispatch = useDispatch();

  const getAllPOP = async () => {
    try {
      const data = await allPOP().unwrap();
      console.log(data, 'ceksaja');
      if (data.status === 'success') {
        console.log('set pop', data);
        setAllPOPLocal(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUserLapor = async () => {
    try {
      const data = await getUserLaporan().unwrap();
      console.log(data, 'ceksaja');
      if (data.status === 'success') {
        let dataLocal = [];
        if (data.user.helpdesk.length > 0) {
          dataLocal = [...dataLocal, ...data.user.helpdesk];
        }
        if (data.user.noc.length > 0) {
          dataLocal = [...dataLocal, ...data.user.noc];
        }
        console.log(dataLocal, 'loc');
        setAllUserLocal(dataLocal);
        console.log('set user lapor', data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllShift = async () => {
    try {
      const data = await allShift().unwrap();
      console.log(data, 'ceksaja');
      if (data.status === 'success') {
        console.log('set shift', data);
        setAllShiftLocal(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (event) => {
    const { id, value } = event.target;
    if (id === 'tanggal') {
      setBodyKeluhan({ ...bodyKeluhan, tanggal: value });
    }
    if (id === 'pop') {
      setBodyKeluhan({ ...bodyKeluhan, pop_id: value });
    }
    if (id === 'shift') {
      setBodyKeluhan({ ...bodyKeluhan, shift: value });
    }
    // setPOPLocal(event.target.value);
    // console.log(event.target.value, 'how');
    // const dataChanged = dataRow.data.filter((item) => {
    //   if (+item.pop_id === +event.target.value && item.status === statusData) {
    //     return item;
    //   }
    // })
    // if (event.target.value === 'all') {
    //   console.log(dataRow, 'cek gan');
    //   setRows(dataRow.data.filter((item) => item.status === statusData));
    // } else {
    //   setRows(dataChanged);
    // }
  };

  const getKeluhanLaporanUser = async () => {
    try {
      const body = bodyKeluhan;
      const data = await getKeluhanLaporan({ body }).unwrap();
      console.log(data, 'ceksaja');
      if (data.status === 'success') {
        console.log('set cek', data);
        // setAllShiftLocal(data.data);
        // setKeluhanLaporanLocal
      } else {
        toast.error(data.message || 'Data Tidak Ditemukan', {
          style: {
            padding: '16px',
            backgroundColor: '#ffd22e',
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
      toast.error(error.data.message || 'Data Tidak Ditemukan', {
        style: {
          padding: '16px',
          backgroundColor: '#ffd22e',
          color: 'white',
        },
        duration: 2000,
        position: 'top-right',
        id: 'error',
        icon: false,
      });
    }
  }

  const onRequestLaporan = () => {
    getKeluhanLaporanUser();
  }

  const navigasi = useSelector(selectBreadcrumb);

  useEffect(() => {
    const data = [...navigasi.data, { path: `/report/create`, title: 'Tambah' }]
    dispatch(updateBreadcrumb(data))
    getAllPOP();
    getAllUserLapor();
    getAllShift();
  }, [])

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));
    setCheckedState(updatedCheckedState);
    console.log(checkedState, 'cek');
    console.log(allUserLocal, 'all');
  };

  return (
    <div>
      <div className="flex gap-5 mt-5">
        <div className="form-control">
          <label htmlFor="tanggal" className="label font-semibold">
            <span className="label-text"> Tanggal</span>
          </label>

          <input type="date" name="" id="tanggal" onChange={handleFilter} className="input w-full max-w-full input-bordered" />
        </div>
        <div className="form-control">
          <label htmlFor="location" className="label font-semibold">
            <span className="label-text"> POP</span>
          </label>

          <select
            className="select w-full max-w-full input-bordered"
            onChange={handleFilter}
            id="pop"
          >
            <option value="" label="Pilih POP">Pilih POP</option>
            {allPOPLocal?.map((item) => (
              <option value={item.id_pop} label={item.pop}>{item.pop}</option>
            ))}
          </select>
        </div>
        {/* <div className="form-control">
          <label htmlFor="location" className="label font-semibold">
            <span className="label-text"> User Laporan</span>
          </label>

          <select
            className="select w-full max-w-full input-bordered"
            onChange={handleFilter}
            id="user"
          >
            <option value="" label="Pilih User">Pilih User</option>
            {allUserLocal?.map((item) => (
              <option value={item.id_user} label={item.name}>{item.name}</option>
            ))}
          </select>
        </div> */}
        <div className="form-control">
          <label htmlFor="location" className="label font-semibold">
            <span className="label-text"> Shift</span>
          </label>

          <select
            className="select w-full max-w-full input-bordered"
            onChange={handleFilter}
            id="shift"
          >
            <option value="" label="Pilih Shift">Pilih Shift</option>
            {allShiftLocal?.map((item) => (
              <option value={item.id_shift} label={`${item.shift} (${item.mulai}) - (${item.selesai})`}>{`${item.shift} (${item.mulai}) - (${item.selesai})`}</option>
            ))}
          </select>
        </div>
        <div className="form-control justify-end">
          <button type="button" onClick={onRequestLaporan} className="btn btn-md btn-success">
            Buat Laporan
          </button>
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="location" className="label font-semibold">
          <span className="label-text"> User Pengguna</span>
        </label>
        <div className="flex gap-5">
          {allUserLocal.map(({ name, role }, index) => (
            <div key={index}>
              <div className="label">
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={name}
                  value={name}
                  checked={checkedState[index]}
                  onChange={() => handleOnChange(index)}
                />
                <label htmlFor={`custom-checkbox-${index}`} className="pl-2">{name}({role.role})</label>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="location" className="label font-semibold">
          <span className="label-text"> Tampilan Laporan</span>
        </label>
      </div>
    </div>
  );
}

export default ReportDetail;
