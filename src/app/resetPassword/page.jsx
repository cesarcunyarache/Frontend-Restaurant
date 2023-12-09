"use client";

import Container from "../../components/Layout/Container";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import Form from "@/components/Form";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import {usePutResetPasswordMutation} from '../../redux/services/userApi'

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { register, handleSubmit,  watch,
    formState: { errors }, } = useForm();

  const [putResetPassword, { data, isLoading }] =
    usePutResetPasswordMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const token = searchParams.get('token')
      const response = await putResetPassword({
        ...data,
        token
      });
      if (response.error) toast.error(response.error.data.message);
      if (response.data) toast.success(response.data.message);

    } catch (error) {
      console.error(error);
    }
  });

  if (data) {
    if (data.status === "ok") router.push("/login");
  }

  return (
    <div className="w-full h-screen pt-36">
      <Form
        onSubmit={onSubmit}
        method="POST"
        title="Restablecer Contraseña"
        noValidate
      >

        <Input
          label="Nueva Contraseña"
          placeholder=" "
          type="password"
          isRequired
          name="contrasena"
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
        <Input
          label="Confirmar Contraseña"
          placeholder=" "
          type="password"
          isRequired
          name="confirmContrasena"
          register={register}
          options={{
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            validate: (value) =>
             value === watch('contrasena') || "Las contraseñas no coinciden",
          }}
          color={errors.confirmContrasena && "danger"}
          isInvalid={errors.confirmContrasena ? true : false}
          errorMessage={errors.confirmContrasena && errors.confirmContrasena.message}
        />
        <Button type="submit" isLoading={isLoading}>Restablecer</Button>
      </Form>
    </div>
  );
}
