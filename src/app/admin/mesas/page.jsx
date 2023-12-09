"use client";

import { useGetMesasQuery } from "@/redux/services/reservaApi";
import Breadcrumbs from "@/components/Breadcrumbs";
import React, { useState } from "react";
import Button from "@/components/Form/Button";
import Table from "@/components/Table";
import Mesas from '@/components/Mesas'
export default function Page() {
   const { data, isLoading, isError, error } = useGetMesasQuery(); 

  const nivel = "2";

  console.log(data?.data);

  /* const users = !isLoading ? data.data : []; */

  const inicialVisibleColumns = [
    "idReserva",
    "infoClient",
    "fecha",
    "hora",
    "estadoReserva",
    "accionReserva",
  ];


  const columns = [
    { name: "ID", uid: "idReserva", sortable: true },
    { name: "Información Personal", uid: "infoClient" },
    { name: "Fecha", uid: "fecha", sortable: true, search: true },
    { name: "Hora", uid: "hora", sortable: true, search: true },
    { name: "Estado", uid: "estadoReserva", sortable: true },
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
    <div className="p-4">
      <Breadcrumbs
        data={[
          {
            value: "Mesas",
            href: "/admin/mesas",
          },
          {
            value: "Lista",
            href: "/admin/mesas/",
          },
        ]}
        title={"Mesas"}
      />
      <div className="w-full h-full border rounded-lg mt-4 bg-white p-4">
        <form className={``}>
          <div className=" w-[70%] border rounded-lg bg-white p-6  ">
            <div className="niveles">
              {nivel == "1" ? (
                <div className="imagenUno relative">
                  <img
                    className=""
                    src="https://freepass.es/storage/seatschart/August2023/1691687721290.png"
                    alt="Segundo nivel"
                  />
                  <div className="">
                    {!isLoading &&
                      data?.data?.map((mesa, index) => {
                        if (mesa.nivel == "S") {
                          return <Mesas key={index} data={mesa} />;
                        }
                      })}
                  </div>
                </div>
              ) : (
                <div className="imagenUno relative">
                  <img
                    className=""
                    src="https://freepass.es/storage/seatschart/November2023/1699428797713.png"
                    alt="Tercer nivel"
                  />
                  <div className="">
                    {!isLoading &&
                      data?.data?.map((mesa, index) => {
                        if (mesa.nivel == "Terraza") {
                          return <Mesas key={index} data={mesa} />;
                        }
                      })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
