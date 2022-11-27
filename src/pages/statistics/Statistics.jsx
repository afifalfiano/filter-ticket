/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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
import { useDispatch } from 'react-redux';
import {
  BarChart, LineChart, Bar, Line, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import { useGetStatistikFilterMutation, useGetStatistikMutation } from '../../store/features/graph/graphApiSlice';
import dataInit from './data_init';

const dataInitFilter = [
  {
    name: 'all_pop',
    total: 0
  },
  {
    name: 'jogja',
    total: 0
  },
  {
    name: 'solo',
    total: 0
  },
  {
    name: 'purwokerto',
    total: 0
  },
  {
    name: 'all_rfo_gangguan',
    total: 0
  },
]

function Statistics() {
  const dispatch = useDispatch();
  const [dataGraph, setDataGraph] = useState(dataInit);
  // const [tanggalMulai, setTanggalMulai] = useState(null);
  // const [tanggalSelesai, setTanggalSelesai] = useState(null);
  const today = new Date();
  const format = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const [parameter, setParameter] = useState({ mulai: format, selesai: format });
  const [dataFilter, setDataFilter] = useState(dataInitFilter);
  const [getStatistik] = useGetStatistikMutation();
  const [getStatistikFilter] = useGetStatistikFilterMutation();

  const getDataStatistik = async () => {
    try {
      const data = await getStatistik().unwrap();
      if (data.status === 'success') {
        setDataGraph(data);
      }
      console.log(data, 'staistik');
    } catch (error) {
      console.log(error);
    }
  }

  const doGetStatistikByFilter = async () => {
    try {
      console.log(parameter, 'prm');
      const param = `?dari=${parameter?.mulai}&sampai=${parameter?.selesai}`;
      const data = await getStatistikFilter(param).unwrap();
      if (data.status === 'success') {
        console.log(data, 'staistik param');
        const dataFix = [
          {
            name: 'all_pop',
            total: data.data.all_rfo_gangguan
          },
          {
            name: 'jogja',
            total: data.data.jogja
          },
          {
            name: 'solo',
            total: data.data.solo
          },
          {
            name: 'purwokerto',
            total: data.data.purwokerto
          },
          {
            name: 'all_rfo_gangguan',
            total: data.data.all_rfo_gangguan
          },
        ]
        setDataFilter(dataFix);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleFilter = (event) => {
    const { id, value } = event.target;
    if (id === 'tanggal_mulai') {
      setParameter({ mulai: value, selesai: parameter.selesai });
      console.log(value, 'val mulai');
      console.log(parameter, 'param 1');
    }
    if (id === 'tanggal_selesai') {
      setParameter({ mulai: parameter.mulai, selesai: value });
      console.log(value, 'val seelsai');
      console.log(parameter, 'param 2');
    }

    setTimeout(() => {
      console.log(parameter, 'fix')
      doGetStatistikByFilter();
    }, 1000)
  };

  // console.log(dataDummy, 'dm');
  useEffect(() => {
    dispatch(updateBreadcrumb([{ path: '/statistics', title: 'Statistik' }]));
    getDataStatistik();
    doGetStatistikByFilter();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-1/2">
          <p className="label font-semibold justify-center">Filter Berdasarkan Tanggal</p>
          <div className="flex justify-between gap-10 mb-5">
            <div className="form-control">
              <label htmlFor="tanggal" className="label font-semibold">
                <span className="label-text"> Mulai</span>
              </label>

              <input type="date" name="" id="tanggal_mulai" defaultValue={format} onChange={handleFilter} className="input w-full max-w-full input-bordered" />
            </div>
            <div className="form-control">
              <label htmlFor="tanggal" className="label font-semibold">
                <span className="label-text"> Selesai</span>
              </label>

              <input type="date" name="" id="tanggal_selesai" defaultValue={format} onChange={handleFilter} className="input w-full max-w-full input-bordered" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height="100%" aspect="1">
            <LineChart
              width={500}
              height={300}
              data={dataFilter}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* <Bar dataKey="all_pop" fill="#8884d8" />
              <Bar dataKey="jogja" fill="#0f7d9e" />
              <Bar dataKey="solo" fill="#82ca9d" />
              <Bar dataKey="purwokerto" fill="#f89c38" /> */}
              {/* <Bar dataKey="total" fill="#c2f23d" /> */}
              <Line type="monotone" dataKey="total" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <hr className="mt-5" />
      <div className="flex justify-between flex-wrap">
        <div className="card p-5 w-1/2 h-auto">
          <p className="label font-semibold justify-center">Grafik Semua</p>
          <ResponsiveContainer width="100%" height="100%" aspect="1">
            <BarChart
              width={500}
              height={300}
              data={dataGraph?.all}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Nama" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Semua_Keluhan" fill="#8884d8" />
              <Bar dataKey="Semua_Keluhan_Closed" fill="#0f7d9e" />
              <Bar dataKey="Semua_Keluhan_Open" fill="#82ca9d" />
              <Bar dataKey="Semua_RFO_Keluhan" fill="#f89c38" />
              <Bar dataKey="Semua_RFO_Gangguan" fill="#c2f23d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5 w-1/2 h-auto">
          <p className="label font-semibold justify-center">Grafik Hari Ini</p>
          <ResponsiveContainer width="100%" height="100%" aspect="1">
            <BarChart
              width={500}
              height={300}
              data={dataGraph?.today}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Nama" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Semua_Keluhan" fill="#8884d8" />
              <Bar dataKey="Semua_Keluhan_Closed" fill="#0f7d9e" />
              <Bar dataKey="Semua_Keluhan_Open" fill="#82ca9d" />
              <Bar dataKey="Semua_RFO_Keluhan" fill="#f89c38" />
              <Bar dataKey="Semua_RFO_Gangguan" fill="#c2f23d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5 w-1/2 h-auto">
          <p className="label font-semibold justify-center">Grafik Kemarin</p>
          <ResponsiveContainer width="100%" height="100%" aspect="1">
            <BarChart
              width={500}
              height={300}
              data={dataGraph?.yesterday}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Nama" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Semua_Keluhan" fill="#8884d8" />
              <Bar dataKey="Semua_Keluhan_Closed" fill="#0f7d9e" />
              <Bar dataKey="Semua_Keluhan_Open" fill="#82ca9d" />
              <Bar dataKey="Semua_RFO_Keluhan" fill="#f89c38" />
              <Bar dataKey="Semua_RFO_Gangguan" fill="#c2f23d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5 w-1/2 h-auto">
          <p className="label font-semibold justify-center">Grafik Seminggu Lalu</p>
          <ResponsiveContainer width="100%" height="100%" aspect="1">
            <BarChart
              width={500}
              height={300}
              data={dataGraph?.a_week_ago}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Nama" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Semua_Keluhan" fill="#8884d8" />
              <Bar dataKey="Semua_Keluhan_Closed" fill="#0f7d9e" />
              <Bar dataKey="Semua_Keluhan_Open" fill="#82ca9d" />
              <Bar dataKey="Semua_RFO_Keluhan" fill="#f89c38" />
              <Bar dataKey="Semua_RFO_Gangguan" fill="#c2f23d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5 w-1/2 h-auto">
          <p className="label font-semibold justify-center">Grafik Bulan Ini</p>
          <ResponsiveContainer width="100%" height="100%" aspect="1">
            <BarChart
              width={500}
              height={300}
              data={dataGraph?.this_month}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Nama" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5 w-1/2 h-auto">
          <p className="label font-semibold justify-center">Grafik Tahun</p>
          <ResponsiveContainer width="100%" height="100%" aspect="1">
            <BarChart
              width={500}
              height={300}
              data={dataGraph?.this_year}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Nama" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Semua POP" fill="#f86042" />
              <Bar dataKey="Purwokerto" fill="#0f7d9e" />
              <Bar dataKey="Surakarta" fill="#82ca9d" />
              <Bar dataKey="Yogyakarta" fill="#f89c38" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Statistics;
