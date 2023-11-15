"use client"

import Input from "../Form/Input";
import Button from "../Form/Button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { usePutUpdatePasswordMutation } from "../../redux/services/userApi";


export default function UpdateEmail() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [putUpdatePassword, { data, isLoading }] =
    usePutUpdatePasswordMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
      const response = await putUpdatePassword(data);
      if (response.error) toast.error(response.error.data.message);
      if (response.data) {
        toast.success(response.data.message)
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form onSubmit={onSubmit} className="border rounded-lg bg-white mt-5 ">
      <div className="border-b py-4 px-4">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Actualizar Contraseña
        </h2>
      </div>

      <div className="px-4">
        <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <Input
              label="Contraseña"
              type="password"
              placeholder=" "
              name="contrasena"
              register={register}
              options={{
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
            
              }}
              color={errors.contrasena && "danger"}
              isInvalid={errors.contrasena ? true : false}
              errorMessage={errors.contrasena && errors.contrasena.message}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6  sm:grid-cols-6">
          <div className="sm:col-span-3">
            <Input
              label="Nueva Contraseña"
              type="password"
              placeholder=" "
              name="nuevaContrasena"
              register={register}
              options={{
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
            
              }}
              color={errors.nuevaContrasena && "danger"}
              isInvalid={errors.nuevaContrasena ? true : false}
              errorMessage={errors.nuevaContrasena && errors.nuevaContrasena.message}
            />
          </div>

          <div className="sm:col-span-3">
            <Input
              label="Confirmar Contraseña"
              type="password"
              placeholder=" "
              name="confirmContrasena"
              register={register}
              options={{
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
                validate: (value) =>
                 value === watch('nuevaContrasena') || "Las contraseñas no coinciden",
                
            
              }}
              color={errors.confirmContrasena && "danger"}
              isInvalid={errors.confirmContrasena ? true : false}
              errorMessage={errors.confirmContrasena && errors.confirmContrasena.message}
            />
          </div>
        </div>

        <div className="col-span-full">
          <div className="sm:col-span-3">
            <Button
              type="submit"
              className="bg-neutral-900 text-white w-40 my-4"
            >
              Actualizar
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
