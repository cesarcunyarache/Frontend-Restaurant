"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { Checkbox } from "@nextui-org/react";
import Container from "@/components/Layout/Container";
import Button from "@/components/Form/Button";
import Input from "@/components/Form/Input";
import Form from "@/components/Form";
import Link from "@/components/Link";
import { useRouter } from "next/navigation";

import { usePostLoginMutation } from "../../redux/services/userApi";

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [postLogin, { data, isLoading, isError, error }] =
    usePostLoginMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await postLogin(data);
      if (response.error)  toast.error(response.error.data.message);
      if (response.data) console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  });

  /*  if ( isError) console.log(error.data.message); */

  if (data) {
    if (data.id) {
      window.location.href = "/admin/";
    }
  }

  return (
    <div className="w-full h-screen pt-36 px-4">
      <Form onSubmit={onSubmit} title='Login' method="POST" noValidate>
        <Input
          label="Correo"
          type="email"
          placeholder="Introduce tu correo electrónico"
          name="correo"
          isRequired
          register={register}
          options={{
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Formato de correo invalido",
            },
          }}
          color={errors.correo && "danger"}
          isInvalid={errors.correo ? true : false}
          errorMessage={errors.correo && errors.correo.message}
        />

        <Input
          label="Contraseña"
          type="password"
          placeholder="Introduce tu contraseña"
          name="contrasena"
          isRequired
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

        <div className="flex justify-end">
          <Link redirect="/forgetPassword">¿Olvidaste tu contraseña?</Link>
        </div>

        <Button type="submit" isLoading={isLoading}>
          Login
        </Button>
      </Form>
    </div>
  );
}
