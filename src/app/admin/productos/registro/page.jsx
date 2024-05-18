"use client";
import { useState } from "react";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Avatar } from "@nextui-org/react";
import {
  usePostCreateProductoMutation,
  usePutUpdateProductoMutation,
} from "@/redux/services/productoApi";
import Select from "@/components/Form/Select";
import Textarea from "@/components/Form/TextArea";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useRouter } from "next/navigation";
import Autocomplete from "@/components/Autocomplete";

export default function Page({ data = {}, isUpdate = false, param = "" }) {
  const {  nombre, precio, estado, imagen, costoPuntos } = data?.data ?? {

    nombre: "",
    precio: "",
    estado: "",
    imagen: "",
    costoPuntos:""
  };

  

  const router = useRouter();

  const [postCreateProducto, { isLoading: isLoadingCreate }] =
    usePostCreateProductoMutation();


  const [putUpdateProducto, { isLoading: isLoadingUpdate }] =
    usePutUpdateProductoMutation();

  const [idProducto, setIdProducto] = useState(param);
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
      formData.append("nombre", data.nombre);
      formData.append("precio", parseFloat(data.precio));
      formData.append("costoPuntos", parseInt(data.costoPuntos));
      formData.append("estado", data.estado);
      formData.append("imagen", data.imagen[0]);

      const response = await postCreateProducto(formData);
      if (response?.error) {
        console.log(response?.error);
        toast.error(response?.error?.data?.message);
      }
      if (response?.data) {
        toast.success(response?.data?.message);
        if (lastClickedButton === "crear") {
          router.push("/admin/productos");
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
      console.log({ ...data, idProducto });
      const formData = new FormData();
      formData.append("idProducto", parseInt(idProducto));
      formData.append("nombre", data.nombre);
      formData.append("precio", parseFloat(data.precio));
      formData.append("costoPuntos", parseInt(data.costoPuntos));
      formData.append("estado", parseInt(data.estado));
      formData.append("imagen", data.imagen[0]);

      const response = await putUpdateProducto(formData);
      if (response?.error) {
        console.log(response?.error);
        toast.error(response?.error?.data?.message);
      }
      if (response?.data) {
        toast.success(response?.data?.message);

        router.push("/admin/productos");
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
                  value: "Productos",
                  href: "/admin/productos",
                },
                {
                  value: nombre,
                  href: `/admin/productos/${param}/editar`,
                },
                {
                  value: "Edit",
                  href: `/admin/productos/${param}/editar`,
                },
              ]
            : [
                {
                  value: "Productos",
                  href: "/admin/productos",
                },
                {
                  value: "Crear",
                  href: "/admin/productos/registro",
                },
              ]
        }
        title={"Productos"}
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
                  name={nombre}
                  size="md"
                />
              </div>
            </div>
          )}

          <div className="mt-1 grid grid-cols-1 gap-x-6 sm:grid-cols-4">
            <div className="sm:col-span-3">
              <Input
                label="Nombre del Producto"
                placeholder=" "
                name="nombre"
                defaultValue={nombre}
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
                color={errors.nombre && "danger"}
                isInvalid={errors.nombre ? true : false}
                errorMessage={errors.nombre && errors.nombre.message}
                isRequired
              />
            </div>
          </div>

          <div className="mt-1 grid grid-cols-1 gap-x-6 sm:grid-cols-4">
            <div className="sm:col-span-3">
              <Input
                label="Precio"
                placeholder=" "
                name="precio"
                defaultValue={precio} 
                type="text"

       
                register={register}
                options={{
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                  pattern: {
                    value: /^\d*\.?\d*$/,
                    message: "Solo se permiten numero"
                  }
                }}
              
                color={errors.precio && "danger"}
                isInvalid={errors.precio ? true : false}
                errorMessage={errors.precio && errors.precio.message}
                isRequired
              />
            </div>
          </div>

          <div className="mt-1 grid grid-cols-1 gap-x-6 sm:grid-cols-4">
            <div className="sm:col-span-3">
              <Input
                label="Costo en Puntos"
                placeholder=" "
                name="costoPuntos"
                 defaultValue={costoPuntos} 
                type="number"
                register={register}
                options={{
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                }}
                onKeyDown={(e) => {
                  if (
                    e.keyCode !== 8 &&
                    e.keyCode !== 32 &&
          
                    (e.keyCode < 48 || e.keyCode > 57 || e.keyCode === 229)
                  ) {
                    e.preventDefault();
                  }
                }}
                color={errors.costoPuntos && "danger"}
                isInvalid={errors.costoPuntos ? true : false}
                errorMessage={errors.costoPuntos && errors.costoPuntos.message}
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
