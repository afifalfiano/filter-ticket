/* eslint-disable */

import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAllNotification } from "../../store/features/notification/notificationSlice";

const ModalNotification = ({ data = [] }) => {

  console.log(data, 'data nihhhhh')

  return (
    <>
      <div
        tabIndex={0}
        className="mt-3 card card-compact dropdown-content w-96 bg-neutral shadow"
      >
        <div className="card-body">
          <span className="font-bold text-lg">Pemberitahuan</span>
          {
            data?.map((item) => (
            <div className="card-body bg-white rounded-md" id={item.id}>
            <span className="text-base text-slate-800">{item.title}</span>
            <span className="text-small text-slate-400">{item.desc}</span>
            </div>
            ))
          }
          {data.length === 0 && (
            <div className="card-body bg-white rounded-md text-center">
            <span className="text-base text-gray-900">Tidak ada pemberitahuan</span>
            </div>
          )}
            {/* <div className="card-body bg-white rounded-md">
            <span className="text-base text-gray-900">Comming Soon...</span>
            </div>
            <div className="card-body bg-white rounded-md">
            <span className="text-base text-gray-900">Comming Soon...</span>
            </div>
            <div className="card-body bg-white rounded-md">
            <span className="text-base text-gray-900">Comming Soon...</span>
            </div> */}
          <div className="card-actions mt-3">
            <button className="btn btn-primary btn-block btn-sm">Lihat Semua</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalNotification;