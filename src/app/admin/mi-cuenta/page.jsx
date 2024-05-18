"use client";

import { useGetClientesQuery } from "@/redux/services/clienteApi";
import Breadcrumbs from '@/components/Breadcrumbs'
import React from "react";
import Table from "@/components/Table";
import {useGetProfileQuery} from '@/redux/services/userApi'

import Page from '../empleados/[id]/editar/page'
import PageEditUser from '../usuarios/[id]/editar/page'

export default function PageMiCuenta() {

  const { data, isLoading, isError, error } = useGetProfileQuery();

 console.log(data)
  return (
    <div className="">
      <div className="pt-4 px-4">
      <Breadcrumbs
        data={[
          {
            value: "Mi Cuenta",
            href: "/admin/mi-cuenta",
          },
          {
            value: "Editar",
            href: "/admin/mi-cuenta/",
          },
        ]}
        title={"Perfil"}
      />

      </div>
     
     <div className="w-full h-full">
      <PageEditUser params={{id: data?.data?.idUsuario}} isEditProfile={true}/>
       
     </div>
  
    </div>
  );
}
