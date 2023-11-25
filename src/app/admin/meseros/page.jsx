"use client";

import { useGetMeserosQuery } from "@/redux/services/meseroApi";
import Breadcrumbs from '@/components/Breadcrumbs'
import React from "react";
import Table from "@/components/Table";
export default function page() {
  const { data, isLoading, isError, error } = useGetMeserosQuery();

  const users = !isLoading ? data.data : [];


  const inicialVisibleColumns = [
    "id",
    "infoMesero",
    "estado", 
    "accionMesero",
  ];

  const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "Información Personal", uid: "infoMesero"},
    {name: "Nombres", uid: "nombres", sortable: true, search: true},
    {name: "Número de documento", uid: "numeroD", sortable: true, search: true},
    {name: "Estado", uid: "estado", sortable: true},
    {name: "Accion", uid: "accionMesero"}, 
  ];

  return (
    <div className="p-4">
       <Breadcrumbs
        data={[
          {
            value: "Meseros",
            href: "/admin/meseros",
          },
          {
            value: "Lista",
            href: "/admin/meseros/",
          },
        ]}
        title={"Meseros"}
      />
      <div className="w-full h-full border rounded-lg mt-4 bg-white p-4">
        <Table
          inicialVisibleColumns={inicialVisibleColumns}
          columns={columns}
          isLoading={isLoading}
          data={users}
          isActiveBtn={true}
          btn="Nuevo Mesero"
          btnLink="meseros/registro"
          /* status={true} */
        />
      </div>
    </div>
  );
}
