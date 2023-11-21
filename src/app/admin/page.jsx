"use client";

import React from "react";
import Load from "@/components/Load";
import Nuevo from "@/components/Table/Nuevo";
import { useGetUsuariosQuery } from "@/redux/services/usuariosApi";

export default function page() {
  const { data, isLoading, isError, error } = useGetUsuariosQuery();

  const users = !isLoading ? data.data : [];

  const inicialVisibleColumns = [
    "id",
    "correo",
    "contrasena",
    "idRol",
  ];

  const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "Correo", uid: "correo", sortable: true },
    { name: "Contraseña", uid: "contrasena", sortable: true },
    { name: "Apellidos", uid: "idRol", sortable: true },
    { name: "Accion", uid: "accion" },
  ];

  return (
    <div className="w-full h-full p-4">
     {/*  {isLoading ? (
        <Load/>
      ) : ( */}
        <div className="w-full h-full border rounded-lg bg-white p-4">
          <h1>Dashboard</h1>
         {/*  <Nuevo
            inicialVisibleColumns={inicialVisibleColumns}
            columns={columns}
            isLoading={isLoading}
            data={users}
            btn="Nuevo Colaborador"
            btnLink="colaboradores/registro"
          /> */}
        </div>
   {/*    )} */}
    </div>
  );
}
