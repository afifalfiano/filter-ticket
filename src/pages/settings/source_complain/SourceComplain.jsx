/* eslint-disable no-plusplus */
/* eslint-disable default-param-last */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import { useDispatch, useSelector } from 'react-redux';
import { HiSearch, HiTrash, HiEye, HiPencil } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';
import DeleteModal from '../../../components/common/DeleteModal';
import SkeletonTable from '../../../components/common/table/SkeletonTable';
import Pagination from '../../../components/common/table/Pagination';
import { useAllSumberKeluhanMutation } from '../../../store/features/sumber_keluhan/sumberKeluhanApiSlice';
import { selectAllSumberKeluhan, setSumberKeluhan } from '../../../store/features/sumber_keluhan/sumberKeluhanSlice';
import FormSumberKeluhan from './FormSumberKeluhan';

function SourceComplain() {
  const dispatch = useDispatch();
  const columns = ['No', 'Nama', 'Aksi'];

  const [rows, setRows] = useState([]);
  const [allSumberKeluhan, { isLoading }] = useAllSumberKeluhanMutation();
  const [detail, setDetail] = useState(null);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('update');
  const dataRow = useSelector(selectAllSumberKeluhan);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    currentFilterPage: 5,
    pageNumbers: [1],
    filterPage: [5, 10, 25, 50, 100]
  });

  const handlePagination = (targetPage = 1, data) => {
    console.log(data, 'opo ikih');
    setPagination({ ...pagination, currentPage: targetPage, currentFilterPage: pagination.currentFilterPage })
    console.log(pagination, 'cek ombak');
    const indexOfLastPost = targetPage * pagination.currentFilterPage;
    const indexOfFirstPost = indexOfLastPost - pagination.currentFilterPage;
    let currentPosts;
    if (data === undefined) {
      currentPosts = dataRow?.data.slice(indexOfFirstPost, indexOfLastPost);
    } else {
      currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
    }
    setRows(currentPosts);
  }

  const doGetPageNumber = (dataFix) => {
    console.log(dataFix, 'fixxxxxx ');
    console.log(pagination.currentFilterPage, 'filpter');
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataFix.length / pagination.currentFilterPage); i++) {
      pageNumbers.push(i);
    }
    console.log(pageNumbers, 'cekk');
    setPagination({ ...pagination, pageNumbers });
  }

  const handleFilterPagination = (selectFilter) => {
    // setPagination({ ...pagination, currentFilterPage: selectFilter });
    const indexOfLastPost = pagination.currentPage * selectFilter;
    const indexOfFirstPost = indexOfLastPost - selectFilter;
    const currentPosts = dataRow?.data.slice(indexOfFirstPost, indexOfLastPost);
    setRows(currentPosts);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataRow.data.length / selectFilter); i++) {
      pageNumbers.push(i);
    }
    console.log(pageNumbers, 'cekk');
    setPagination({ ...pagination, pageNumbers, currentFilterPage: selectFilter });
    console.log('cek ombak filter', pagination);
  }

  const getAllSumberKeluhan = async () => {
    try {
      const data = await allSumberKeluhan().unwrap();
      console.log(data, 'dat nig');
      if (data.status === 'success') {
        dispatch(setSumberKeluhan({ ...data }));
        setRows(data.data);
        handlePagination(1, data.data);
        doGetPageNumber(data.data);
        console.log({ ...data }, 'data rows');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onHandleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value.length > 0) {
      const regex = new RegExp(search, 'ig');
      const searchResult = dataRow.data.filter((item) => item.sumber.match(regex));
      setRows(searchResult);
      setPagination({
        currentPage: 1,
        currentFilterPage: 100,
        pageNumbers: [1],
        filterPage: [5, 10, 25, 50, 100]
      });
    } else {
      setRows(dataRow.data);
      setPagination({
        currentPage: 1,
        currentFilterPage: 100,
        pageNumbers: [1],
        filterPage: [5, 10, 25, 50, 100]
      });
    }
  };

  const getInfo = ($event) => {
    console.log($event);
    if ($event.status === 'success') {
      getAllSumberKeluhan();
    }
  };

  useEffect(() => {
    dispatch(
      updateBreadcrumb([
        { path: '/source_complain', title: 'Pengaturan Sumber Keluhan' },
      ])
    );
    getAllSumberKeluhan();
  }, []);

  return (
    <div>
      <div>
        <button
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md w-28"
          onClick={() => {
            setDetail(null);
            setTitle('create');
            document.getElementById('my-modal-3').click();
          }}
        >
          Tambah
        </button>
      </div>

      {!isLoading && (
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
                  placeholder="Cari data sumber keluhan..."
                  value={search}
                  onChange={onHandleSearch}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* modal craete or update */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <FormSumberKeluhan getInfo={getInfo} detail={detail} titleAction={title} />

      {/* modal delete */}
      <input type="checkbox" id="my-modal-delete" className="modal-toggle" />
      <DeleteModal getInfo={getInfo} detail={detail} title="Sumber Keluhan" />

      {isLoading && (
        <SkeletonTable countRows={8} countColumns={10} totalFilter={1} />
      )}

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
                <tr className="text-center" key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.sumber}</td>
                  <td>
                    <div className="flex flex-row gap-3 justify-center">
                      <div className="tooltip" data-tip="Edit">
                        <HiPencil
                          className="cursor-pointer"
                          size={20}
                          color="#D98200"
                          onClick={() => {
                            setDetail(item);
                            setTitle('update');
                            document.getElementById('my-modal-3').click();
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
                            document.getElementById('my-modal-delete').click();
                          }}
                        />
                      </div>
                      {/* <div className="tooltip" data-tip="Detail">
                        <HiEye
                          size={20}
                          color="#0D68F1"
                          className="cursor-pointer"
                          onClick={() => {
                            setDetail(item);
                            setTitle('read');
                            document.getElementById('my-modal-3').click();
                          }}
                        />
                      </div> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!isLoading && <Pagination serverMode={false} currentFilterPage={pagination.currentFilterPage} perPage={pagination.filterPage} currentPage={pagination.currentPage} countPage={pagination.pageNumbers} onClick={(i) => handlePagination(i.target.id, undefined)} handlePerPage={(x) => handleFilterPagination(x.target.value)} />}
      {/* end table */}
    </div>
  );
}

export default SourceComplain;
