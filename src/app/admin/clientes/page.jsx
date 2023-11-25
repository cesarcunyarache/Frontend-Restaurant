"use client";

import { useGetClientesQuery } from "@/redux/services/clienteApi";
import Breadcrumbs from '@/components/Breadcrumbs'
import React from "react";
import Table from "@/components/Table";
export default function page() {
  const { data, isLoading, isError, error } = useGetClientesQuery();


  const users = !isLoading ? data.data : [];


  const inicialVisibleColumns = [
    "id",
    "numeroDoc",
    "nombres", 
    "apellidos",
    "fechaNacimiento",
   /*       "accion",  */
  ];

  const columns = [
    {name: "ID", uid: "id", sortable: true, search: true},
    {name: "Tipo de Documento", uid: "idTipoDoc", search: true},
    {name: "Número de documento", uid: "numeroDoc", sortable: true, search: true},
    {name: "Nombres", uid: "nombres", sortable: true, search: true},
    {name: "Apellidos", uid: "apellidos", sortable: true,  search: true},
    {name: "Telefono", uid: "telefono", sortable: true,  search: true},
    {name: "Fecha de Nacimiento", uid: "fechaNacimiento", sortable: true, search: true},
    {name: "Género", uid: "genero", sortable: true,  search: true},
  /*   {name: "Accion", uid: "accion"},  */
  ];

  return (
    <div className="p-4">
       <Breadcrumbs
        data={[
          {
            value: "Clientes",
            href: "/admin/clientes",
          },
          {
            value: "Lista",
            href: "/admin/clientes/",
          },
        ]}
        title={"Clientes"}
      />
      <div className="w-full h-full border rounded-lg mt-4 bg-white p-4">
        <Table
          inicialVisibleColumns={inicialVisibleColumns}
          columns={columns}
          isLoading={isLoading}
          data={users}
          isActiveBtn={false}
          /* status={true} */
        />
      </div>
    </div>
  );
}
