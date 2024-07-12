"use client";

import { useGetVentasQuery } from "@/redux/services/ventaApi";
import Breadcrumbs from '@/components/Breadcrumbs'
import React, { useState } from "react";
import Table from "@/components/Table";
import { useRouter } from "next/navigation";
import { Tabs, Tab, Card, CardHeader, CardBody, CardFooter, Avatar } from "@nextui-org/react";
import Button from "@/components/Form/Button";
import { PlusIcon } from "@/components/Icon/PlusIcon";
import TableIcon from '@/components/Icon/Table'
import GridIcon from '@/components/Icon/GridIcon'
import { useSelector } from "react-redux";

export default function Page() {

  const [selected, setSelected] = useState('table')

  const [isFollowed, setIsFollowed] = useState(false);

  const { data, isLoading, isError, error } = useGetVentasQuery();

  const users = !isLoading ? data?.data : [];

  const router = useRouter();

  const sales = useSelector((state) => state?.sales?.salesState?.value);

  const inicialVisibleColumns = [
    "idVenta",
    "infoCliente",
    "fecha",
    "hora",
    "total",
    "infoEmpleado",
  ];

  const columns = [
    { name: "ID", uid: "idVenta", sortable: true, search: true },
    { name: "Cliente", uid: "infoCliente", search: true },
    { name: "Fecha", uid: "fecha", sortable: true, search: true },
    { name: "Hora", uid: "hora", sortable: true, search: true },
    { name: "Empleado", uid: "infoEmpleado", sortable: true, search: true },
    { name: "IGV", uid: "igv", sortable: true, search: true },
    { name: "Total", uid: "total", sortable: true, search: true },
  ];

  return (
    <div className="p-4">

      <div className="flex w-full justify-between">

        <Breadcrumbs
          data={[
            {
              value: "Ventas",
              href: "/admin/ventas",
            },
            {
              value: "Lista",
              href: "/admin/ventas/",
            },
          ]}
          title={"Ventas"}
        />

        {/*<div className="flex  flex-col  ">
          <Tabs aria-label="Options" color="primary" variant="bordered" selectedKey={selected}
            onSelectionChange={setSelected}>
            <Tab
              key="table"
              title={
                <div className="flex items-center space-x-2">
                  <TableIcon />
                  {/*   <span>Tabla</span> 
                </div>
              
            />
            <Tab
              key="grid"
              title={
                <div className="flex items-center space-x-2">
                  <GridIcon />
                  {/*  <span>Grilla</span> 
                </div>
              }
            />

          </Tabs>
        </div>*/}
      </div>


      <div className="w-full h-full">

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
                    router.push("ventas/registro");
                  }}
                > Nueva Venta</Button>} />
            </div>
        {/*
          selected === 'table' ?


            :

            <div className="flex flex-wrap gap-4 w-full h-full  mt-4 ">



              {
                sales.map((sale, index) => {
                  return <Card key={index} className="w-72" >
                    <CardHeader className="justify-between">
                      <div className="flex gap-5">
                        <Avatar isBordered radius="full" size="md" src="" />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">{sale?.cliente.nombres}</h4>
                          <h5 className="text-small tracking-tight text-default-400">{sale?.cliente.numeroDoc}</h5>
                        </div>
                      </div>
                      <Button
                        className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
                        color="primary"
                        radius="full"
                        size="sm"
                        variant={isFollowed ? "bordered" : "solid"}
                        onPress={() => setIsFollowed(!isFollowed)}
                      >
                        {isFollowed ? "Finalizada" : "Pendiente"}
                      </Button>
                    </CardHeader>
                    <CardBody className="px-3 py-0 text-small text-default-400">

                      {
                        sale.listProducts.map((product) => {
                          return <p>
                            - {product.nombre}
                          </p>
                        })

                      }
                    </CardBody>
                    <CardFooter className="gap-3">
                      <div className="flex gap-1">

                        <p className=" text-default-400 text-small">20/06/2024</p>
                      </div>
                      <div className="flex gap-1">

                        <p className="text-default-400 text-small">19:03:24</p>
                      </div>
                    </CardFooter>
                  </Card>
                })
              }



            </div>
        */}


      </div>
    </div>
  );
}
