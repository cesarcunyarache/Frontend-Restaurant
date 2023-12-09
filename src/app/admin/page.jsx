"use client";

import React, { PureComponent } from "react";
import Load from "@/components/Load";
import Nuevo from "@/components/Table/Nuevo";
import {
  useGetTotalReservasQuery,
  useGetTotalRCCQuery,
  useGetReservasQuery,
} from "@/redux/services/reservaApi";
import Table from "@/components/Table";
import { Card, CardBody } from "@nextui-org/react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,

  LineChart,





  ReferenceLine,

} from "recharts";

 const dataReserva = [
  {
    fecha: "2023-11-10",
    reservasTotales: 15,
    reservasConfirmadas: 12,
    reservasCanceladas: 3,
  },
  {
    fecha: "2023-11-11",
    reservasTotales: 18,
    reservasConfirmadas: 15,
    reservasCanceladas: 3,
  },
  {
    fecha: "2023-11-12",
    reservasTotales: 20,
    reservasConfirmadas: 16,
    reservasCanceladas: 4,
  },
  {
    fecha: "2023-11-13",
    reservasTotales: 22,
    reservasConfirmadas: 18,
    reservasCanceladas: 4,
  },
  {
    fecha: "2023-11-14",
    reservasTotales: 15,
    reservasConfirmadas: 12,
    reservasCanceladas: 3,
  },
  {
    fecha: "2023-11-15",
    reservasTotales: 12,
    reservasConfirmadas: 10,
    reservasCanceladas: 2,
  },
  {
    fecha: "2023-11-16",
    reservasTotales: 18,
    reservasConfirmadas: 15,
    reservasCanceladas: 3,
  },
  {
    fecha: "2023-11-17",
    reservasTotales: 15,
    reservasConfirmadas: 12,
    reservasCanceladas: 3,
  },
  {
    fecha: "2023-11-18",
    reservasTotales: 12,
    reservasConfirmadas: 10,
    reservasCanceladas: 2,
  },
  {
    fecha: "2023-11-19",
    reservasTotales: 22,
    reservasConfirmadas: 18,
    reservasCanceladas: 4,
  },
  {
    fecha: "2023-11-20",
    reservasTotales: 15,
    reservasConfirmadas: 12,
    reservasCanceladas: 3,
  },
  {
    fecha: "2023-11-21",
    reservasTotales: 12,
    reservasConfirmadas: 10,
    reservasCanceladas: 2,
  },
  {
    fecha: "2023-11-22",
    reservasTotales: 18,
    reservasConfirmadas: 15,
    reservasCanceladas: 3,
  },
  {
    fecha: "2023-11-23",
    reservasTotales: 15,
    reservasConfirmadas: 12,
    reservasCanceladas: 3,
  },
  {
    fecha: "2023-11-24",
    reservasTotales: 12,
    reservasConfirmadas: 10,
    reservasCanceladas: 2,
  },
  /*  {
    "fecha": "2023-12-25",
    "reservasTotales": 22,
    "reservasConfirmadas": 18,
    "reservasCanceladas": 4
  },
  {
    "fecha": "2023-12-26",
    "reservasTotales": 15,
    "reservasConfirmadas": 12,
    "reservasCanceladas": 3
  },
  {
    "fecha": "2023-12-27",
    "reservasTotales": 12,
    "reservasConfirmadas": 10,
    "reservasCanceladas": 2
  },
  {
    "fecha": "2023-12-28",
    "reservasTotales": 18,
    "reservasConfirmadas": 15,
    "reservasCanceladas": 3
  },
  {
    "fecha": "2023-12-29",
    "reservasTotales": 15,
    "reservasConfirmadas": 12,
    "reservasCanceladas": 3
  } */
];


const data = [
  {
    fecha: "2023-11-10",
    numeroMesas: 9
  },
  {
    fecha: "2023-11-11",
    numeroMesas: 3
  },
  {
    fecha: "2023-11-12",
    numeroMesas: 5
  },
  {
    fecha: "2023-11-13",
    numeroMesas: 10
  },
  {
    fecha: "2023-11-14",
    numeroMesas: 10
  },
  {
    fecha: "2023-11-15",
    numeroMesas: 13
  },
  {
    fecha: "2023-11-16",
    numeroMesas: 10
  },
  {
    fecha: "2023-11-17",
    numeroMesas: 5
  },
  {
    fecha: "2023-11-18",
    numeroMesas: 10
  },
  {
    fecha: "2023-11-19",
    numeroMesas: 5
  },
  {
    fecha: "2023-11-20",
    numeroMesas: 10
  },
  {
    fecha: "2023-11-21",
    numeroMesas: 7
  },
  {
    fecha: "2023-11-22",
    numeroMesas: 20
  },
  {
    fecha: "2023-11-23",
    numeroMesas: 10
  },
  {
    fecha: "2023-11-24",
    numeroMesas: 11
  },
]


