"use client";
import { useState, useEffect } from "react";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Avatar, image } from "@nextui-org/react";
import {
  usePostCreateCategoriaMutation,
  usePutUpdateCategoriaMutation,
} from "@/redux/services/categoriaApi";
import Select from "@/components/Form/Select";
import TextArea from "@/components/Form/TextArea";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useRouter } from "next/navigation";
import Autocomplete from "@/components/Autocomplete";
import UploadImage from "@/components/Icon/UploadImage";


export default function Page({ data = {}, isUpdate = false, param = "" }) {
  const { categoria, descripcion, estado, imagen } = data?.data ?? {

    categoria: "",
    descripcion: "",
    estado: "",
    imagen: "",
    costoPuntos: ""
  };



  const router = useRouter();

  const [postCreateCategoria, { isLoading: isLoadingCreate }] =
    usePostCreateCategoriaMutation();


  const [putUpdateCategoria, { isLoading: isLoadingUpdate }] =
    usePutUpdateCategoriaMutation();

  const [idCategoria, setIdCategoria] = useState(param);
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




  useEffect(() => {
    if (isUpdate && data?.data?.imagen) {
      setValue("imagen", data?.data?.imagen);
    }
  }, [])

  console.log(watch('imagen'))


  const onSubmitDefault = handleSubmit(async (data) => {
    try {
      console.log(data);

      const formData = new FormData();
      formData.append("categoria", data.categoria);
      formData.append("descripcion", data.descripcion)
      formData.append("imagen", data.imagen[0]);
      formData.append("estado", data.estado);



      const response = await postCreateCategoria(formData);
      if (response?.error) {
        console.log(response?.error);
        toast.error(response?.error?.data?.message);
      }
      if (response?.data) {
        toast.success(response?.data?.message);
        if (lastClickedButton === "crear") {
          router.push("/admin/categorias");
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
      console.log({ ...data, idCategoria });
      const formData = new FormData();
      formData.append("idCategoria", parseInt(idCategoria));
      formData.append("categoria", data.categoria);
      formData.append("descripcion", data.descripcion);
      formData.append("estado", parseInt(data.estado));
      formData.append("imagen", data.imagen[0]);

      const response = await putUpdateCategoria(formData);
      if (response?.error) {
        console.log(response?.error);
        toast.error(response?.error?.data?.message);
      }
      if (response?.data) {
        toast.success(response?.data?.message);

        router.push("/admin/categorias");
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
                value: "Categorias",
                href: "/admin/categorias",
              },
              {
                value: categoria,
                href: `/admin/categorias/${param}/editar`,
              },
              {
                value: "Edit",
                href: `/admin/categorias/${param}/editar`,
              },
            ]
            : [
              {
                value: "Categorias",
                href: "/admin/categorias",
              },
              {
                value: "Crear",
                href: "/admin/categorias/registro",
              },
            ]
        }
        title={"Categorias"}
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
                  name={categoria}
                  size="md"
                />
              </div>
            </div>
          )}

          <div className="mt-1 grid grid-cols-1 gap-x-6 sm:grid-cols-4">
            <div className="sm:col-span-3">
              <Input
                label="Nombre de la Categoria"
                placeholder=" "
                name="categoria"
                defaultValue={categoria}
                /* onKeyDown={(e) => {
                  if (
                    e.keyCode !== 32 &&
                    e.keyCode !== 8 &&
                    (e.keyCode < 65 || e.keyCode > 90)
                  ) {
                    e.preventDefault();
                  }
                }} */
                register={register}
                options={{
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                }}
                color={errors.categoria && "danger"}
                isInvalid={errors.categoria ? true : false}
                errorMessage={errors.categoria && errors.categoria.message}
                isRequired
              />
            </div>
          </div>

          <div className="mt-1 grid grid-cols-1 gap-x-6 sm:grid-cols-4">
            <div className="sm:col-span-3">
              <TextArea
                label="Descripcion"
                placeholder=" "
                name="descripcion"
                defaultValue={descripcion}
                type="text"
                register={register}
                options={{
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },

                }}

                color={errors.descripcion && "danger"}
                isInvalid={errors.descripcion ? true : false}
                errorMessage={errors.descripcion && errors.descripcion.message}
                isRequired
              />
            </div>
          </div>



          <div className="mt-1 grid grid-cols-1 gap-x-6 sm:grid-cols-4">
            <div className="sm:col-span-3">
              <label className="flex text-sm  leading-6 text-foreground-500">
                Imagen{" "}
                <p className="text-red-400 font-semibold text-lg p-[2px] h-2">
                  <sup className="">*</sup>
                </p>
              </label>

              {/*   <input
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
              /> */}

              {/*  {watch('imagen') != undefined && watch('imagen').length > 0 || imagen !== null && imagen !== '' ? (
                <div
                  className="flex items-center justify-center w-full"
                  htmlFor="dropzone-file"
                >
                  <div className="flex flex-col items-center justify-center w-full   border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 p-2">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <img
                        src={isUpdate ? imagen : URL?.createObjectURL(watch('imagen')[0])}
                        alt="uploaded-image"
                        accept="image/jpeg, image/png, image/jpg"
                        className="object-contain max-h-96"
                      />
                    </div>
                  </div>
                </div>
              ) : ( */}
              <div className="flex items-center justify-center w-ful">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
                >

                  {
                    watch('imagen') != null && watch('imagen').length > 0 ? <div
                      className="flex items-center justify-center w-full"
                      htmlFor="dropzone-file"
                    >

                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <img
                          src={typeof watch('imagen') === 'string' ? watch('imagen') : URL.createObjectURL(watch('imagen')[0])}
                          alt="uploaded-image"
                          accept="image/jpeg, image/png, image/jpg"
                          className="object-fit max-h-60"
                        />
                      </div>

                    </div> : (<div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadImage />

                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Haga clic para cargar</span> o
                        arrastrar y soltar
                      </p>
                    </div>)
                  }


                  <input

                    id="dropzone-file"
                    type="file"
                    className="hidden"

                    accept="image/*"
                    {...register("imagen", {
                      validate: (value) => {
                        if (value.length == 0) {
                          return toast.error("Seleccione una imagen");
                        }
                      },
                    })}

                  >



                  </input>
                </label>
              </div>
              {/*     )} */}
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
                defaultSelectedKeys={[estado.toString()]}
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
                className="w-48 my-4"
              >
                Actualizar
              </Button>
            ) : (
              <>
                <Button
                  isLoading={isLoadingCreate && lastClickedButton === "crear"}
                  type="submit"
                  className="w-10 my-4"
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
