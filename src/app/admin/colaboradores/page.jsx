"use client";
import { useGetColaboradoresQuery } from "@/redux/services/userApi";

import React from "react";
import Table from "@/components/Table";
export default function page() {
  const { data, isLoading } = useGetColaboradoresQuery();

  const users = !isLoading ? data.data : [];

  const inicialVisibleColumns = [
    "id",
    "nombres",
    "apellidos",
    "telefono",
    "fechaNacimiento",
    "acciones",
  ];

  const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "Nombres", uid: "nombres", sortable: true},
    {name: "Apellidos", uid: "apellidos", sortable: true},
    {name: "Telefono", uid: "telefono", sortable: true},
    {name: "Fecha de Nacimiento", uid: "fechaNacimiento"},
    {name: "Acciones", uid: "acciones"}, 
  ];

  return (
    <div className="p-4">
      <div className="w-full h-full border rounded-lg bg-white p-4">
        <Table
          inicialVisibleColumns={inicialVisibleColumns}
          columns={columns}
          isLoading={isLoading}
          data={users}
          btn="Nuevo Colaborador"
          btnLink="colaboradores/registro"
          status={true}
        />
      </div>
    </div>
  );
}
