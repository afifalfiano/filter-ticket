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
import { useDispatch } from "react-redux";
import { updateBreadcrumb } from "../../../store/features/breadcrumb/breadcrumbSlice";
import { useAllShiftMutation, useGetKeluhanLaporanMutation, useGetUserLaporanMutation } from "../../../store/features/report/reportApiSlice";
import { useAllPOPMutation } from "../../../store/features/pop/popApiSlice"

function ReportDetail() {
  const [allUserLocal, setAllUserLocal] = useState([]);
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
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onRequestLaporan = () => {
    getKeluhanLaporanUser();
  }

  useEffect(() => {
    dispatch(updateBreadcrumb([{ path: '/report/create', title: 'Tambah Laporan' }]));
    getAllPOP();
    getAllUserLapor();
    getAllShift();
  }, [])

  return (
    <div>
      <h1>Detail Laporan</h1>
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
        <div className="form-control">
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
        </div>
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
    </div>
  );
}

export default ReportDetail;
