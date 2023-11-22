"use client";
import { useState } from "react";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  usePostCreateMutation,
  usePutUpdateMutation,
} from "@/redux/services/meseroApi";
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
    length: 0,
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
      console.log(data);

      const formData = new FormData();
      formData.append("product",data.product  );

      const response = await fetch("http://localhost/api/mesero", {
        method: "POST",
        body: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      /* const response = await postCreate(data);
      if (response?.error) {
        console.log(response?.error);
        toast.error(response?.error?.data?.message);
      }
      if (response?.data) {
        toast.success(response?.data?.message);
      
        if (lastClickedButton === "crear") {
        /*   router.push("/admin/colaboradores");
        } else if (lastClickedButton === "crearOtro") {
          reset();
        }
      } */
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
            <div className="sm:col-span-3"></div>
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Photo
            </label>
            <div className="mt-2 flex items-center gap-x-3">
              <svg
                className="h-12 w-12 text-gray-300"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
              <button
                type="button"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Change
              </button>
            </div>
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Cover photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-gray-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-slate-900 focus-within:ring-offset-2 hover:text-black"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />{" "}
                    *
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div />
        </div>

        <Input type="file" name="product" register={register}></Input>

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
