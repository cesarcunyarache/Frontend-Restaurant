"use client";

import { useGetMeserosQuery } from "@/redux/services/meseroApi";
import Breadcrumbs from "@/components/Breadcrumbs";
import React from "react";
import Table from "@/components/Table";
import { useGetCategoriasQuery } from "@/redux/services/categoriaApi";
import Button from "@/components/Form/Button";
import { PlusIcon } from "@/components/Icon/PlusIcon";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data, isLoading, isError, error } = useGetCategoriasQuery();

  const router = useRouter();
  const users = !isLoading ? data?.data : [];

  console.log(users)


  const inicialVisibleColumns = [
    "idCategoria",
    "categoria",
    "imagen",
    "estado",
    "accionEditarCategoria",
  ];

  const columns = [
    { name: "ID", uid: "idCategoria", sortable: true },
    {
      name: "Imagen",
      uid: "imagen",
    },
    { name: "Categoria", uid: "categoria",  sortable: true, search: true },
    { name: "Descipción", uid: "descripcion", search: true },
    {
      name: "Estado",
      uid: "estado",
      sortable: true,
      search: true,
    },
    { name: "Accion", uid: "accionEditarCategoria" },
  ];

  return (
    <div className="p-4">
      <Breadcrumbs
        data={[
          {
            value: "Categorias",
            href: "/admin/categorias",
          },
          {
            value: "Lista",
            href: "/admin/categorias/",
          },
        ]}
        title={"Categorias"}
      />
      <div className="w-full h-full border rounded-lg mt-4 bg-white p-4">
        <Table
          inicialVisibleColumns={inicialVisibleColumns}
          columns={columns}
          isLoading={isLoading}
          data={users}
          isActiveBtn={true}
          btn="Nueva Categoria"
          btnLink="Categorias/categ"
          statusFilterDrown={true}
          buttonTable={<Button
            endContent={<PlusIcon />}
            onClick={() => {
              router.push("categorias/registro");
            }}
          > Nueva Categoria</Button>}
        />
      </div>
    </div>
  );
}
