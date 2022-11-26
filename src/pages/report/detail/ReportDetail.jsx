/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
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

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectBreadcrumb, updateBreadcrumb } from "../../../store/features/breadcrumb/breadcrumbSlice";
import { useGetOneReportMutation } from "../../../store/features/report/reportApiSlice";

/* eslint-disable jsx-a11y/label-has-associated-control */
function ReportDetail({ detailData }) {
  console.log(detailData, 'detail data')
  // const navigasi = useSelector(selectBreadcrumb);
  // const { id } = useParams();
  // const dispatch = useDispatch();
  // const [getOneReport] = useGetOneReportMutation();
  // const [detail, setDetail] = useState(null);

  // const getDetailReport = async () => {
  //   try {
  //     const id = detailData.id_laporan;
  //     const data = await getOneReport(id).unwrap();
  //     console.log(data, 'data');
  //     if (data.status === 'success') {
  //       setDetail(data.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  useEffect(() => {
    // const data = [...navigasi.data, { path: `/report/detail/${id}`, title: 'Detail' }]
    // dispatch(updateBreadcrumb(data))
    // getDetailReport();
  }, [])

  const onBtnBack = () => {
    document.getElementById('my-modal-detail').click();
  }

  return (
    <div className="modal">
      <div className="modal-box max-w-2xl">
        <label
          htmlFor="my-modal-3"
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onBtnBack}
        >
          ✕
        </label>
        <h3 className="text-lg font-bold">
          Detail Laporan
        </h3>
        <hr className="my-2" />
        <div className="overflow-x-auto">
          <table className="table w-full border-0">
            <thead>
              <tr>
                {/* <th />
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Tanggal</th>
                <td>:</td>
                <td>{detailData?.tanggal || '-'}</td>
              </tr>
              <tr>
                <th>Shift</th>
                <td>:</td>
                <td>{`${detailData?.shift.shift} (${detailData?.shift.mulai}) - (${detailData?.shift.selesai})` || '-'}</td>
              </tr>
              <tr>
                <th>Petugas NOC</th>
                <td>:</td>
                <td>{detailData?.noc || '-'}</td>
              </tr>
              <tr>
                <th>Petugas HELPDESK</th>
                <td>:</td>
                <td>{detailData?.helpdesk || '-'}</td>
              </tr>
              <tr>
                <th>POP</th>
                <td>:</td>
                <td>{detailData?.pop.pop || '-'}</td>
              </tr>
              <tr>
                <th>File Laporan</th>
                <td>:</td>
                <td><a href={detailData?.lampiran_laporan} className="link link-hover" target="_blank" rel="noreferrer">Download file</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr className="my-2 mt-10" />
        <div className="modal-action justify-center">
          <button
            type="button"
            htmlFor="my-modal-3"
            className="btn btn-md"
            onClick={() => {
              onBtnBack();
            }}
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReportDetail;