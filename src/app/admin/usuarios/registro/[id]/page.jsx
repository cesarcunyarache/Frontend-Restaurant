"use client";
import Load from "@/components/Load";
import { useEffect, useState } from "react";
import Page from "@/app/admin/usuarios/registro/page";
import { useGetSearchByIdQuery } from "@/redux/services/colaboradorApi";
export default function PageEditUser({ params }) {
  const { data, isLoading } = useGetSearchByIdQuery(params?.id);

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <Load />
      ) : !isLoading && !Array.isArray(data?.data) ? (
        data.data.idUsuario === null ? (
          <Page data={data} isUpdate={false} param={params?.id} />
        ) : (
          <div className="flex w-full h-full justify-center items-center">
            <h1 className="font-extrabold text-zinc-400">El Colaborador ya cuenta con un usuario</h1>
          </div>
        )
      ) : (
        <div className="flex w-full h-full justify-center items-center">
          <h1 className="font-extrabold text-zinc-400">No encontrado</h1>
        </div>
      )}
    </div>
  );
}
