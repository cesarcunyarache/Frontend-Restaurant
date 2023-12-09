"use client";
import Load from "@/components/Load";

import Page from "@/app/admin/meseros/registro/page";
import { useRouter } from 'next/navigation'
import { useGetSearchByIdColaboradorQuery} from "@/redux/services/meseroApi";
export default function PageRegister({ params }) {
  const { data, isLoading } = useGetSearchByIdColaboradorQuery(params?.id);
 const router = useRouter();

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <Load />
      ) : !isLoading && data?.data?.length === 0 ? (
          
          <Page data={data} isUpdate={false} param={params?.id} />
        /*   <div className="flex w-full h-full justify-center items-center">
            <h1 className="font-extrabold text-zinc-400">El Colaborador ya cuenta con un usuario</h1>
          </div> */
      ) : 
         router.push(`/admin/meseros/${params.id}/editar`)
      }
    </div>
  );
}
