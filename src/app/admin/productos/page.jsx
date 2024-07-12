"use client";

import { useGetMeserosQuery } from "@/redux/services/meseroApi";
import Breadcrumbs from "@/components/Breadcrumbs";
import React from "react";
import Table from "@/components/Table";
import { useGetProductosQuery } from "@/redux/services/productoApi";
import { PlusIcon } from "@/components/Icon/PlusIcon";
import Button from "@/components/Form/Button";
import { useRouter } from "next/navigation";


export default function Page() {
  const { data, isLoading, isError, error } = useGetProductosQuery();
  const router = useRouter();
  const users =  !isLoading ? data?.data :  [];

  const inicialVisibleColumns = [
    "idProducto",
    "infoProducto",
    "categoria",
    "estado",
    "accionProducto",
  ];

  const columns = [
    { name: "ID", uid: "idProducto", sortable: true },
    { name: "Información de Producto", uid: "infoProducto" },
    { name: "Nombre", uid: "nombre", sortable: true, search: true },
    {
      name: "Precio",
      uid: "precio",
      sortable: true,
      search: true,
    },
    {
      name: "Descripcion",
      uid: "descripcion",
      sortable: true,
      search: true,
    },
    { name: "Categoria", uid: "categoria", sortable: true,  search: true,},
    { name: "Estado", uid: "estado", sortable: true },
    { name: "Accion", uid: "accionProducto" },
  ];

  return (
    <div className="p-4">
      <Breadcrumbs
        data={[
          {
            value: "Productos",
            href: "/admin/productos",
          },
          {
            value: "Lista",
            href: "/admin/productos/",
          },
        ]}
        title={"Productos"}
      />
      <div className="w-full h-full border rounded-lg mt-4 bg-white p-4">
        <Table
          inicialVisibleColumns={inicialVisibleColumns}
          columns={columns}
          isLoading={isLoading}
          data={users}
          isActiveBtn={true}
          btn="Nuevo Producto"
          btnLink="productos/registro"
          statusProductos={true} 
          statusFilterDrown={true}
        
          buttonTable={<Button
            endContent={<PlusIcon />}
            onClick={() => {
              router.push("productos/registro");
            }}
          > Nuevo Producto</Button>}
        />
      </div>
    </div>
  );
}
