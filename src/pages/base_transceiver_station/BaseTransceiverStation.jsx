/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  HiSearch,
  HiQuestionMarkCircle,
  HiTrash,
  HiEye,
  HiPencil,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { selectAllBTS, setBTS } from '../../store/features/bts/btsSlice';
import styles from './BaseTransceiverStation.module.css';
import { useAllBtsMutation } from '../../store/features/bts/btsApiSlice';
import FormBTS from './FormBTS';
import DeleteModal from '../../components/common/DeleteModal';
import { useAllPOPMutation } from '../../store/features/pop/popApiSlice';
import { selectAllPOP, setPOP } from '../../store/features/pop/popSlice';

function BaseTransceiverStation() {
  const columns = [
    'No',
    'Nama',
    'Penanggung Jawab',
    'No Penanggung Jawab',
    'Lokasi',
    'Koordinat',
    'POP',
    'Aksi',
  ];

  const [rows, setRows] = useState([]);
  const [dataPOP, setdataPOP] = useState([]);
  const [pop, setPOPLocal] = useState('all');
  const [allBts, { isLoading, isSuccess }] = useAllBtsMutation();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState(null);
  const [search, setSearch] = useState('');

  const dataRow = useSelector(selectAllBTS);

  const onHandleSearch = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    console.log(event.target.value.length, 'ooo');
    setSearch(event.target.value);

    if (event.target.value.length > 0) {
      const regex = new RegExp(search, 'ig');
      const searchResult = rows.filter((item) => item.nama_bts.match(regex) || item.nama_pic.match(regex));
      setRows(searchResult);
    } else {
      setRows(dataRow.data);
    }
  }

  const handlePOP = (event) => {
    console.log(event.target, 'cek');
    setPOPLocal(event.target.value);
    console.log(event.target.value, 'how');
    const dataChanged = dataRow.data.filter((item) => {
      if (+item.pop_id === +event.target.value) {
        return item;
      }
    })
    if (event.target.value === 'all') {
      console.log(dataRow, 'cek gan');
      setRows(dataRow.data);
    } else {
      setRows(dataChanged);
    }
  };

  const [allPOP] = useAllPOPMutation();

  const getAllPOP = async () => {
    try {
      const data = await allPOP().unwrap();
      console.log(data, 'ceksaja');
      if (data.status === 'success') {
        dispatch(setPOP({ ...data }));
        console.log('set data', data);
        setdataPOP(data.data)
        console.log(dataPOP, 'pp');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBTS = async () => {
    try {
      const data = await allBts().unwrap();
      if (data.message === 'success') {
        dispatch(setBTS({ ...data }));
        setRows(data.data);
        console.log(data, 'data rows');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllPOP()
    getAllBTS();
  }, []);

  const getInfo = ($event) => {
    console.log($event);
    if ($event.status === 'success') {
      getAllBTS();
    }
  };

  return (
    <div>
      <div>
        <button
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md w-28"
          onClick={() => {
            setDetail(null);
            document.getElementById('my-modal-3').click();
          }}
        >
          Tambah
        </button>
      </div>
      <div className="flex gap-5 mt-5">
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
                placeholder="Cari data BTS..."
                value={search}
                onChange={onHandleSearch}
              />
            </div>
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="location" className="label font-semibold">
            <span className="label-text"> POP</span>
          </label>

          <select
            className="select w-full max-w-full input-bordered"
            onChange={handlePOP}
          >
            <option value="all" label="Semua">All</option>
            {dataPOP?.map((item) => (
              <option value={item.id_pop} label={item.pop}>{item.pop}</option>
            ))}
          </select>
        </div>
      </div>

      {/* modal craete or update */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <FormBTS getInfo={getInfo} detail={detail} />

      {/* modal delete */}
      <input type="checkbox" id="my-modal-delete" className="modal-toggle" />
      <DeleteModal getInfo={getInfo} detail={detail} title="BTS" />

      {/* start table */}
      <div className="overflow-x-auto mt-8">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              {columns.map((item) => (
                <th className="text-center">{isLoading ? (<Skeleton count={1} />) : (item)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 &&
              rows.map((item, index) => (
                <tr className="text-center" id={item.id}>
                  <td id={item.id}>{!isSuccess ? (<Skeleton count={5} />) : (index + 1)}</td>
                  <td>{!isSuccess ? (<Skeleton count={5} />) : (item.nama_bts)}</td>
                  <td>{!isSuccess ? (<Skeleton count={5} />) : (item.nama_pic)}</td>
                  <td>{!isSuccess ? (<Skeleton count={5} />) : (item.nomor_pic)}</td>
                  <td>{!isSuccess ? (<Skeleton count={5} />) : (item.lokasi)}</td>
                  <td>{!isSuccess ? (<Skeleton count={5} />) : (item.kordinat)}</td>
                  <td>{!isSuccess ? (<Skeleton count={5} />) : (item.pop.pop)}</td>
                  <td>
                    {!isSuccess ? (<Skeleton count={5} />) : (

                      <div className="flex flex-row gap-3 justify-center">
                        <HiPencil
                          className="cursor-pointer"
                          size={20}
                          color="#D98200"
                          onClick={() => {
                            setDetail(item);
                            document.getElementById('my-modal-3').click();
                          }}
                        />
                        <HiTrash
                          size={20}
                          color="#FF2E00"
                          className="cursor-pointer"
                          onClick={() => {
                            setDetail(item);
                            document.getElementById('my-modal-delete').click();
                          }}
                        />
                        <HiEye
                          size={20}
                          color="#0D68F1"
                          className="cursor-pointer"
                          onClick={() => {}}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {isLoading ? (<Skeleton className="mt-5" count={1} />) : (
        <div className="flex justify-between mt-5 pb-20">
          <div className="flex flex-row gap-1">
            <label htmlFor="location" className="label font-semibold">
              <span className="label-text"> Halaman 1 dari 1</span>
            </label>
            <div className="form-control">
              <select className="select input-bordered">
                <option>5</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
          </div>
          <div className="">
            <div className="btn-group">
              <button className="btn btn-outline btn-active">1</button>
              <button className="btn btn-outline">2</button>
              <button className="btn btn-outline">3</button>
              <button className="btn btn-outline">4</button>
            </div>
          </div>
        </div>
      )}
      {/* end table */}
    </div>
  );
}
export default BaseTransceiverStation;
