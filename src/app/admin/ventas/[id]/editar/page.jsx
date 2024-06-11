"use client";
import Load from "@/components/Load";
import { useEffect, useState } from 'react'
import Page from "@/app/admin/empleados/registro/page";
import { useGetSearchByIdQuery } from "@/redux/services/colaboradorApi";
export default function PageEditar({ params, isEditProfile = false }) {
  const { data, isLoading, refetch } = useGetSearchByIdQuery(params?.id);


  console.log(params?.id)
  useEffect(() => {
    refetch();
  }, [])
  return (
    <div className="w-full h-full">
      {isLoading ? (
        <Load />
      ) : !isLoading && !Array.isArray(data?.data) ? (
        <Page data={data} isUpdate={true} param={params?.id} isEditProfile={isEditProfile} />
      ) : (
        <div className="flex w-full h-full justify-center items-center">
          <h1 className="font-extrabold text-zinc-400">No encontrado</h1>
        </div>
      )}
    </div>
  );
}
