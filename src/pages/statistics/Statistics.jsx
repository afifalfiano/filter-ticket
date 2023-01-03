import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import catchError from '../../services/catchError';
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
  const today = new Date();
  const format = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const formatStart = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - 7}`;
  const [parameter, setParameter] = useState({ mulai: formatStart, selesai: format });
  const [dataFilter, setDataFilter] = useState(dataInitFilter);
  const [getStatistik] = useGetStatistikMutation();
  const [getStatistikFilter] = useGetStatistikFilterMutation();

  const getDataStatistik = async () => {
    try {
      const data = await getStatistik().unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        setDataGraph(data);
      } else {
        catchError(data);
      }
    } catch (error) {
      catchError(error);
    }
  }

  const doGetStatistikByFilter = async () => {
    try {
      const param = `?dari=${parameter?.mulai}&sampai=${parameter?.selesai}`;
      const data = await getStatistikFilter(param).unwrap();
      if (data.status === 'success' || data.status === 'Success') {
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
      } else {
        catchError(data);
      }
    } catch (error) {
      catchError(error);
    }
  }

  const handleFilter = (event) => {
    const { id, value } = event.target;
    if (id === 'tanggal_mulai') {
      setParameter({ mulai: value, selesai: parameter.selesai });
    }
    if (id === 'tanggal_selesai') {
      setParameter({ mulai: parameter.mulai, selesai: value });
    }

    setTimeout(() => {
      doGetStatistikByFilter();
    }, 1000)
  };

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
          <div className="flex gap-5 justify-center mb-5">
            <div className="form-control">
              <label htmlFor="tanggal" className="label font-semibold">
                <span className="label-text"> Mulai</span>
              </label>

              <input type="date" name="" id="tanggal_mulai" defaultValue={formatStart} onChange={handleFilter} className="input w-full max-w-full input-bordered" />
            </div>
            <div className="form-control">
              <label htmlFor="tanggal" className="label font-semibold">
                <span className="label-text"> Selesai</span>
              </label>

              <input type="date" name="" id="tanggal_selesai" defaultValue={format} onChange={handleFilter} className="input w-full max-w-full input-bordered" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
          <BarChart
              width={500}
              height={300}
              data={dataFilter}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              <Bar dataKey="total" fill="#f89c38" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <hr className="mt-5" />
      <div className="flex justify-between flex-wrap">
        <div className="card p-5 w-1/2 h-auto">
          <p className="label font-semibold justify-center">Grafik Semua</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={500}
              height={300}
              data={dataGraph?.all}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Nama" />
              <YAxis />
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
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
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={500}
              height={300}
              data={dataGraph?.today}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Nama" />
              <YAxis />
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
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
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={500}
              height={300}
              data={dataGraph?.yesterday}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Nama" />
              <YAxis />
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
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
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={500}
              height={300}
              data={dataGraph?.a_week_ago}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Nama" />
              <YAxis />
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
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
          <ResponsiveContainer width="100%" height={300}>
          <BarChart
              width={500}
              height={300}
              data={dataGraph?.this_month}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Nama" />
              <YAxis />
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              <Bar dataKey="Total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5 w-1/2 h-auto">
          <p className="label font-semibold justify-center">Grafik Tahun</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              width={500}
              height={300}
              data={dataGraph?.this_year}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Nama" />
              <YAxis />
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              <Line type="monotone" dataKey="Semua POP" stroke="#f86042" />
              <Line type="monotone" dataKey="Purwokerto" stroke="#0f7d9e" />
              <Line type="monotone" dataKey="Surakarta" stroke="#82ca9d" />
              <Line type="monotone" dataKey="Yogyakarta" stroke="#f89c38" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Statistics;
