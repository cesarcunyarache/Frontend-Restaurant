"use client";

import { useGetClientesQuery } from "@/redux/services/clienteApi";
import Breadcrumbs from '@/components/Breadcrumbs'
import React from "react";
import Table from "@/components/Table";
import {useGetProfileQuery} from '@/redux/services/userApi'

import Page from '../empleados/[id]/editar/page'
import PageEditUser from '../usuarios/[id]/editar/page'

export default function PagePerfil() {

  const { data, isLoading, isError, error } = useGetProfileQuery();

 console.log(data)
  return (
    <div className="">
      <div className="pt-4 px-4">
      <Breadcrumbs
        data={[
          {
            value: "Perfil",
            href: "/admin/perfil",
          },
          {
            value: "Editar",
            href: "/admin/perfil/",
          },
        ]}
        title={"Perfil"}
      />

      </div>
     
     <div className="w-full h-full">
      <Page params={{id: data?.data?.id}} isEditProfile={true}/>
     </div>
  
    </div>
  );
}
