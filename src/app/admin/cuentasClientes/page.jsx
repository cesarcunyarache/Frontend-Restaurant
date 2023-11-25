"use client";

import { useGetUsuariosClientesQuery } from "@/redux/services/clienteApi";
import Breadcrumbs from '@/components/Breadcrumbs'
import React from "react";
import Table from "@/components/Table";
export default function page() {
  const { data, isLoading, isError, error } = useGetUsuariosClientesQuery();

  console.log(data);

  const users = !isLoading ? data.data : [];


  const inicialVisibleColumns = [
    "id",
    "correo",
    "name",
   /*  "acciones", */
  ];

  const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "Información Personal", uid: "name"},
    { name: "Correo", uid: "correo", sortable: true,  search: true },
    { name: "Contraseña", uid: "contrasena", sortable: true ,  search: true},
    {name: "Nombres", uid: "nombres", sortable: true, search: true},
    {name: "Número de documento", uid: "numeroDoc", sortable: true, search: true},
   /*  { name: "Accion", uid: "acciones" }, */
  ];

  return (
    <div className="p-4">
       <Breadcrumbs
        data={[
          {
            value: "Cuentas Clientes",
            href: "/admin/cuentasClientes",
          },
          {
            value: "Lista",
            href: "/admin/cuentasClientes/",
          },
        ]}
        title={"Cuentas Clientes"}
      />
      <div className="w-full h-full border rounded-lg mt-4 bg-white p-4">
        <Table
          inicialVisibleColumns={inicialVisibleColumns}
          columns={columns}
          isLoading={isLoading}
          data={users}
          btn="Nuevo Usuario"
          btnLink="usuarios/registro"
          /* status={true} */
        />
      </div>
    </div>
  );
}
