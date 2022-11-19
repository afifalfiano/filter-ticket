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
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import { useGetStatistikMutation } from '../../store/features/graph/graphApiSlice';
import dataDummy from './dummy';

function Statistics() {
  const dispatch = useDispatch();
  const [getStatistik] = useGetStatistikMutation();

  const getDataStatistik = async () => {
    try {
      const data = await getStatistik().unwrap();
      console.log(data, 'staistik');
    } catch (error) {
      console.log(error);
    }
  }

  console.log(dataDummy, 'dm');
  useEffect(() => {
    dispatch(updateBreadcrumb([{ path: '/statistics', title: 'Statistik' }]));
    getDataStatistik();
  }, []);

  return (
    <div>
      <div className="flex justify-between flex-wrap">
        <div className="card p-5 w-1/2 h-auto">
          <p className="label font-semibold justify-center">Grafik Semua</p>
          <ResponsiveContainer width="100%" height="100%" aspect="1">
            <BarChart
              width={500}
              height={300}
              data={dataDummy.all}
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
              data={dataDummy.today}
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
              data={dataDummy.yesterday}
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
              data={dataDummy.a_week_ago}
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
              data={dataDummy.this_month}
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
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5 w-1/2 h-auto">
          <p className="label font-semibold justify-center">Grafik Tahun</p>
          <ResponsiveContainer width="100%" height="100%" aspect="1">
            <BarChart
              width={500}
              height={300}
              data={dataDummy.this_year}
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
              <Bar dataKey="all_pop" fill="#8884d8" />
              <Bar dataKey="jogja" fill="#0f7d9e" />
              <Bar dataKey="solo" fill="#82ca9d" />
              <Bar dataKey="purwokerto" fill="#f89c38" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Statistics;
