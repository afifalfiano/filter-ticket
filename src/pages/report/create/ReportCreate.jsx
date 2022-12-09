/* eslint-disable dot-notation */
/* eslint-disable no-mixed-operators */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable object-curly-newline */
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
import * as html2canvas from 'html2canvas';
import {
  HiEye,
  HiEyeOff
} from 'react-icons/hi';
import { useNavigate } from "react-router-dom";
import {
  BarChart, LineChart, Bar, Line, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { selectBreadcrumb, updateBreadcrumb } from "../../../store/features/breadcrumb/breadcrumbSlice";
import { useAllShiftMutation, useGetKeluhanLaporanMutation, useGetUserLaporanMutation, useSaveReportMutation } from "../../../store/features/report/reportApiSlice";
import { useAllPOPMutation } from "../../../store/features/pop/popApiSlice"
import { selectCurrentUser } from "../../../store/features/auth/authSlice";
import { formatBytes } from "../../../utils/helper";
import { setPOP } from "../../../store/features/pop/popSlice";

const styleReport = {
  width: '1110px !important',
  height: '4500 !important'
}

const dataInit = [
  {
    label: 'Total Keluhan Dalam Pengecekan',
    total: 10
  },
  {
    label: 'Total Keluhan Selesai Pengecekan',
    total: 10
  },
  {
    label: 'Total RFO Gangguan',
    total: 10
  },
]

function ReportCreate() {
  const [allUserLocal, setAllUserLocal] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  const [allShiftLocal, setAllShiftLocal] = useState([]);
  const [allPOPLocal, setAllPOPLocal] = useState([])
  const [bodyKeluhan, setBodyKeluhan] = useState({});
  const [keluhanLaporanLocal, setKeluhanLaporanLocal] = useState(null);
  const navigate = useNavigate()

  const [getUserLaporan] = useGetUserLaporanMutation()
  const [allShift] = useAllShiftMutation();
  const [allPOP] = useAllPOPMutation();
  const [getKeluhanLaporan] = useGetKeluhanLaporanMutation()
  const [saveReport] = useSaveReportMutation();
  const [showPreview, setShowPreview] = useState(false);
  const dispatch = useDispatch();

  const handleShowPreview = (event) => {
    console.log(event);
    // const update = showPreview ? !showPreview : showPreview;
    setShowPreview(!event);
  }

  const { data: user } = useSelector(selectCurrentUser);

  const getAllPOP = async () => {
    try {
      const data = await allPOP().unwrap();
      console.log(data, 'ceksaja');
      if (data.status === 'success') {
        // console.log('set pop', data);
        // setAllPOPLocal(data.data);
        let dataFix;
        if (user?.role_id === 2) {
          const dataFilter = data.data.filter((pop) => {
            if (pop.id_pop === user.pop_id) {
              return pop;
            }
          });
          dataFix = dataFilter
        } else {
          dataFix = data.data
        }
        dispatch(setPOP({ data: dataFix }));
        console.log('set data', data);
        setAllPOPLocal(dataFix);
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
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.setFontSize(12);
    const content = document.getElementById('preview-report');
    const printFileName = 'Laporan-' + new Date().toLocaleDateString('id-ID') + '.pdf';
    doc.html(content, {
      async callback(doc) {
        // Save the PDF
        // const pressure = await html2canvas(document.getElementById('graph'), { width: 1110, height: 600 });
        // const imgData = pressure.toDataURL('image/png');
        // const imgHeight = 600 * 190 / 1110;
        // doc.addImage(imgData, 'png', 10, 50, 180, imgHeight, '', 'MEDIUM');
        doc.setProperties({ title: printFileName });
        window.open(doc.output('bloburl'), '_blank');
      },
      windowWidth: 900,
      width: 500,
      margin: 10,
      filename: printFileName,
      autoPaging: true,
      image: { type: 'png', quality: 1 },
      // width: 1000, // <- here
      // windowWidth: 1000 // <- here
    });
  };

  const [file, setFile] = useState([]);

  const onHandleFileUpload = ($event) => {
    const data = $event.target.files;
    data.length > 0 ? setFile(data[0]) : setFile([]);
  };
  const getKeluhanLaporanUser = async () => {
    try {
      const body = bodyKeluhan;
      const data = await getKeluhanLaporan({ body }).unwrap();
      console.log(data, 'ceksaja');
      if (data.status === 'succes') {
        console.log('set cek', data);
        setKeluhanLaporanLocal(data.data);
        setShowPreview(true);
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

  const getAllNOC = () => {
    let userNOC = '';
    checkedState.forEach((condition, indexcondition) => {
      if (condition) {
        allUserLocal.forEach((item, index) => {
          if (indexcondition === index) {
            if (item.role.role === 'NOC') {
              userNOC += item.name;
            }
          }
        }
        )
      }
    })
    return userNOC;
  }

  const getAllHelpdesk = () => {
    let userHelpdesk = '';
    checkedState.forEach((condition, indexcondition) => {
      if (condition) {
        allUserLocal.forEach((item, index) => {
          if (indexcondition === index) {
            if (item.role.role === 'HELPDESK') {
              userHelpdesk += item.name;
            }
          }
        }
        )
      }
    })
    return userHelpdesk;
  }

  const onRequestLaporan = () => {
    getKeluhanLaporanUser();
  }

  const handleSubmitReport = async () => {
    const body = new FormData();

    let userHelpdesk = '';
    let userNOC = '';
    checkedState.forEach((condition, indexcondition) => {
      if (condition) {
        allUserLocal.forEach((item, index) => {
          if (indexcondition === index) {
            if (item.role.role === 'HELPDESK') {
              userHelpdesk += item.name;
            }
            if (item.role.role === 'NOC') {
              userNOC += item.name;
            }
          }
        }
        )
      }
    })

    body.append('tanggal', bodyKeluhan.tanggal);
    body.append('shift_id', bodyKeluhan.shift);
    body.append('pop_id', bodyKeluhan.pop_id);
    body.append('noc', userNOC);
    body.append('helpdesk', userHelpdesk);
    body.append('data_laporan', document.getElementById('preview-report').innerHTML);
    body.append('user_id', user.id_user);
    body.append('lampiran_laporan', file);

    try {
      const data = await saveReport({ body }).unwrap();
      if (data.status === 'success') {
        toast.success('Berhasil simpan laporan.', {
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
        navigate('/report', { replace: true });
      }, 2000);
      console.log(data, 'dat');
    } catch (error) {
      console.log(error);
      toast.error(error.data.message || 'Gagal simpan laporan', {
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
      <hr />
      <div className="mt-5">
        <label htmlFor="location" className="label font-semibold">
          <span className="label-text"> Tampilan Laporan</span>
          {showPreview && (
          <HiEyeOff
            size={20}
            color="#0D68F1"
            className="cursor-pointer"
            onClick={() => handleShowPreview(showPreview)}
          />
          ) }
          {!showPreview
          && (
          <HiEye
            size={20}
            color="#0D68F1"
            className="cursor-pointer"
            onClick={() => handleShowPreview(showPreview)}
          />
          )}
        </label>
        {(keluhanLaporanLocal !== null && showPreview) && (
        <div
          id="preview-report"
          className="w-full max-w-screen-xl m-0 p-9"
          style={{
            width: '1440px !important',
            height: '4500px !important' }}
        >
          <h1 className="text-center font-bold text-2xl">Daily Complaint Report Helpdesk</h1>
          <div className="flex justify-between align-middle items-center mt-5">
            <div className="flex-1">
              <div className="flex gap-5">
                <div>
                  <p>Tanggal</p>
                  <p>Sesi</p>
                  <p>POP</p>
                  <p>Helpdesk</p>
                  <p>NOC</p>
                </div>
                <div>
                  <p>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <div className="">{allShiftLocal?.map((item) => {
                    if (item.id_shift === +bodyKeluhan.shift) {
                      return (
                        <span>{`${item.shift} (${item.mulai})-(${item.selesai})`}</span>
                      );
                    }
                  })}
                  </div>
                  <p>{allPOPLocal.find((item) => item.id_pop === +bodyKeluhan.pop_id)['pop']}</p>
                  <p>{getAllHelpdesk()}</p>
                  <p>{getAllNOC()}</p>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col items-end">
                <p>REF-ID-2022120521810</p>
                <img src="/report_logo.png" alt="Repor" width={157} className="image-full mt-4" />
              </div>
            </div>
          </div>

          <div className="text-center rounded-xl bg-gray-300 p-2 font-bold mt-5">
            <h2>Keluhan Open</h2>
          </div>

          <div className="flex mt-5 border-gray-300 rounded-lg flex-wrap">
            {keluhanLaporanLocal?.keluhan_open.map((item, index) => (
              <div className={`flex p-2 border border-gray-300 w-1/2 ${index % 2 === 0 ? 'rounded-l-lg' : 'rounded-r-lg'}`}>
                <div className="flex gap-5 w-full">
                  <div className="flex-1">
                    <p>Nomor</p>
                    <p>Nomor Keluhan</p>
                    <p>ID Pelanggan</p>
                    <p>Nama Pelanggan</p>
                    <p>Sumber Keluhan</p>
                    <p>Detail Sumber</p>
                  </div>
                  <div className="flex-1">
                    <p>{index + 1}</p>
                    <p>#{item?.nomor_keluhan}</p>
                    <p>{item?.id_pelanggan}</p>
                    <p>{item?.nama_pelanggan}</p>
                    <p>{item?.sumber?.sumber}</p>
                    <p>{item?.detail_sumber}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center rounded-xl bg-gray-300 p-2 font-bold mt-5">
            <h2>Keluhan Closed</h2>
          </div>

          <div className="flex mt-5 border-gray-300 rounded-lg flex-wrap">
            {keluhanLaporanLocal?.keluhan_close.map((item, index) => (
              <div className={`flex p-2 border border-gray-300 w-1/2 ${index % 2 === 0 ? 'rounded-l-lg' : 'rounded-r-lg'}`}>
                <div className="flex gap-5 w-full">
                  <div className="flex-1">
                    <p>Nomor</p>
                    <p>Nomor Keluhan</p>
                    <p>ID Pelanggan</p>
                    <p>Nama Pelanggan</p>
                    <p>Sumber Keluhan</p>
                    <p>Detail Sumber</p>
                  </div>
                  <div className="flex-1">
                    <p>{index + 1}</p>
                    <p>#{item?.nomor_keluhan}</p>
                    <p>{item?.id_pelanggan}</p>
                    <p>{item?.nama_pelanggan}</p>
                    <p>{item?.sumber?.sumber}</p>
                    <p>{item?.detail_sumber}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center rounded-xl bg-gray-300 p-2 font-bold mt-5">
            <h2>RFO Gangguan</h2>
          </div>

          <div className="flex mt-5 border-gray-300 rounded-lg flex-wrap">
            {keluhanLaporanLocal?.rfo_gangguan.map((item, index) => (
              <div className={`flex p-2 border border-gray-300 w-1/2 ${index % 2 === 0 ? 'rounded-l-lg' : 'rounded-r-lg'}`}>
                <div className="flex gap-5 w-full">
                  <div className="flex-1">
                    <p>Nomor</p>
                    <p>Nomor RFO Gangguan</p>
                    <p>Mulai Gangguan</p>
                    <p>Selesai Gangguan</p>
                    <p>Problem</p>
                    <p>Action</p>
                    <p>Status</p>
                  </div>
                  <div className="flex-1">
                    <p>{index + 1}</p>
                    <p>#{item?.nomor_rfo_gangguan}</p>
                    <p>{item?.mulai_gangguan}</p>
                    <p>{item?.selesai_gangguan}</p>
                    <p>{item?.problem}</p>
                    <p>{item?.action}</p>
                    <p>{item?.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center rounded-xl bg-gray-300 p-2 font-bold mt-5">
            <h2>Kesimpulan</h2>
          </div>

          <div className="flex mt-5 border border-gray-300 rounded-lg flex-wrap">
            <div className="flex p-2 border border-gray-300 rounded-l-lg rounded-r-lg w-full">
              <div className="flex gap-5 w-full">
                <div className="flex-1">
                  <p>Total Keluhan Open</p>
                  <p>Total Keluhan Closed</p>
                  <p>Total RFO Gangguan</p>
                </div>
                <div className="flex-1">
                  <p>{keluhanLaporanLocal?.total_keluhan_open}</p>
                  <p>{keluhanLaporanLocal?.total_keluhan_closed}</p>
                  <p>{keluhanLaporanLocal?.total_rfo_gangguan}</p>
                </div>
              </div>
            </div>
          </div>
          {/* <p className="font-semibold">Tanggal: {new Date().toLocaleDateString('id-ID')}</p>
          <p className="font-semibold mt-2">Petugas:</p>
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
          <p className="font-semibold mt-2">Total Keluhan Open: {keluhanLaporanLocal?.total_keluhan_open}</p>
          <p className="font-semibold mt-2">Total Keluhan Closed: {keluhanLaporanLocal?.total_keluhan_closed}</p>
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
            {keluhanLaporanLocal?.keluhan_open.map((item) => <li>{item.id_pelanggan} - {item.nama_pelanggan}</li>)}
          </div>
          <p className="font-semibold mt-2">Keluhan Closed</p>
          <div>
            {keluhanLaporanLocal?.keluhan_close.map((item) => <li>{item.id_pelanggan} - {item.nama_pelanggan}</li>)}
          </div>
          <p className="font-semibold mt-2">RFO Gangguan</p>
          <div>
            {keluhanLaporanLocal?.rfo_gangguan.map((item) => <li>{item.nomor_rfo_gangguan} - {item.problem}</li>)}
          </div> */}
        </div>
        )}
      </div>
      <hr />
      <div className="mt-5 font-semibold">
        File Upload: {file.name} - {formatBytes(file.size)}
      </div>
      <div className="mt-5">
        <div className="flex justify-center gap-5">
          <button
            type="button"
            onClick={() => {
              navigate('/report');
            }}
            className="btn btn-md text-white border-none"
          >Kembali
          </button>
          <label
            htmlFor="dropzone-file"
            className="btn btn-md bg-slate-500 text-white cursor-pointer border-none "
          > Unggah Laporan
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={onHandleFileUpload}
            />
          </label>
          <button type="button" onClick={handleSubmitReport} className="btn btn-md bg-blue-600 text-white border-none" disabled={file.length === 0}>
            Simpan Laporan
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportCreate;
