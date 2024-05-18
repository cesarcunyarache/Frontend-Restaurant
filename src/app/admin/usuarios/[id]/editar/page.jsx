"use client";

import Load from "@/components/Load";
import { useEffect, useState } from "react";
import Page from "@/app/admin/empleados/registro/page";
import { useGetUserByIdQuery } from "@/redux/services/usuariosApi";
import UpdateEmail from "@/components/Profile/UpdateEmail";
import UpdatePassword from "@/components/Profile/UpdatePassword";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function PageEditUser({ params, isEditProfile = false }) {
  const { data, isLoading } = useGetUserByIdQuery(params?.id);


  console.log(data)
  return (
    <div className={`p-4 w-full h-full" ${isEditProfile && "pt-0"}`}>
      {isLoading ? (
        <Load />
      ) : !isLoading && !Array.isArray(data?.data) ? (
        <>
          {!isEditProfile && (
            <Breadcrumbs
              data={[
                {
                  value: "Usuarios",
                  href: "/admin/usuarios",
                },
                {
                  value: data?.data.correo,
                  href: `/admin/usuarios/${params?.id}/editar`,
                },
                {
                  value: "Editar",
                  href: `/admin/usuarios/${params?.id}/editar`,
                },
              ]}
              title={"Usuarios"}
            />
          )}
          <UpdateEmail data={data.data} />
          <UpdatePassword dataUser={data.data} />
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