import Customers from "@/components/Icon/Customers";

export default function Page() {
  /*      const { data, isLoading, isError, error } = useGetTotalReservasQuery(); */

  const { data: totales, isLoading: isLoadingTotal} = useGetTotalRCCQuery();

  const { data: totalReser, isLoading: isLoadingReser} = useGetTotalReservasQuery();

 


  /*      console.log(data)


  
  const users = !isLoading ? data.data : [];  */



  const { data: reservas, isLoading } = useGetReservasQuery();

  const users = !isLoading ? reservas.data : [];

  const inicialVisibleColumns = [
    "idReserva",
    "infoClient",
    "fecha",
    "hora",
    "estadoReserva",
    "nombres",
    "accionReserva",
  ];

  const columns = [
    { name: "ID", uid: "idReserva", sortable: true, search: true },
    { name: "Información Personal", uid: "infoClient" },
    { name: "Fecha", uid: "fecha", sortable: true, search: true },
    { name: "Hora", uid: "hora", sortable: true, search: true },
    { name: "Estado", uid: "estadoReserva" },
    { name: "Nombres", uid: "nombres", sortable: true, search: true },
    {
      name: "Número de documento",
      uid: "numeroDoc",
      sortable: true,
      search: true,
    },
    { name: "Accion", uid: "accionReserva" },
  ];


  return (
    <div className="max-w-7xl h-full p-4">
      {/*  {isLoading ? (
        <Load/>
      ) : ( */}

      <div className="flex flex-1  w-full gap-4">
        <Card key={1} className="w-full rounded-lg">
          <CardBody>
            <div className="flex flex-1">
              <div className="w-full">
                <span className="text-xs text-zinc-500 font-semibold">
                  Total de Reservas
                </span>
                <h1 className="text-3xl font-extrabold pt-1">
                  {totales?.data[0]?.Reservas}
                </h1>
              </div>
              <div className="flex justify-center items-center">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 28 28"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-16 h-16`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card key={2} className="w-full rounded-lg">
          <CardBody>
            <div className="flex flex-1">
              <div className="w-full">
                <span className="text-xs text-zinc-500 font-semibold">
                  Total de Clientes
                </span>
                <h1 className="text-3xl font-extrabold pt-1">
                  {totales?.data[0]?.Clientes}
                </h1>
              </div>
              <div className="">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 28 28"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-16 h-16`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card key={1} className="w-full rounded-lg">
          <CardBody>
            <div className="flex flex-1">
              <div className="w-full">
                <span className="text-xs text-zinc-500 font-semibold">
                  Total de Colaboradores
                </span>
                <h1 className="text-3xl font-extrabold pt-1">
                  {totales?.data[0]?.Colaboradores}
                </h1>
              </div>
              <div className="">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 28 28"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-16 h-16`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <div className="w-full border rounded-lg bg-white p-4 mt-2">
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <ComposedChart
                width={500}
                height={400}
                data={dataReserva}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="fecha" scale="band" className="ml-10" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="reservasTotales"
                  fill="#5f96de"
                  stroke="#5f96de"
                />
                <Bar
                  dataKey="reservasConfirmadas"
                  barSize={20}
                  fill="#828783"
                />
                <Line
                  type="monotone"
                  dataKey="reservasCanceladas"
                  stroke="#ff7300"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full border rounded-lg bg-white p-4 mt-2">
          <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="numeroMesas" stroke="#3066c9" activeDot={{ r: 8 }} />
      
        </LineChart>
      </ResponsiveContainer>
          </div>
        </div>


       
      </div>
      <div className="w-full border rounded-lg mt-4 bg-white p-4">
        <Table
          inicialVisibleColumns={inicialVisibleColumns}
          columns={columns}
          isLoading={isLoading}
          data={users}
          btn="Escanear Qr"
          btnLink="reservas/escanear"
          status={true} 
          isSearch = {false}
        />
      </div>
    </div>
  );
}
