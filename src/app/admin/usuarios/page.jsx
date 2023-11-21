"use client";

import { useGetUsuariosQuery } from "@/redux/services/usuariosApi";
import Breadcrumbs from '@/components/Breadcrumbs'
import React from "react";
import Table from "@/components/Table";
export default function page() {
  const { data, isLoading, isError, error } = useGetUsuariosQuery();

  const users = !isLoading ? data.data : [];


  const inicialVisibleColumns = [
    "id",
    "correo",
    "acciones",
  ];

  const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "Correo", uid: "correo", sortable: true },
    { name: "Contraseña", uid: "contrasena", sortable: true },
    { name: "Rol", uid: "idRol", sortable: true },
    { name: "Accion", uid: "acciones" },
  ];

  return (
    <div className="p-4">
       <Breadcrumbs
        data={[
          {
            value: "Usuarios",
            href: "/admin/usuarios",
          },
          {
            value: "Lista",
            href: "/admin/usuarios/",
          },
        ]}
        title={"Usuarios"}
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
