"use client";
import { useState } from "react";
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
import Autocomplete from "@/components/Autocomplete";
import { useGetColaboradoresNoMeserosQuery } from "@/redux/services/meseroApi";

export default function page({ data = {}, isUpdate = false, param = "" }) {
  const { idMesero, nombres, apellidos, estado, imagen } = data?.data ?? {
    idMesero: "",
    nombres: "",
    apellidos: "",
    estado: "",
    imagen: "",
  };

  const router = useRouter();

  const [postCreateMesero, { isLoading: isLoadingCreate }] =
    usePostCreateMeseroMutation();

  const { data: colab, isLoading } = useGetColaboradoresNoMeserosQuery();

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

  return (
    <div className="p-4">
      <Breadcrumbs
        data={
          isUpdate
            ? [
                {
                  value: "Meseros",
                  href: "/admin/meseros",
                },
                {
                  value: nombres,
                  href: `/admin/meseros/${param}/editar`,
                },
                {
                  value: "Edit",
                  href: `/admin/meseros/${param}/editar`,
                },
              ]
            : [
                {
                  value: "Meseros",
                  href: "/admin/meseros",
                },
                {
                  value: "Crear",
                  href: "/admin/meseros/registro",
                },
              ]
        }
        title={"Meseros"}
      />
      <form
        onSubmit={isUpdate ? onSubmitUpdate : onSubmitDefault}
        className="  max-w-4xl mt-4"
        noValidate
        encType="multipart/form-data"
      >
        <div className="p-4 border  rounded-lg bg-white">
          {isUpdate && (
            <div className="mt-1 grid grid-cols-1 gap-x-6 sm:grid-cols-4">
              <div className="sm:col-span-3">
                <label className="flex text-sm  leading-6 text-foreground-500">
                  Imagen actual{" "}
                </label>
                <Avatar
                  className="mt-2 mb-4"
                  isBordered
                  src={imagen}
                  name={nombres}
                  size="md"
                />
              </div>
            </div>
          )}

          {!isUpdate && (
            <div className="mt-5 grid grid-cols-1 gap-x-6 sm:grid-cols-4">
              <div className="sm:col-span-3">
                <Autocomplete
                  data={isLoading ? [] : colab?.data}
                  name="idColaborador"
                  register={register}
                  defaultSelectedKey={idColaborador}
                  onSelectionChange={(value) => {
                    setIdColaborador(value);
                  }}
                  options={{
                    validate: (value) => {
                      if (value === "") {
                        return "Este campo es requerido";
                      }
                    },
                  }}
                 /*  color={idColaborador === null && "danger"}
                  isInvalid={idColaborador === null && true} */
                  /* errorMessage={
                    idColaborador === null && "Este campo es requerido"
                  } */
                  isRequired
                />
              </div>
            </div>
          )}

          <div className="mt-1 grid grid-cols-1 gap-x-6 sm:grid-cols-4">
            <div className="sm:col-span-3">
              <label className="flex text-sm  leading-6 text-foreground-500">
                Imagen{" "}
                <p className="text-red-400 font-semibold text-lg p-[2px] h-2">
                  <sup className="">*</sup>
                </p>
              </label>

              <input
                className=" mt-1 flex w-full  rounded-md  border-gray-300 border-2 border-input bg-white text-sm text-gray-400 file:border-0 file:bg-zinc-900 file:h-8 file:text-white file:text-sm file:font-medium"
                type="file"
                id="picture"
                accept="image/*"
                {...register("imagen", {
                  validate: (value) => {
                    if (value.length == 0) {
                      return toast.error("Seleccione una imagen");
                    }
                  },
                })}
              />
            </div>
          </div>

          <div className="mt-1 grid grid-cols-1 gap-x-6 sm:grid-cols-4">
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
                  onClick={() => router.back()}
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
