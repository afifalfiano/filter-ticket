import { jsPDF } from "jspdf";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HiEye,
  HiEyeOff
} from 'react-icons/hi';
import { useNavigate } from "react-router-dom";
import { selectBreadcrumb, updateBreadcrumb } from "../../../store/features/breadcrumb/breadcrumbSlice";
import { useAllShiftMutation, useGetKeluhanLaporanMutation, useGetUserLaporanMutation, useSaveReportMutation } from "../../../store/features/report/reportApiSlice";
import { useAllPOPMutation } from "../../../store/features/pop/popApiSlice"
import { selectCurrentUser } from "../../../store/features/auth/authSlice";
import { formatBytes } from "../../../utils/helper";
import { setPOP } from "../../../store/features/pop/popSlice";
import catchError from "../../../services/catchError";
import handleResponse from "../../../services/handleResponse";
import TemplateReport from "./TemplateReport";
import { Button, ButtonUpload } from "../../../components";

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
    setShowPreview(!event);
  }

  const { data: user } = useSelector(selectCurrentUser);

  const getAllPOP = async () => {
    try {
      const data = await allPOP().unwrap();
      if (data.status === 'success' || data.status === 'Success') {
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
        setAllPOPLocal(dataFix);
      } else {
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
    }
  };

  const getAllUserLapor = async () => {
    try {
      const data = await getUserLaporan().unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        let dataLocal = [];
        if (data.user.helpdesk.length > 0) {
          dataLocal = [...dataLocal, ...data.user.helpdesk];
        }
        if (data.user.noc.length > 0) {
          dataLocal = [...dataLocal, ...data.user.noc];
        }
        setAllUserLocal(dataLocal);
        setCheckedState(new Array(dataLocal.length).fill(false))
      } else {
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
    }
  };

  const getAllShift = async () => {
    try {
      const data = await allShift().unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        setAllShiftLocal(data.data);
      } else {
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
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
    const doc = new jsPDF('p', 'px', 'a4');
    doc.setFontSize(12);
    const content = document.getElementById('preview-report');
    if (content) {
      const printFileName = 'Laporan-' + new Date().toLocaleDateString('id-ID') + '.pdf';
      doc.html(content, {
        async callback(doc) {
          doc.setProperties({ title: printFileName });
          window.open(doc.output('bloburl'), '_blank');
        },
        windowWidth: 1500,
        width: 500,
        margin: 10,
        filename: printFileName,
        autoPaging: true,
        image: { type: 'png', quality: 1 },
      });
    } else {
      const data = {
        data: {
          message: 'Konten tidak terlihat. Silahkan klik tombol mata',
          status: 404,
        },
        status: 404
      };
      catchError(data, true);
    }
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
      if (data.status === 'succes' || data.status === 'Success') {
        setKeluhanLaporanLocal(data.data);
        setShowPreview(true);
      } else {
        setKeluhanLaporanLocal(null);
        setShowPreview(false);
        catchError(data, true);
      }
    } catch (error) {
      setKeluhanLaporanLocal(null);
      setShowPreview(false);
      catchError(error, true);
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
    body.append('data_laporan', '');
    body.append('user_id', user.id_user);
    body.append('lampiran_laporan', file);

    try {
      const data = await saveReport({ body }).unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        handleResponse(data);
        setTimeout(() => {
          navigate('/report', { replace: true });
        }, 2000);
      } else {
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
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
    setCheckedState(updatedCheckedState);
  };


  const btnBack = () => {
    navigate('/report');

  }

  return (
    <div>
      <div className="flex gap-5 flex-col lg:flex-row mt-5">
        <div className="form-control w-full lg:w-1/4">
          <label htmlFor="tanggal" className="label font-semibold">
            <span className="label-text"> Tanggal</span>
          </label>

          <input type="date" name="" id="tanggal" onChange={handleFilter} className="input w-full max-w-full input-bordered" />
        </div>
        <div className="form-control w-full lg:w-1/4">
          <label htmlFor="location" className="label font-semibold">
            <span className="label-text"> POP</span>
          </label>

          <select
            className="select w-full max-w-full input-bordered"
            onChange={handleFilter}
            id="pop"
          >
            <option value="" label="Pilih POP">Pilih POP</option>
            {allPOPLocal?.map((item, index) => (
              <option key={index} value={item.id_pop} label={item.pop}>{item.pop}</option>
            ))}
          </select>
        </div>
        <div className="form-control w-full lg:w-1/4">
          <label htmlFor="location" className="label font-semibold">
            <span className="label-text"> Shift</span>
          </label>

          <select
            className="select w-full max-w-full input-bordered"
            onChange={handleFilter}
            id="shift"
          >
            <option value="" label="Pilih Shift">Pilih Shift</option>
            {allShiftLocal?.map((item, index) => (
              <option key={index} value={item.id_shift} label={`${item.shift} (${item.mulai}) - (${item.selesai})`}>{`${item.shift} (${item.mulai}) - (${item.selesai})`}</option>
            ))}
          </select>
        </div>
        <div className="w-full lg:w-1/4 flex justify-between lg:flex-row gap-5">
          <div className="justify-end">
            <label htmlFor="location" className="label font-semibold" style={{ visibility: 'hidden' }}>
              <span className="label-text">Generate</span>
            </label>
            <button type="button" onClick={onRequestLaporan} className="btn btn-md btn-success  w-32 text-white">
              Generate Data
            </button>
          </div>
          <div className="justify-end">
            <label htmlFor="location" className="label font-semibold" style={{ visibility: 'hidden' }}>
              <span className="label-text">Unduh</span>
            </label>
            <button type="button" onClick={handleGeneratePdf} className="btn btn-md  w-32 btn-primary" disabled={keluhanLaporanLocal === null}>
              Unduh Laporan
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="location" className="label font-semibold">
          <span className="label-text"> User Pengguna</span>
        </label>
        <div className="flex gap-5">
          {allUserLocal?.map(({ name, role }, index) => (
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
          )}
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
          <TemplateReport allShiftLocal={allShiftLocal} keluhanLaporanLocal={keluhanLaporanLocal} allPOPLocal={allPOPLocal} bodyKeluhan={bodyKeluhan} getAllHelpdesk={getAllHelpdesk} getAllNOC={getAllNOC} />
        )}
      </div>
      <hr />
      <div className="mt-5 font-semibold">
        File Upload: {file.name} - {formatBytes(file.size)}
      </div>
      <div className="mt-5">
        <div className="flex flex-col-reverse md:flex-row justify-center gap-5">
          <Button type="button" onClick={() => btnBack()} className="border-none" >Kembali</Button>
          <ButtonUpload onChange={(e) => onHandleFileUpload(e)} />
          <Button type="button" onClick={() => handleSubmitReport()} className="bg-blue-600 border-none"  >Simpan</Button>
        </div>
      </div>
    </div>
  );
}

export default ReportCreate;
