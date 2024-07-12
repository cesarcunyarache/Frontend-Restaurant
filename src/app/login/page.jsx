"use client";

import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { Checkbox, Image } from "@nextui-org/react";
import Container from "@/components/Layout/Container";
import Button from "@/components/Form/Button";
import Input from "@/components/Form/Input";
import Form from "@/components/Form";
import Link from "@/components/Link";
import { useRouter } from "next/navigation";
import { MailIcon } from "@/components/Icon/MailIcon";

import { usePostLoginMutation } from "../../redux/services/userApi";
import InputPassword from "@/components/Form/InputPassword";

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
      if (response?.error) {
        console.log(response);
        toast.error(response?.error?.data?.message);
      }
      if (response?.data) console.log(response?.data);
    } catch (error) {
      console.error(error);
    }
  });

  if (data) {
    if (data.idEmpleado) {
      window.location.href = "/admin/";
    }
  }

  const myHeaders = new Headers();
  myHeaders.append("Origin", "dev");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({});

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    credentials: "include"
  };

  fetch(
    "https://api-rest-restaurant/colaboradorAuth/login",
    requestOptions
  )
    .then((response) => console.log(response.json))
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

  return (
    <div className="flex w-full h-screen">
      <div className="w-full h-full lg:min-w-[60%] hidden md:block">
        <Image
          src="/login.jpg"
          alt=""
          className="object-cover h-full w-full  rounded-r-3xl py-[.2px] "
        />
      </div>

      <div className="w-full flex  justify-center items-center ">
        <Form
          onSubmit={onSubmit}
          method="POST"
          noValidate
          className="border-0 min-w-[90%] lg:px-[4rem] items-center "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 mb-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
              className="text-primary"
            />
          </svg>

          <h1 className=" text-2xl font-black pb-6">Iniciar Sesión</h1>
          <Input
            label="Correo electrónico"
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
            endContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />

          <InputPassword
            label="Contraseña"
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

          <Button type="submit" isLoading={isLoading} className="mt-6 w-full">
            Iniciar Sesión
          </Button>
        </Form>
      </div>
    </div>
  );
}
