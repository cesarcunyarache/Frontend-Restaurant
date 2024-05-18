"use client";
import { useState, useRef, useEffect } from "react";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Avatar } from "@nextui-org/react";
import { usePutUpdateReservaMutation } from "@/redux/services/reservaApi";
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


export default function Reserva({ data = {}, param = "", isUpdate = false }) {
  const {
    idReserva,
    numeroDoc,
    nombres,
    apellidos,
    fecha,
    hora,
    cantComensales,
    idMesero,
    mesero,
    comentario,
    mesas,
    estado,
  } = data?.data ?? {
    numeroDoc: "",
    mesas: [],
    mesero: {}
  };



  const router = useRouter();
  const [putUpdateReserva, { isLoading: isLoadingUpdate }] =
    usePutUpdateReservaMutation();

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
            router.push("/admin/reservas");
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
      if (idReserva !== null && idReserva !== "") {
        console.log({idReserva: idReserva, ...data})
        const response = await putUpdateReserva({idReserva: idReserva, ...data});
        if (response?.error) {
          console.log(response?.error);
          toast.error(response?.error?.data?.message);
        }
        if (response?.data) {
          toast.success(response?.data?.message);

          router.push("/admin/reservas");
        }
      } else {
        toast.error("Seleccione un colaborador");
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div className="p-4">
      <Breadcrumbs
        data={[
          {
            value: "Reservas",
            href: "/admin/reservas",
          },
          {
            value: "Detalle",
            href: "/admin/meseros/registro",
          },
        ]}
        title={"Reservas"}
      />
      <form
        onSubmit={onSubmitUpdate}
        className="  max-w-4xl mt-4"
        noValidate
        encType="multipart/form-data"
      >
        <div className="p-4 border  rounded-lg bg-white">
          <div className="mt-1 grid grid-cols-1 gap-x-6 sm:grid-cols-4">
            <div className="sm:col-span-3"></div>
          </div>

          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Input
                label="Número de Documento"
                placeholder=" "
                name="numeroDoc"
                value={numeroDoc}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-6  sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Input
                label="Nombres"
                placeholder=" "
                name="nombres"
                value={nombres}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                label="Apellidos"
                placeholder=" "
                name="apellidos"
                value={apellidos}
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
                  value={fecha}
                />
              </div>
              <div className="sm:col-span-3">
                <Input
                  label="Hora"
                  type="text"
                  placeholder=" "
                  name=""
                  value={hora}
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
                  value={cantComensales}
                />
              </div>
            </div>

            {idMesero && (
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
                      src: mesero.imagen,
                      name: mesero.nombres,
                    }}
                    description={mesero.numeroDoc}
                    name={mesero.nombres}
                  >
                    {"1213233"}
                  </User>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Textarea
                  label="Comentario"
                  name="Comentario"
                  value={comentario}
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
                    {mesas.map((mesa) => {
                      return (
                        <TableRow key={mesa.idMesa}>
                          <TableCell>{mesa.codigo}</TableCell>
                          <TableCell>{mesa.capacidad}</TableCell>
                          <TableCell>{mesa.nivel}</TableCell>
                        </TableRow>
                      );
                    })}
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
                  placeholder="Seleccione el estado"
                  label="Estado"
                  data={[
                    { key: 0, value: "Cancelada" },
                    { key: 1, value: "Pendiente" },
                    { key: 2, value: "Asistió" },
                    { key: 3, value: "No presentado" },
                    { key: 4, value: "Completada" },
                  ]}
                  name="estado"
                  defaultSelectedKeys={[estado]}
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
            <Button
              isLoading={isLoadingUpdate}
              type="submit"
              className="bg-neutral-900 text-white  w-40 my-4"
            >
              Actualizar Estado
            </Button>

            <Button
              className="bg-zinc-50 border-2 text-black w-10 my-4"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
