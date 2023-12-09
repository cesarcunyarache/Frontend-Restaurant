"use client";

import { useGetMeserosQuery } from "@/redux/services/meseroApi";
import Breadcrumbs from "@/components/Breadcrumbs";
import React from "react";
import Table from "@/components/Table";
import { useGetProductosQuery } from "@/redux/services/productoApi";
export default function Page() {
  const { data, isLoading, isError, error } = useGetProductosQuery();

 
  const users =  !isLoading ? data.data :  [];

  const inicialVisibleColumns = [
    "idProducto",
    "infoProducto",
    "costoPuntos",
    "estadoProducto",
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
      name: "Costo por Puntos",
      uid: "costoPuntos",
      sortable: true,
      search: true,
    },
    { name: "Estado", uid: "estadoProducto", sortable: true },
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
        
        />
      </div>
    </div>
  );
}
