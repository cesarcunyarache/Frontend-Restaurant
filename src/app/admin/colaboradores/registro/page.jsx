"use client";
import { useState } from "react";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  usePostCreateMutation,
  usePutUpdateMutation,
} from "@/redux/services/colaboradorApi";
import Select from "@/components/Form/Select";
import Textarea from "@/components/Form/Textarea";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useRouter } from "next/navigation";

const validateDocument = {
  1: {
    length: 8,
    minLength: 8,
    lengthMessage: "Este campo debe tener 8 caracteres",
    pattern: /^[0-9]*$/,
    message: "Este campo debe contener solo números",
  },
  2: {
    length: 12,
    minLength: 0,
    lengthMessage: "Este campo debe tener maximo 12 caracteres",
    pattern: /^[A-Za-z0-9]*$/,
    message: "Este campo debe contener solo caracteres alfanuméricos",
  },
  3: {
    length: 12,
    lengthMessage: "Este campo debe tener maximo 12 caracteres",
    pattern: /^[A-Za-z0-9]*$/,
    message: "Este campo debe contener solo caracteres alfanuméricos",
  },
  4: {
    length: 11,
    minLength: 11,
    pattern: /^[0-9]*$/,
    lengthMessage: "Este campo debe tener 11 caracteres",
    message: "Este campo debe contener solo números",
  },
};

