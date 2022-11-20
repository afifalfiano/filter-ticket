/* eslint-disable no-shadow */
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
import { useState, useEffect } from 'react';
import {
  HiOutlineCloudUpload,
  HiSearch,
  HiPencil,
  HiTrash,
  HiEye,
  HiOutlineClipboardCheck,
  HiOutlineClipboardList,
  HiQuestionMarkCircle,
  HiExclamation,
} from 'react-icons/hi';
import { FaUndoAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styles from './Dashboard.module.css';
import { useAllComplainMutation } from '../../store/features/complain/complainApiSlice';
import { selectAllComplain, setComplain } from '../../store/features/complain/complainSlice';
import DeleteModal from '../../components/common/DeleteModal';
import RenderModal from '../../components/modal/Modal';
import ComplainModalForm from './modal/ComplainModalForm';
import RFOMasalModal from './modal/RFOMasalModal';
import { useAllPOPMutation } from '../../store/features/pop/popApiSlice';
import { setPOP } from '../../store/features/pop/popSlice';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import { useAllSumberKeluhanMutation } from '../../store/features/sumber_keluhan/sumberKeluhanApiSlice';
import { setSumberKeluhan } from '../../store/features/sumber_keluhan/sumberKeluhanSlice';
import ReopenModal from '../history_dashboard/ReopenModal';
import SkeletonTable from '../../components/common/table/SkeletonTable';
import Pagination from '../../components/common/table/Pagination';
import { selectCurrentUser } from '../../store/features/auth/authSlice';

function Dashboard() {
  const columns = [
    'No',
    'POP',
    'ID Pelanggan',
    'Nama Pelanggan',
    'Kontak',
    'Keluhan',
    'Progress',
    'Waktu',
    'Status',
    'Aksi',
  ];
  const [statusData, setStatusData] = useState('open');
  const [detail, setDetail] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [allComplain, { isLoading, isSuccess }] = useAllComplainMutation();
  const dispatch = useDispatch();

  const { data: user } = useSelector(selectCurrentUser);

  const [search, setSearch] = useState('');
  const [dataPOP, setdataPOP] = useState([]);
  const [pop, setPOPLocal] = useState('all');
  const dataRow = useSelector(selectAllComplain);

  const getAllComplain = async () => {
    try {
      const data = await allComplain().unwrap();
      if (data.status === 'success') {
        setShowTable(true);
        let dataFix;
        if (user.role_id === 2) {
          const dataFilter = data.data.filter((item) => {
            if (item.pop_id === user.pop_id) {
              return item;
            }
          });
          dataFix = dataFilter
          dispatch(setComplain({ data: dataFix }));
          setRows(dataFix);
          console.log(dataFix, 'data complain');
        } else {
          const dataFilter = data.data.filter((item) => {
            if (item.status === statusData) {
              return item;
            }
          });
          dispatch(setComplain({ ...data }));
          setRows(dataFilter);
          console.log(dataFilter, 'data complain');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onHandleSearch = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    console.log(event.target.value.length, 'ooo');
    setSearch(event.target.value);

    if (event.target.value.length > 0) {
      const regex = new RegExp(search, 'ig');
      const searchResult = rows.filter((item) => item.id_pelanggan.match(regex) || item.nama_pelanggan.match(regex) || item.nama_pelapor.match(regex) || item.nomor_pelapor.match(regex));
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
      if (+item.pop_id === +event.target.value && item.status === statusData) {
        return item;
      }
    })
    if (event.target.value === 'all') {
      console.log(dataRow, 'cek gan');
      setRows(dataRow.data.filter((item) => item.status === statusData));
    } else {
      setRows(dataChanged);
    }
  };

  const [allPOP] = useAllPOPMutation();

  const [allSumberKeluhan] = useAllSumberKeluhanMutation();

  const getAllSumberKeluhan = async () => {
    try {
      const data = await allSumberKeluhan().unwrap();
      console.log(data, 'ceksaja sumber');
      if (data.status === 'success') {
        dispatch(setSumberKeluhan({ ...data }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPOP = async () => {
    try {
      const data = await allPOP().unwrap();
      console.log(data, 'ceksaja');
      if (data.status === 'success') {
        console.log(user, 'user nih');
        let dataFix;
        if (user.role_id === 2) {
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
        setdataPOP(dataFix);
        console.log(dataPOP, 'pp');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(updateBreadcrumb([{ path: '/dashboard', title: 'Dasbor' }]))
    getAllPOP()
    getAllSumberKeluhan();
    getAllComplain();
    const intervalId = setInterval(() => {
      getAllComplain();
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleStatus = (event) => {
    setStatusData(event.target.value);
    console.log(event.target.value, 'status');
    console.log(dataRow, 'row');
    const dataChanged = dataRow.data.filter((item) => {
      if (item.status === event.target.value) {
        return item;
      }
    })
    setRows(dataChanged);
  };

  const getInfo = ($event) => {
    console.log($event);
    if ($event.status === 'success') {
      getAllComplain();
    }
  };

  return (
    <div>
      {statusData === 'open' && (
      <div>
        <button
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md w-28"
          htmlFor="my-modal-complain"
          onClick={() => {
            setDetail(null);
            setShowModal(true);
            document.getElementById('my-modal-complain').click();
          }}
        >
          Tambah
        </button>
      </div>
      )}

      {!isLoading && (
      <div className="flex gap-5 mt-5">
        <div className="form-control">
          <label htmlFor="location" className="label font-semibold">
            <span className="label-text"> Status Keluhan</span>
          </label>

          <select
            className="select w-full max-w-full input-bordered"
            onChange={handleStatus}
          >
            <option value="open" label="Open Case">Open Case</option>
            <option value="closed" label="Closed Case">Closed Case</option>
          </select>
        </div>

        <div className="form-control w-40">
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
                placeholder="Cari data keluhan..."
                value={search}
                onChange={onHandleSearch}
              />
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Modal tambah */}
      <input type="checkbox" id="my-modal-complain" className="modal-toggle" />
      {/* <RenderModal> */}
      {/* {showModal && <ModalActivity onClose={setShowModal} detail={detail} title="edit" />} */}
      {showModal && <ComplainModalForm onClose={setShowModal} detail={detail} getInfo={getInfo} /> }
      {/* </RenderModal> */}

      {/* Modal rfo masal */}
      <input type="checkbox" id="my-modal-rfo-masal" className="modal-toggle" />
      <RFOMasalModal detail={detail} getInfo={getInfo} />

      {/* modal delete */}
      <input type="checkbox" id="my-modal-delete" className="modal-toggle" />
      <DeleteModal getInfo={getInfo} detail={detail} title="keluhan" />

      {/* modal revert */}
      <input type="checkbox" id="my-modal-revert" className="modal-toggle" />
      <ReopenModal getInfo={getInfo} detail={detail} />

      {isLoading && <SkeletonTable countRows={8} countColumns={10} totalFilter={3} />}
      {/* start table */}

      {!isLoading && (
      <div className="overflow-x-auto mt-8">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              {columns.map((item) => (
                <th className="text-center">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((item, index) => (
              <tr className="text-center">
                <th>{index + 1}</th>
                <td className="text-left">
                  { item?.pop?.pop === 'Yogyakarta' ? (
                    <span className="badge badge-success text-white">
                      {item?.pop?.pop}
                    </span>
                  ) : item?.pop?.pop === 'Solo' ? (
                    <span className="badge badge-warning text-white">
                      {item?.pop?.pop}
                    </span>
                  ) : item?.pop?.pop === 'Purwokerto' ? (
                    <span className="badge badge-info text-white">
                      {item?.pop?.pop}
                    </span>
                  ) : (
                    <span className="badge text-white">
                      {item?.pop?.pop}
                    </span>
                  )}
                </td>
                <td>{(item?.id_pelanggan)}</td>
                <td>{(item?.nama_pelanggan)}</td>
                <td>{item?.nama_pelapor} - {item?.nomor_pelapor}</td>
                <td className="text-left">{(item?.keluhan)}</td>
                <td className="text-left">{(item?.balasan.length > 0 ? item?.balasan[item.balasan.length - 1].balasan.slice(0, 20) + '...' : 'Belum ada tindakan')}</td>
                <td className="text-left">
                  <p>
                    Dibuat:
                    {new Date(item?.created_at).toLocaleString('id-ID')}
                  </p>
                  <p>
                    Diubah:
                    {item?.balasan.length > 0
                      ? new Date(item?.balasan[item.balasan.length - 1].created_at).toLocaleString('id-ID')
                      : new Date(item?.created_at).toLocaleString('id-ID')}
                  </p>
                </td>
                <td>
                  {item?.status === 'open' ? (
                    <span className="badge badge-accent text-white">
                      {item?.status}
                    </span>
                  ) : (
                    <span className="badge badge-info text-white">
                      {item?.status}
                    </span>
                  )}
                </td>
                <td>
                  <div className="flex flex-row gap-3 justify-center">
                    { statusData === 'open' ? (
                      <>
                        <div className="tooltip" data-tip="Edit">
                          <HiPencil
                            className="cursor-pointer"
                            size={20}
                            color="#D98200"
                            onClick={() => {
                              setDetail(item);
                              document.getElementById('my-modal-complain').click();
                            }}
                          />
                        </div>
                        <div className="tooltip" data-tip="Hapus">
                          <HiTrash
                            size={20}
                            color="#FF2E00"
                            className="cursor-pointer"
                            onClick={() => {
                              setDetail(item);
                              document
                                .getElementById('my-modal-delete')
                                .click();
                            }}
                          />
                        </div>
                        <div className="tooltip" data-tip="Detail">
                          <HiEye
                            size={20}
                            color="#0D68F1"
                            className="cursor-pointer"
                            onClick={() => {
                              navigate(`/dashboard/detail/${item.id_keluhan}`);
                            }}
                          />
                        </div>
                        <div className="tooltip" data-tip="RFO Keluhan">
                          <HiOutlineClipboardCheck
                            size={20}
                            color="#065F46"
                            className="cursor-pointer"
                            onClick={() => {
                              navigate(`/dashboard/rfo_single/${item.id_keluhan}?id_rfo=${item.rfo_keluhan_id}`);
                            }}
                          />
                        </div>
                        <div className="tooltip" data-tip="RFO Gangguan">
                          <HiOutlineClipboardList
                            size={20}
                            color="#0007A3"
                            className="cursor-pointer"
                            onClick={() => {
                              setDetail(item);
                              document.getElementById('my-modal-rfo-masal').click();
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="tooltip" data-tip="Kembalikan Status Open">
                          <FaUndoAlt
                            size={20}
                            color="#D98200"
                            className="cursor-pointer"
                            onClick={() => {
                              setDetail(item);
                              document
                                .getElementById('my-modal-revert')
                                .click();
                            }}
                          />
                        </div>
                        <div className="tooltip" data-tip="Detail">
                          <HiEye
                            size={20}
                            color="#0D68F1"
                            className="cursor-pointer"
                            onClick={() => {
                              navigate(`/dashboard/detail/${item.id_keluhan}`);
                            }}
                          />
                        </div>
                        {item.rfo_keluhan_id !== null && (
                          <div className="tooltip" data-tip="RFO Keluhan">
                            <HiOutlineClipboardCheck
                              size={20}
                              color="#065F46"
                              className="cursor-pointer"
                              onClick={() => {
                                navigate(`/dashboard/rfo_single/${item.id_keluhan}?id_rfo=${item.rfo_keluhan_id}`);
                              }}
                            />
                          </div>
                        )}
                        {item.rfo_gangguan_id !== null && (
                          <div className="tooltip" data-tip="RFO Gangguan">
                            <HiOutlineClipboardList
                              size={20}
                              color="#0007A3"
                              className="cursor-pointer"
                              onClick={() => {
                                setDetail(item);
                                navigate(
                                  `/reason_of_outage/detail_masal/${item.rfo_gangguan_id}`
                                );
                              }}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
      {!isLoading && (<Pagination />)}
    </div>
  );
}

export default Dashboard;
