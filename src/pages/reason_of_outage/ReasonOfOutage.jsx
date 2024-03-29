/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import catchError from '../../services/catchError';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import {
  useAllRFOMutation,
} from '../../store/features/rfo/rfoApiSlice';
import {
  selectAllRFO,
  setRFO,
} from '../../store/features/rfo/rfoSlice';
import { CategoryRFO, DoDetail, DoUpdate, Search, SkeletonTable, Pagination } from '../../components';
import debounce from 'lodash.debounce';

const columns = [
  'No',
  'Nomor RFO Keluhan',
  'Waktu Gangguan',
  'Durasi',
  'Masalah',
  'Keterangan',
  'Status RFO',
  'Aksi',
];


function ReasonOfOutage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const [allRFO, { isLoading }] = useAllRFOMutation();
  const allData = useSelector(selectAllRFO);
  const [search, setSearch] = useState('');


  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState([5]);
  const [countPage, setCountPage] = useState([1]);

  const getAllRFO = useCallback(debounce(async (search = '', page = 1) => {
    const param = `?page=${page}&keyword=${search}`;
    try {
      const data = await allRFO(param).unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        const result = data.data.data;
        dispatch(setRFO({ data: result }));
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
    } catch (err) {
      setRows([]);
      catchError(err, true);
    }
  }, 1000), []);

  useEffect(() => {
    dispatch(
      updateBreadcrumb([
        { path: '/reason_of_outage', title: 'Reason For Outage Keluhan' },
      ])
    );
    getAllRFO(search, currentPage);
  }, []);

  const onHandleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    getAllRFO(event.target.value, currentPage);

    // if (event.target.value.length > 0) {
    //   const regex = new RegExp(search, 'ig');
    //   const searchResult = allData.filter((item) => {
    //     if (item.problem.match(regex) || item?.keluhan?.nama_pelanggan.match(regex) || item?.keluhan?.id_pelanggan.match(regex)) {
    //       return item;
    //     }
    //   });
    //   setRows(searchResult);
    // } else {
    //   const searchResult = allData.filter((item) => {
    //     return item;
    //   });
    //   setRows(searchResult);
    // }
  }

  const detailData = (item) => {
    navigate(
      `/reason_of_outage/detail_single/${item.id_rfo_keluhan}`
    );
  }

  const updateData = (item) => {
    navigate(
      `/reason_of_outage/detail_single/${item.id_rfo_keluhan}?edit=true`
    );
  }

  return (
    <div>
        <div className="flex gap-5 flex-col md:flex md:flex-row">
          <div className="tooltip tooltip-right" data-tip="Cari berdasarkan nomor_rfo_keluhan, nomor_tiket, problem">
          <Search search={search} onHandleSearch={onHandleSearch} placeholder={'Cari berdasarkan nomor_rfo_keluhan, nomor_tiket, problem'} />
          </div>
        </div>


      {isLoading && <SkeletonTable countRows={8} countColumns={10} totalFilter={2} />}

      {/* start table */}
      {!isLoading && (
        <div className="overflow-x-auto mt-8">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                {columns?.map((item, index) => (
                  <th key={index} className="text-center">{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows?.map((item, index) => (
                <tr className="text-center" key={index}>
                  <th>{index + 1}</th>
                  <td className="text-left">
                    {item?.nomor_rfo_keluhan}
                  </td>
                  <td className="text-left">
                    <p>
                      Dibuat:
                      {new Date(item?.mulai_keluhan).toLocaleString()}
                    </p>
                    <p>
                      Diubah:
                      {new Date(item?.selesai_keluhan).toLocaleString()}
                    </p>
                  </td>
                  <td>{item?.durasi || 0}</td>
                  <td>{item?.problem}</td>
                  <td>{item?.deskripsi || '-'}</td>
                  <td>
                    <span className="badge badge-info text-white">
                      closed
                    </span>
                  </td>
                  <td>
                    <div className="flex flex-row gap-3 justify-center">
                      <DoUpdate onClick={() => updateData(item)} />
                      <DoDetail onClick={() => detailData(item)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isLoading && (<Pagination perPage={perPage} currentPage={currentPage} countPage={countPage} onClick={(i) => getAllRFO(search, i.target.id)} serverMode />)}
    </div>
  );
}

export default ReasonOfOutage;
