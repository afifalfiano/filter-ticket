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
function ReportDetail() {
  const navigasi = useSelector(selectBreadcrumb);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [getOneReport] = useGetOneReportMutation();
  const [detail, setDetail] = useState(null);

  const getDetailReport = async () => {
    try {
      const data = await getOneReport(id).unwrap();
      console.log(data, 'data');
      if (data.status === 'success') {
        setDetail(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const data = [...navigasi.data, { path: `/report/detail/${id}`, title: 'Detail' }]
    dispatch(updateBreadcrumb(data))
    getDetailReport();
  }, [])

  return (
    <>
      <p><strong>Tanggal</strong> : {detail?.tanggal || '-'}</p>
      <p><strong>Shift</strong>: {`${detail?.shift.shift} (${detail?.shift.mulai}) - (${detail?.shift.selesai})` || '-'} </p>
      <p><strong>Petugas</strong>: {detail?.petugas || '-'}</p>
      <p><strong>POP</strong>: {detail?.pop.pop || '-'}</p>
      <p><strong>File Laporan</strong>: <a href={detail?.lampiran_laporan} className="link link-hover" target="_blank" rel="noreferrer">Download file</a></p>

    </>
  )
}

export default ReportDetail;