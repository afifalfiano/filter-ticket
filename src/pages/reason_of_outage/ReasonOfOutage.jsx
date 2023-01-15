import { useEffect, useState } from 'react';
import {
  HiSearch,
  HiPencil,
  HiEye,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/common/table/Pagination';
import catchError from '../../services/catchError';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import {
  useAllRFOMutation,
} from '../../store/features/rfo/rfoApiSlice';
import {
  selectAllRFO,
  setRFO,
} from '../../store/features/rfo/rfoSlice';
import SkeletonTable from '../../components/common/table/SkeletonTable';


function ReasonOfOutage() {
  const [statusData, setStatusData] = useState('sendiri');
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const [allRFO, {isLoading}] = useAllRFOMutation();
  const allData = useSelector(selectAllRFO);
  const [search, setSearch] = useState('');

  
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState([5]);
  const [countPage, setCountPage] = useState([1]);

  const getAllRFO = async (page = 1) => {
    const param = `?page=${page}`;
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
  };

  useEffect(() => {
    dispatch(
      updateBreadcrumb([
        { path: '/reason_of_outage', title: 'Reason For Outage Keluhan' },
      ])
    );
    setStatusData('sendiri');
    getAllRFO();
  }, []);

  const onHandleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);

    if (event.target.value.length > 0) {
      const regex = new RegExp(search, 'ig');
      const searchResult = allData.filter((item) => {
          if (item.problem.match(regex) || item?.keluhan?.nama_pelanggan.match(regex) || item?.keluhan?.id_pelanggan.match(regex)) {
            return item;
          }
      });
      setRows(searchResult);
    } else {
      const searchResult = allData.filter((item) => {
        return item;
      });
      setRows(searchResult);
    }
  }

  const columns = [
    'No',
    'Pelanggan',
    'Waktu Gangguan',
    'Durasi',
    'Masalah',
    'Keterangan',
    'Status RFO',
    'Aksi',
  ];

  return (
    <div>
      {!isLoading && (
      <div className="flex gap-5">
        <div className="form-control">
          <label htmlFor="location" className="label font-semibold">
            <span className="label-text"> Jenis RFO</span>
          </label>

          <select
            className="select w-full max-w-full input-bordered"
            disabled
            defaultValue={statusData}
          >
            <option disabled>Pilih Status</option>
            <option value="sendiri" label="RFO Keluhan">
              RFO Keluhan
            </option>
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="location" className="label font-semibold">
            <span className="label-text"> Cari</span>
          </label>
          <div className="flex items-center">
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <HiSearch />
              </div>
              <input
                type="text"
                id="voice-search"
                className="input input-md input-bordered pl-10 p-2.5 "
                placeholder="Cari data RFO Keluhan..."
                value={search}
                onChange={onHandleSearch}
              />
            </div>
          </div>
        </div>
      </div>
      )}

      {isLoading && <SkeletonTable countRows={8} countColumns={10} totalFilter={2} />}

      {/* start table */}
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
                <td>
                 {item?.keluhan?.id_pelanggan} - {item?.keluhan?.nama_pelanggan}
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
                    <div className="tooltip" data-tip="Edit">
                      <HiPencil
                        className="cursor-pointer"
                        size={20}
                        color="#D98200"
                        onClick={() => {
                            navigate(
                              `/reason_of_outage/detail_single/${item.id_rfo_keluhan}?edit=true`
                            );
                        }}
                      />
                    </div>
                    <div className="tooltip" data-tip="Detail">
                      <HiEye
                        size={20}
                        color="#0D68F1"
                        className="cursor-pointer"
                        onClick={() => {
                            navigate(
                              `/reason_of_outage/detail_single/${item.id_rfo_keluhan}`
                            );
                        }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {!isLoading && (<Pagination perPage={perPage} currentPage={currentPage} countPage={countPage} onClick={(i) => getAllRFO(i.target.id)} serverMode />)}
      {/* end table */}
    </div>
  );
}

export default ReasonOfOutage;
