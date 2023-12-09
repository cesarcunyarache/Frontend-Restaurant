"use client";
import Container from "../../components/Layout/Container";

import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import Form from "@/components/Form";
import { useForm } from "react-hook-form";
import { usePostForgetPasswordMutation } from "../../redux/services/userApi";

import { toast } from "sonner";

export default function Page() {
  const { register, handleSubmit, formState: { errors }} = useForm();

  const [postForgetPassword, { data, isLoading }] =
    usePostForgetPasswordMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await postForgetPassword(data);
      if (response.error) toast.error(response.error.data.message);
      if (response.data) toast.success(response.data.message);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div className="w-full h-screen pt-36">
      <Form
        onSubmit={onSubmit}
        method="POST"
        title='Ingresa tu correo'
        noValidate
      >
        <Input
          autoFocus
          label="Correo"
          type="email"
          placeholder="Introduce tu correo electrónico"
          isRequired
          name="correo"
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
        <Button type="submit" isLoading={isLoading}>Enviar</Button>
      </Form>
    </div>
  );
}
