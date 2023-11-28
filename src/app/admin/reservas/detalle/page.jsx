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
import { Html5QrcodeScanner } from "html5-qrcode";

export default function page({
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

  const onSubmitDefault = handleSubmit(async (data) => {
    try {
      if (idColaborador !== null && idColaborador !== "") {
        console.log(data);

        const formData = new FormData();
        formData.append("idColaborador", idColaborador);
        formData.append("estado", data.estado);
        formData.append("imagen", data.imagen[0]);

        const response = await postCreateMesero(formData);
        if (response?.error) {
          console.log(response?.error);
          toast.error(response?.error?.data?.message);
        }
        if (response?.data) {
          toast.success(response?.data?.message);
          if (lastClickedButton === "crear") {
            router.push("/admin/meseros");
          } else if (lastClickedButton === "crearOtro") {
            reset();
          }
        }
      } else {
        toast.error("Seleccione un colaborador");
      }
    } catch (error) {
      console.error(error);
    }
  });

  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      if (idMesero !== null && idMesero !== "") {
        console.log({ ...data, idMesero });
        const formData = new FormData();
        formData.append("idMesero", idMesero);
        formData.append("estado", data.estado);
        formData.append("imagen", data.imagen[0]);

        const response = await putUpdateMesero(formData);
        if (response?.error) {
          console.log(response?.error);
          toast.error(response?.error?.data?.message);
        }
        if (response?.data) {
          toast.success(response?.data?.message);

          router.push("/admin/meseros");
        }
      } else {
        toast.error("Seleccione un colaborador");
      }
    } catch (error) {
      console.error(error);
    }
  });

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  let scannerRef = useRef();

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

        const { data: reserva, isLoading } =  useGetReservaByIdQuery(
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDExMTU5MjQsImRhdGEiOnsidG9rZW5SZXNlcnZhIjoiNzIifX0.XTlTh-cLBU2MBmWqmvk1_7RsEkDx4Mc5mGRVNlvf3RM"
        );

        console.log(reserva);
    /*   }
    };

    fetchData(); 
  } */



 /*  useEffect(() => {

    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
       fps: 5
    })
  
    scanner.render(success, error);
  
  
    function success(result){
      scanner.clear();
      setScanResult(result);
    }
  
    function error(error){
       /*  console.log(error) 
    }

  }, []) */


 

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
                  value: "Detalle",
                  href: "/admin/meseros/registro",
                },
              ]
        }
        title={"Reservas"}
      />
      <form
        onSubmit={isUpdate ? onSubmitUpdate : onSubmitDefault}
        className="  max-w-4xl mt-4"
        noValidate
        encType="multipart/form-data"
      >
        <div className="p-4 border  rounded-lg bg-white">
          <div className="  max-w-xl">
            <div className="flex justify-center max-w-4xl">
              <Button
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
              </Button>
            </div>

            {isCameraOpen && (
              <div className="max-w-xl p-2 border border-dashed rounded">
                <QrReader
                  ref={scannerRef}
                  onResult={(result, error) => {
                    if (!!result && !hasReadCode) {
                      
                      
                      setData(result?.text);
                      setIsCameraOpen(false);
                      setHasReadCode(true);
                    
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


          <div className="mt-1 grid grid-cols-1 gap-x-6 sm:grid-cols-4">
            <div className="sm:col-span-3"></div>
          </div>

          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Input
                label="Número de Documento"
                placeholder=" "
                name="numeroDoc"
                value="12321"
                isDisabled
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-6  sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Input
                label="Nombres"
                placeholder=" "
                name="nombres"
                isDisabled
                value="Cesar Efrain"
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                label="Apellidos"
                placeholder=" "
                name="apellidos"
                value="Cunyarache Castillo"
                isDisabled
              />
            </div>
          </div>
        </div>
        <div className="border rounded-lg  pb-4 bg-white mt-4">
          <div className="border-b py-4 px-4">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Información de Reserva
            </h2>
          </div>
          <div className="px-4 mt-2">
            <div className="grid grid-cols-1 gap-x-6  sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Input
                  label="Fecha"
                  type="date"
                  placeholder=" "
                  name="telefono"
                  isDisabled
                />
              </div>
              <div className="sm:col-span-3">
                <Input
                  label="Hora"
                  type="text"
                  placeholder=" "
                  name=""
                  isDisabled
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Input
                  label="Cantidad de Comensales"
                  type="text"
                  placeholder=" "
                  name=""
                  isDisabled
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label className="flex text-sm  leading-6 text-foreground-500 mb-2">
                  Mesero
                </label>
                <User
                  className="border flex justify-start w-full h-16 border-dashed"
                  avatarProps={{
                    radius: "full",
                    isBordered: true,
                    className: "mr-2 ml-2",
                    src: "http://localhost/api/public/Images/65612c1cb7b001.43890015_pmenfhjlgoqik.png",
                    name: "cesar",
                  }}
                  description={"121221"}
                  name={"cesar efrain"}
                >
                  {"1213233"}
                </User>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Textarea
                  /*  defaultValue={comentario} */
                  label="Comentario"
                  name="Comentario"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg  pb-4 bg-white mt-4">
          <div className="border-b py-4 px-4">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Detalle de Mesas
            </h2>
          </div>
          <div className="px-4 mt-2">
            <div className="mt-6 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Table aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn>Código de Mesa</TableColumn>
                    <TableColumn>Capacidad</TableColumn>
                    <TableColumn>Nivel</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell>T2</TableCell>
                      <TableCell>6</TableCell>
                      <TableCell>Terraza</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg  pb-4 bg-white mt-4">
          <div className="border-b py-4 px-4">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Actualizar estado de reserva
            </h2>
          </div>
          <div className="px-4 mt-2">
            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Select
                  placeholder="Seleccione el rol"
                  label="Estado"
                  data={[
                    { key: 0, value: "Inhabilitado" },
                    { key: 1, value: "Habilitado" },
                  ]}
                  name="estado"
                  defaultSelectedKeys={["1"]}
                  register={register}
                  options={{
                    validate: (value) => {
                      if (value === "") {
                        return "Este campo es requerido";
                      }
                    },
                  }}
                  color={errors.estado && "danger"}
                  isInvalid={errors.estado ? true : false}
                  errorMessage={errors.estado && errors.estado.message}
                  isRequired
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <div className="sm:col-span-3 flex flex-column gap-2 ">
            {isUpdate ? (
              <Button
                isLoading={isLoadingUpdate}
                type="submit"
                className="bg-neutral-900 text-white  w-48 my-4"
              >
                Actualizar
              </Button>
            ) : (
              <>
                <Button
                  isLoading={isLoadingCreate && lastClickedButton === "crear"}
                  type="submit"
                  className="bg-neutral-900 text-white  w-10 my-4"
                  onClick={() => setLastClickedButton("crear")}
                >
                  Crear
                </Button>

                <Button
                  type="submit"
                  isLoading={
                    isLoadingCreate && lastClickedButton === "crearOtro"
                  }
                  className="bg-zinc-50 border-2 text-black w-50 my-4"
                  onClick={() => setLastClickedButton("crearOtro")}
                >
                  Crear y Crear otro
                </Button>

                <Button
                  className="bg-zinc-50 border-2 text-black w-10 my-4"
                  onClick={() => {
                    if (isCameraOpen) {
                      setIsCameraOpen(false);
                    } else {
                      setIsCameraOpen(true);
                    }

                    /*  router.back() */
                  }}
                >
                  Cancelar
                </Button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
