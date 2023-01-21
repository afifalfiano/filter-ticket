import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import { selectAllReport, setReport } from '../../store/features/report/reportSlice';
import { useAllPOPMutation } from '../../store/features/pop/popApiSlice';
import { setPOP } from '../../store/features/pop/popSlice';
import { selectCurrentUser } from '../../store/features/auth/authSlice';
import ReportDetail from './detail/ReportDetail';
import { selectModalState, setModal } from '../../store/features/modal/modalSlice';
import { useAllReportMutation } from '../../store/features/report/reportApiSlice';
import catchError from '../../services/catchError';
import { Button, Pagination, DoDelete, DeleteModal, SkeletonTable, Modal, DoDetail, DoPrint, LabelStatusPOP, Search, SelectPOP } from '../../components';

const columns = [
  'No',
  'Nomor Laporan',
  'POP',
  'Tanggal',
  'Shift',
  'Petugas NOC',
  'Petugas Helpdesk',
  'Aksi',
];

function Report() {

  const [pop, setPOPLocal] = useState('');
  const [dataPOP, setdataPOP] = useState([]);
  const [rows, setRows] = useState([]);
  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();
  const [allReport, { isLoading }] = useAllReportMutation();
  const dataRow = useSelector(selectAllReport);
  const [allPOP] = useAllPOPMutation();
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const { data: user } = useSelector(selectCurrentUser);
  const stateModal = useSelector(selectModalState);

  const openModal = (modal) => {
    let newState;
    if (modal === 'detail report') {
      newState = { ...stateModal, report: { ...stateModal.report, showDetailModalReport: true } };
    } else if (modal === 'delete report') {
      newState = { ...stateModal, report: { ...stateModal.report, showDeleteModalReport: true } };
    }
    dispatch(setModal(newState));
    window.scrollTo(0, 0);
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState([5]);
  const [countPage, setCountPage] = useState([1]);

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
        setdataPOP(dataFix);
      } else {
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
    }
  };

  const handlePOP = (event) => {
    setPOPLocal(event.target.value);
    doGetAllReport(event.target.value, search, currentPage);
    // const dataChanged = dataRow.data.filter((item) => {
    //   if (+item.pop_id === +event.target.value) {
    //     return item;
    //   }
    // })
    // if (event.target.value === 'all') {
    //   setRows(dataRow.data)
    // } else {
    //   setRows(dataChanged);
    // }
  };

  const onHandleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    doGetAllReport(pop, search, currentPage);

    // if (event.target.value.length > 0) {
    //   const regex = new RegExp(search, 'ig');
    //   const searchResult = dataRow.data.filter((item) => {
    //     if (+item.pop.id_pop === +pop) {
    //       if (item.nomor_laporan.match(regex) || item.noc.match(regex) || item.helpdesk.match(regex) || item.pop.pop.match(regex)) {
    //         return item;
    //       }
    //     }
    //     if (pop === 'all') {
    //       if (item.nomor_laporan.match(regex) || item.noc.match(regex) || item.helpdesk.match(regex) || item.pop.pop.match(regex)) {
    //         return item;
    //       }
    //     }
    //   });
    //   setRows(searchResult);
    // } else {
    //   setRows(dataRow.data.filter((item) => {
    //     if (+item.pop.id_pop === +pop) {
    //       return item;
    //     }
    //     if (pop === 'all') {
    //       return item;
    //     }
    //   }));
    // }
  }

  const doGetAllReport = async (pop = '', search = '', page = 1) => {
    const param = `?page=${page}&pop_id=${pop}&keyword=${search}`;
    try {
      const data = await allReport(param).unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        const result = data.data.data;
        dispatch(setReport({ data: result }));
        setRows(result);
        setCurrentPage(data.data.current_page);
        setPerPage([data.data.per_page]);

        const countPaginate = [];
        for (let i = 0; i < data.data.last_page; i++) {
          countPaginate.push(i + 1);
        }
        setCountPage(countPaginate);
      } else {
        setRows([]);
        catchError(data, true);
      }
    } catch (error) {
      setRows([]);
      catchError(error, true);
    }
  }

  useEffect(() => {
    dispatch(updateBreadcrumb([{ path: '/report', title: 'Laporan' }]));
    getAllPOP();
    doGetAllReport(pop, search, currentPage);
  }, [])

  const getInfo = ($event) => {
    if ($event.status === 'success') {
      doGetAllReport(pop, search, currentPage);
    }
  };

  const addData = () => {
    navigate(`/report/create`);
  }

  const deleteData = (item) => {
    setDetail(item);
    openModal('delete report');
  }

  const detailData = (item) => {
    setDetail(item);
    openModal('detail report')
  }

  const printData = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(
      `${item.lampiran_laporan}`,
      '_blank'
    );
  }

  return (
    <div>
      <div>
        <Button type="button" onClick={addData}>Tambah</Button>
      </div>

      <Modal>
        {stateModal?.report?.showDeleteModalReport && <DeleteModal stateModal={stateModal} getInfo={getInfo} detail={detail} title="laporan" />}
        {stateModal?.report?.showDetailModalReport && <ReportDetail stateModal={stateModal} detailData={detail} />}
      </Modal>

        <div className="gap-5 mt-5 flex flex-col md:flex md:flex-row">
          <div className="form-control w-full md:w-52">
            <SelectPOP dataPOP={dataPOP} handlePOP={handlePOP} server={true} />
          </div>

          <Search search={search} onHandleSearch={onHandleSearch} placeholder={'Cari data laporan...'} />

        </div>

      {isLoading && <SkeletonTable countRows={8} countColumns={10} totalFilter={2} />}

      {!isLoading && (
        <div className="overflow-x-auto mt-8">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                {columns.map((item, index) => (
                  <th key={index} className="text-center">{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((item, index) => (
                <tr className="text-center" key={index}>
                  <th>{index + 1}</th>
                  <th>{item?.nomor_laporan}</th>
                  <td>
                    <LabelStatusPOP status={item?.pop?.pop} />

                  </td>
                  <td className="text-left">{new Date(item.tanggal).toLocaleDateString('id-ID')}</td>
                  <td>{item.shift.shift} ({item.shift.mulai} - {item.shift.selesai})</td>
                  <td>{item.noc}</td>
                  <td>{item.helpdesk}</td>
                  <td>
                    <div className="flex flex-row gap-3 justify-center">
                      <DoDetail onClick={() => detailData(item)} />
                      <DoPrint onClick={(e) => printData(e, item)} />
                      <DoDelete onClick={() => deleteData(item)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!isLoading && (<Pagination perPage={perPage} currentPage={currentPage} countPage={countPage} onClick={(i) => doGetAllReport(pop, search, i.target.id)} serverMode />)}
      {/* end table */}
    </div>
  )
}
export default Report;
