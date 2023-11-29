"use client";

import { useGetReservasQuery } from "@/redux/services/reservaApi";
import Breadcrumbs from "@/components/Breadcrumbs";
import Table from "@/components/Table";

export default function page() {
  const { data, isLoading, isError, error } = useGetReservasQuery();


  const users = !isLoading ? data.data : [];

  const inicialVisibleColumns = [
    "idReserva",
    "infoClient",
    "fecha",
    "hora",
    "estadoReserva",
    "nombres",
    "accionReserva",
  ];

  const columns = [
    { name: "ID", uid: "idReserva", sortable: true, search: true },
    { name: "Información Personal", uid: "infoClient" },
    { name: "Fecha", uid: "fecha", sortable: true, search: true },
    { name: "Hora", uid: "hora", sortable: true, search: true },
    { name: "Estado", uid: "estadoReserva" },
    { name: "Nombres", uid: "nombres", sortable: true, search: true },
    {
      name: "Número de documento",
      uid: "numeroDoc",
      sortable: true,
      search: true,
    },
    { name: "Accion", uid: "accionReserva" },
  ];

  return (
    <div className="p-4">
      <Breadcrumbs
        data={[
          {
            value: "Reservas",
            href: "/admin/reservas",
          },
          {
            value: "Lista",
            href: "/admin/reservas/",
          },
        ]}
        title={"Reservas"}
      />
      <div className="w-full h-full border rounded-lg mt-4 bg-white p-4">
        <Table
          inicialVisibleColumns={inicialVisibleColumns}
          columns={columns}
          isLoading={isLoading}
          data={users}
          btn="Escanear Qr"
          btnLink="reservas/escanear"
          status={true} 
          isActiveBtn={true}
        />
      </div>
    </div>
  );
}
