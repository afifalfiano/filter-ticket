/* eslint-disable no-prototype-builtins */
/* eslint-disable no-shadow */
/* eslint-disable new-cap */
/* eslint-disable no-return-assign */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
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
import { jsPDF } from "jspdf";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-hot-toast';
import { selectBreadcrumb, updateBreadcrumb } from "../../../store/features/breadcrumb/breadcrumbSlice";
import { useAllShiftMutation, useGetKeluhanLaporanMutation, useGetUserLaporanMutation } from "../../../store/features/report/reportApiSlice";
import { useAllPOPMutation } from "../../../store/features/pop/popApiSlice"

const styleReport = {
  fontSize: '12px',
  padding: '12px'
}

function ReportDetail() {
  const [allUserLocal, setAllUserLocal] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
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
        setCheckedState(new Array(dataLocal.length).fill(true))
        console.log('set user lapor', checkedState);
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
  };

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "px"
    });

    doc.setFontSize(12);
    doc.html(document.getElementById('preview-report'), {
      async callback(doc) {
        doc.setFontSize(12);
        // doc.save("Laporan" + new Date().toString());
        const printFileName = 'Laporan-' + new Date().toLocaleDateString('id-ID') + '.pdf';
        doc.setProperties({ title: printFileName });
        window.open(doc.output('bloburl'), '_blank');
      }
    });
  };

  // let dataOpen = [];
  // let dataClosed = [];

  const getKeluhanLaporanUser = async () => {
    try {
      const body = bodyKeluhan;
      const data = await getKeluhanLaporan({ body }).unwrap();
      console.log(data, 'ceksaja');
      if (data.status === 'succes') {
        console.log('set cek', data);
        setKeluhanLaporanLocal(data.data);
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
    console.log(updatedCheckedState, 'cek dulu')
    setCheckedState(updatedCheckedState);
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
            Generate Data
          </button>
        </div>
        <div className="form-control justify-end">
          <button type="button" onClick={handleGeneratePdf} className="btn btn-md btn-primary" disabled={keluhanLaporanLocal === null}>
            Unduh Laporan
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
        {keluhanLaporanLocal !== null && (
        <div id="preview-report" style={styleReport}>
          <p className="font-semibold">Tanggal: {new Date().toLocaleDateString('id-ID')}</p>
          <p className="font-semibold mt-2">Petugas:</p>
          {/* {checkedState.map((item) => (<p>{item.toString()}</p>))} */}
          {
            checkedState.map((condition, indexcondition) => {
              let user = '';
              if (condition) {
                allUserLocal.forEach((item, index) => {
                  if (indexcondition === index) {
                    user = <p>{item.name} ({item.role.role})</p>
                  }
                }
                )
              }
              return user;
            })
          }
          <p className="font-semibold mt-2">Total Keluhan: {keluhanLaporanLocal?.total_keluhan}</p>
          <p className="font-semibold mt-2">Total RFO Gangguan: {keluhanLaporanLocal?.total_rfo_gangguan}</p>
          <p className="font-semibold mt-2">Shift: {allShiftLocal?.map((item) => {
            if (item.id_shift === +bodyKeluhan.shift) {
              return (
                <span>{`${item.shift} (${item.mulai}) - (${item.selesai})`}</span>
              );
            }
          })}
          </p>
          <p className="font-semibold mt-2">Keluhan Open</p>
          <div>
            {keluhanLaporanLocal?.keluhan.map((item) => {
              if (item.status === 'open') {
                return (
                  <li>{item.id_pelanggan} - {item.nama_pelanggan}</li>
                )
              }
            })}
          </div>
          <p className="font-semibold mt-2">Keluhan Closed</p>
          <div>
            {keluhanLaporanLocal?.keluhan.map((item) => {
              if (item.status === 'closed') {
                return (
                  <li>{item.id_pelanggan} - {item.nama_pelanggan}</li>
                )
              }
            })}
          </div>
          <p className="font-semibold mt-2">RFO Gangguan</p>
          <div>
            {keluhanLaporanLocal?.rfo_gangguan.map((item) => (
              <>
                <li>{item.problem}</li>
                <p className="ml-5">Terdampak:</p>
                <ul className="ml-5">
                  {item.keluhan.map((efek) => <li>{efek.id_pelanggan} - {efek.nama_pelanggan}</li>)}
                </ul>
              </>
            ))}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default ReportDetail;