export default function page({ data = {}, isUpdate = false, param = "" }) {
  const {
    idTipoDoc,
    numeroDoc,
    nombres,
    apellidos,
    telefono,
    fechaNacimiento,
    genero,
    direccion,
  } = data?.data ?? {
    idTipoDoc: "",
    numeroDoc: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    fechaNacimiento: "",
    genero: "",
    direccion: "",
  };

  const router = useRouter();

  const [postCreate, { isLoading: isLoadingCreate }] = usePostCreateMutation();

  const [putUpdate, { isLoading: isLoadingUpdate }] = usePutUpdateMutation();

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
      const response = await postCreate(data);
      if (response?.error) toast.error(response?.error?.data?.message);
      if (response?.data) {
        toast.success(response?.data?.message);
        if (lastClickedButton === "crear") {
          router.push("/admin/colaboradores");
        } else if (lastClickedButton === "crearOtro") {
          reset();
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      console.log({ ...data, id: param });
      const response = await putUpdate({ ...data, id: param });
      if (response.error) {
        console.log(response.error);
        toast.error(response?.error?.data?.message);
      }
      if (response.data) {
        router.push("/admin/colaboradores");
        toast.success(response?.data?.message);
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
                  value: "Colaboradores",
                  href: "/admin/colaboradores",
                },
                {
                  value: nombres,
                  href: `/admin/colaboradores/${param}/editar`,
                },
                {
                  value: "Edit",
                  href: `/admin/colaboradores/${param}/editar`,
                },
              ]
            : [
                {
                  value: "Colaboradores",
                  href: "/admin/colaboradores",
                },
                {
                  value: "Crear",
                  href: "/admin/colaboradores/registro",
                },
              ]
        }
        title={"Colaboradores"}
      />
      <form
        onSubmit={isUpdate ? onSubmitUpdate : onSubmitDefault}
        className="  max-w-4xl mt-4"
        noValidate
      >
        <div className="px-4 border  pb-4 rounded-lg bg-white">
          <div className="mt-5 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Select
                placeholder="Seleccione el tipo de documento"
                label="Tipo de Documento"
                data={[
                  { key: 1, value: "DNI" },
                  { key: 2, value: "Carnet de Extranjería" },
                  { key: 3, value: "Pasaporte" },
                  { key: 4, value: "RUC" },
                ]}
                name="idTipoDoc"
                {...(idTipoDoc !== ""
                  ? { defaultSelectedKeys: [idTipoDoc.toString()] }
                  : {})}
                register={register}
                options={{
                  validate: (value) => {
                    if (value === "") {
                      return "Este campo es requerido";
                    }
                  },
                }}
                color={errors.idTipoDoc && "danger"}
                isInvalid={errors.idTipoDoc ? true : false}
                errorMessage={errors.idTipoDoc && errors.idTipoDoc.message}
                isDisabled={isLoadingCreate}
                onSelectionChange={() => {
                  console.log(watch("numeroDoc"));

                  /* setValue("numeroDoc", ""); */
                }}
                isRequired
              />
            </div>
            <div className="sm:col-span-3">
              <Input
                label="Número de Documento"
                placeholder=" "
                name="numeroDoc"
                defaultValue={numeroDoc}
                /* isDisabled={watch("idTipoDoc") === undefined ? true : false} */
                register={register}
                maxLength={validateDocument[watch("idTipoDoc")]?.length}
                options={{
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                  pattern: {
                    value: validateDocument[watch("idTipoDoc")]?.pattern,
                    message: validateDocument[watch("idTipoDoc")]?.message,
                  },
                  maxLength: {
                    value: validateDocument[watch("idTipoDoc")]?.length,
                    message:
                      validateDocument[watch("idTipoDoc")]?.lengthMessage,
                  },
                  minLength: {
                    value: validateDocument[watch("idTipoDoc")]?.minLength,
                    message:
                      validateDocument[watch("idTipoDoc")]?.lengthMessage,
                  },
                }}
                color={errors.numeroDoc && "danger"}
                isInvalid={errors.numeroDoc ? true : false}
                errorMessage={errors.numeroDoc && errors.numeroDoc.message}
                isRequired
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-6  sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Input
                label="Nombres"
                placeholder=" "
                name="nombres"
                defaultValue={nombres}
                onKeyDown={(e) => {
                  if (
                    e.keyCode !== 32 &&
                    e.keyCode !== 8 &&
                    (e.keyCode < 65 || e.keyCode > 90)
                  ) {
                    e.preventDefault();
                  }
                }}
                register={register}
                options={{
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                }}
                color={errors.nombres && "danger"}
                isInvalid={errors.nombres ? true : false}
                errorMessage={errors.nombres && errors.nombres.message}
                isRequired
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                label="Apellidos"
                placeholder=" "
                name="apellidos"
                defaultValue={apellidos}
                onKeyDown={(e) => {
                  if (
                    e.keyCode !== 32 &&
                    e.keyCode !== 8 &&
                    (e.keyCode < 65 || e.keyCode > 90)
                  ) {
                    e.preventDefault();
                  }
                }}
                register={register}
                options={{
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                }}
                color={errors.apellidos && "danger"}
                isInvalid={errors.apellidos ? true : false}
                errorMessage={errors.apellidos && errors.apellidos.message}
                isRequired
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Input
                label="Fecha de Nacimiento"
                type="date"
                placeholder=" "
                name="fechaNacimiento"
                defaultValue={fechaNacimiento}
                register={register}
                options={{
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                  validate: (value) => {
                    const fechaNacimiento = new Date(value);
                    const fechaActual = new Date();
                    const edad =
                      fechaActual.getFullYear() - fechaNacimiento.getFullYear();
                    return edad >= 16 || "Debes tener al menos 16 años";
                  },
                }}
                color={errors.fechaNacimiento && "danger"}
                isInvalid={errors.fechaNacimiento ? true : false}
                errorMessage={
                  errors.fechaNacimiento && errors.fechaNacimiento.message
                }
                isRequired
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Select
                placeholder="Seleccione el genero"
                label="Género"
                data={[
                  { key: "Masculino", value: "Masculino" },
                  { key: "Femenino", value: "Femenino" },
                ]}
                name="genero"
                {...(genero ? { defaultSelectedKeys: [genero] } : {})}
                register={register}
                options={{
                  validate: (value) => {
                    if (value === "") {
                      return "Este campo es requerido";
                    }
                  },
                }}
                color={errors.genero && "danger"}
                isInvalid={errors.genero ? true : false}
                errorMessage={errors.genero && errors.genero.message}
                isRequired
              />
            </div>
          </div>
          <div />
        </div>

        <div className="border rounded-lg  pb-4 bg-white mt-4">
          <div className="border-b py-4 px-4">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Información de Contacto
            </h2>
          </div>
          <div className="px-4 mt-2">
            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Input
                  label="Telefono"
                  type="text"
                  placeholder=" "
                  name="telefono"
                  defaultValue={telefono}
                  maxLength={9}
                  onKeyDown={(e) => {
                    if (
                      e.keyCode !== 8 &&
                      e.keyCode !== 32 &&
                      (e.keyCode < 48 || e.keyCode > 57 || e.keyCode === 229)
                    ) {
                      e.preventDefault();
                    }
                  }}
                  register={register}
                  options={{
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Este campo debe ser numerico",
                    },

                    minLength: {
                      value: 9,
                      message: "Este campo debe tener 9 caracteres"
                    },
                    maxLength: {
                      value: 9,
                      message: "Este campo debe tener 9 caracteres"
                    }
                  }}
                  color={errors.telefono && "danger"}
                  isInvalid={errors.telefono ? true : false}
                  errorMessage={errors.telefono && errors.telefono.message}
                  isRequired
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Textarea
                  /*  defaultValue={comentario} */
                  label="Dirección"
                  name="direccion"
                  defaultValue={direccion}
                  register={register}
                  options={{
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  }}
                  color={errors.direccion && "danger"}
                  isInvalid={errors.direccion ? true : false}
                  errorMessage={errors.direccion && errors.direccion.message}
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
