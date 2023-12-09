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
import Textarea from "@/components/Form/Textarea";
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

export default function Page({
  /* data = {}, */ isUpdate = false,
  param = "",
}) {
  /* const { idMesero, nombres, apellidos, estado, imagen } = data?.data ?? {
    idMesero: "",
    nombres: "",
    apellidos: "",
    estado: "",
    imagen: "",
  }; */

  const router = useRouter();

  const [postCreateMesero, { isLoading: isLoadingCreate }] =
    usePostCreateMeseroMutation();

  const [putUpdateMesero, { isLoading: isLoadingUpdate }] =
    usePutUpdateMeseroMutation();

  const [idColaborador, setIdColaborador] = useState(param);
  const [lastClickedButton, setLastClickedButton] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm();




  const [isCameraOpen, setIsCameraOpen] = useState(true);

  const [hasReadCode, setHasReadCode] = useState(false);

  const [data, setData] = useState("");

  /* s */

  /*   const  { data : reserva, isLoading } = useGetReservaByIdQuery(data);
   */
  /*  console.log(reserva); */

  /*   const fetchData = async () => {
      setIsCameraOpen(false);
      if (data !== "") {
        setIsCameraOpen(false); */

  const { data: reserva, isLoading } = useGetReservaByIdQuery(data);

  if (data !== "") {
    console.log(data);
    router.push(`/admin/reservas/${data}`);
  }

  /*   }
    };

    fetchData(); 
  } */

  return (
    <div className="p-4">
      <Breadcrumbs
        data={
          isUpdate
            ? [
                {
                  value: "Reservas",
                  href: "/admin/reservas",
                },
                {
                  value: nombres,
                  href: `/admin/reservas/${param}/editar`,
                },
                {
                  value: "Edit",
                  href: `/admin/reservas/${param}/editar`,
                },
              ]
            : [
                {
                  value: "Reservas",
                  href: "/admin/reservas",
                },
                {
                  value: "Escanear",
                  href: "/admin/meseros/registro",
                },
              ]
        }
        title={"Reservas"}
      />
      <form
       
        className="  max-w-4xl mt-4"
        noValidate
        encType="multipart/form-data"
      >
        <div className="p-4 border  rounded-lg bg-white">
          <div className="  max-w-xl">
            <div className="flex justify-center max-w-4xl">
             {/*  <Button
                className="w-50"
                startContent={<Qr />}
                onClick={() => {
                  if (isCameraOpen) {
                    setIsCameraOpen(false);
                  } else {
                    setIsCameraOpen(true);
                  }
                }}
              >
                {isCameraOpen ? "Ocultar" : "Escanear QR"}
              </Button> */}
            </div>

            {isCameraOpen && (
              <div className="max-w-xl p-2 border border-dashed rounded">
                <QrReader
                  onResult={(result, error) => {
                    if (!!result) {
                      setData(result?.text);
                      /* setIsCameraOpen(false);
                      setHasReadCode(true); */
                    }

                    if (!!error) {
                      /*   console.info(error); */
                    }
                  }}
                  style={{ width: "100%" }}
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
