"use client";

import { useGetMeserosQuery } from "@/redux/services/meseroApi";
import Breadcrumbs from '@/components/Breadcrumbs'
import React from "react";
import Table from "@/components/Table";
export default function Page() {
  const { data, isLoading, isError, error } = useGetMeserosQuery();

  const users = !isLoading ? data.data : [];


  const inicialVisibleColumns = [
    "id",
    "infoMesero",
    "estadoMesero", 
    "accionMesero",
  ];

  const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "Información Personal", uid: "infoMesero"},
    {name: "Nombres", uid: "nombres", sortable: true, search: true},
    {name: "Número de documento", uid: "numeroDoc", sortable: true, search: true},
    {name: "Estado", uid: "estadoMesero", sortable: true},
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
          statusMeseros={true} 
        />
      </div>
    </div>
  );
}
