"use client";

import Load from "@/components/Load";
import { useEffect, useState } from "react";
import Page from "@/app/admin/colaboradores/registro/page";
import { useGetUserByIdQuery } from "@/redux/services/usuariosApi";
import UpdateEmail from "@/components/Profile/UpdateEmail";
import UpdatePassword from "@/components/Profile/UpdatePassword";
import Breadcrumbs from '@/components/Breadcrumbs'

export default function page({ params }) {
  const { data, isLoading } = useGetUserByIdQuery(params?.id);

  return (
    <div className=" p-4 w-full h-full">
      {isLoading ? (
        <Load />
      ) : !isLoading && !Array.isArray(data?.data) ? (
        <>
          <Breadcrumbs
            data={[
              {
                value: "Usuarios",
                href: "/admin/usuarios",
              },
              {
                value: data.data.correo,
                href: `/admin/usuarios/${params?.id}/editar`,
              },
              {
                value: "Editar",
                href: `/admin/usuarios/${params?.id}/editar`,
              },
            ]}
            title={"Usuarios"}
          />
          <UpdateEmail data={data.data}/>
          <UpdatePassword data={data.data}/>
        </>
      ) : (
        <div className="flex w-full h-full justify-center items-center">
          <h1 className="font-extrabold text-zinc-400">No encontrado</h1>
        </div>
      )}
    </div>
  );
}

{
  /* <Page data={data} isUpdate={true} param={params?.id} /> */
}
