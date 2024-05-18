"use client";
import { useState, useRef, useEffect } from "react";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Avatar } from "@nextui-org/react";
import {
  usePostCreateMeseroMutation,
  usePutUpdateMeseroMutation,
} from "@/redux/services/meseroApi";
import Select from "@/components/Form/Select";
import Textarea from "@/components/Form/TextArea";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useRouter } from "next/navigation";
import AutoCompleteMeseros from "@/components/Autocomplete/AutoCompleteMeseros";
import { useGetMeserosQuery } from "@/redux/services/meseroApi";
import Qr from "@/components/Icon/Qr";
import { QrReader } from "react-qr-reader";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { User } from "@nextui-org/react";
import { useGetReservaByIdQuery } from "@/redux/services/reservaApi";
import Load from "@/components/Load";
import Reserva from './Reserva'


export default function Page({ params }) {


  const { data, isLoading, isError, error } = useGetReservaByIdQuery(params?.id);

  if (isError) console.log(error);
  return (
    <div className="w-full h-full">
      {isLoading ? (
        <Load />
      ) : !isLoading && !Array.isArray(data?.data) ? (
        <Reserva data={data} param={params?.id} />
      ) : (
        <div className="flex w-full h-full justify-center items-center">
          <h1 className="font-extrabold text-zinc-400">No encontrado</h1>
        </div>
      )}
    </div>
  );
}
