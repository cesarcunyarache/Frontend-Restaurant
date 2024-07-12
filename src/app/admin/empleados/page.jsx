"use client";

import { useGetColaboradoresQuery } from "@/redux/services/colaboradorApi";
import Breadcrumbs from '@/components/Breadcrumbs'
import React from "react";
import Table from "@/components/Table";
import { useRouter } from "next/navigation";

import Button from "@/components/Form/Button";
import { PlusIcon } from "@/components/Icon/PlusIcon";

export default function Page() {
  const { data, isLoading, isError, error } = useGetColaboradoresQuery();

  const users = !isLoading ? data?.data : [];

  const router = useRouter();

  const inicialVisibleColumns = [
    "idEmpleado",
    "numeroDoc",
    "nombres",
    "apellidos",
    "fechaNacimiento",
    "accion",
  ];

  const columns = [
    { name: "ID", uid: "idEmpleado", sortable: true },
    { name: "Tipo de Documento", uid: "idTipoDoc", search: true },
    { name: "Número de documento", uid: "numeroDoc", sortable: true, search: true },
    { name: "Nombres", uid: "nombres", sortable: true, search: true },
    { name: "Apellidos", uid: "apellidos", sortable: true, search: true },
    { name: "Telefono", uid: "telefono", sortable: true, search: true },
    { name: "Fecha de Nacimiento", uid: "fechaNacimiento", sortable: true, search: true },
    { name: "Género", uid: "genero", sortable: true, search: true },
    { name: "Dirección", uid: "direccion", search: true },
    { name: "Accion", uid: "accion" },
  ];

  return (
    <div className="p-4">
      <Breadcrumbs
        data={[
          {
            value: "Empleados",
            href: "/admin/empleados",
          },
          {
            value: "Lista",
            href: "/admin/empleados/",
          },
        ]}
        title={"Empleados"}
      />
      <div className="w-full h-full border rounded-lg mt-4 bg-white p-4">
        <Table
          inicialVisibleColumns={inicialVisibleColumns}
          columns={columns}
          isLoading={isLoading}
          data={users}
          isActiveBtn={true}
          btn="Nuevo Colaborador" 
          /* status={true} */
          buttonTable={<Button
            endContent={<PlusIcon />}
            onClick={() => {
              router.push("empleados/registro");
            }}
          > Nuevo Empleado</Button>}
          
        />
      </div>
    </div>
  );
}
