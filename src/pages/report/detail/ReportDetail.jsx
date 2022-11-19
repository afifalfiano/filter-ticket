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

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectBreadcrumb, updateBreadcrumb } from "../../../store/features/breadcrumb/breadcrumbSlice";

/* eslint-disable jsx-a11y/label-has-associated-control */
function ReportDetail() {
  const navigasi = useSelector(selectBreadcrumb);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const data = [...navigasi.data, { path: `/report/detail/${id}`, title: 'Detail' }]
    dispatch(updateBreadcrumb(data))
  }, [])

  return <h1>Selamat Datang Detail</h1>
}

export default ReportDetail;