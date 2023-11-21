"use client";

import { useGetColaboradoresQuery } from "@/redux/services/colaborador";
import Breadcrumbs from '@/components/Breadcrumbs'
import React from "react";
import Table from "@/components/Table";
export default function page() {
  const { data, isLoading, isError, error } = useGetColaboradoresQuery();

  const users = !isLoading ? data.data : [];


  const inicialVisibleColumns = [
    "id",
    "numeroDoc",
    "nombres", 
    "apellidos",
    "fechaNacimiento",
    "accion",
  ];

  const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "Tipo de Documento", uid: "idTipoDoc"},
    {name: "Número de documento", uid: "numeroDoc", sortable: true},
    {name: "Nombres", uid: "nombres", sortable: true},
    {name: "Apellidos", uid: "apellidos", sortable: true},
    {name: "Telefono", uid: "telefono", sortable: true},
    {name: "Fecha de Nacimiento", uid: "fechaNacimiento", sortable: true},
    {name: "Género", uid: "genero", sortable: true},
    {name: "Dirección", uid: "direccion"},
    {name: "Accion", uid: "accion"}, 
  ];

  return (
    <div className="p-4">
       <Breadcrumbs
        data={[
          {
            value: "Colaboradores",
            href: "/admin/colaboradores",
          },
          {
            value: "Lista",
            href: "/admin/colaboradores/",
          },
        ]}
        title={"Colaboradores"}
      />
      <div className="w-full h-full border rounded-lg mt-4 bg-white p-4">
        <Table
          inicialVisibleColumns={inicialVisibleColumns}
          columns={columns}
          isLoading={isLoading}
          data={users}
          btn="Nuevo Colaborador"
          btnLink="colaboradores/registro"
          /* status={true} */
        />
      </div>
    </div>
  );
}
