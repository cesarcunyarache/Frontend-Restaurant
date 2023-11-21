"use client";

import Input from "../Form/Input";
import Button from "../Form/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button as Botton,
  useDisclosure,
} from "@nextui-org/react";

import { usePutUpdatePasswordMutation } from "../../redux/services/usuariosApi";

export default function UpdateEmail() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const [isModal, setIsModal] = useState(false);
  const [otp, setOtp] = useState("");

  const handleOpen = (backdrop) => {
    onOpen();
  };

  const [putUpdatePassword, { data, isLoading }] =
    usePutUpdatePasswordMutation();

  const onSubmitModal = handleSubmit(async (data) => {
    try {
      console.log({ ...data, ...getValues });
      const response = await putUpdatePassword({ ...data, ...getValues });
      if (response.error) {
        console.log(response.error);
        toast.error(response.error.data.message);
      }
      if (response.data) {
        toast.success(response.data.message);
        reset();
        onClose()
      }
    } catch (error) {
      console.error(error);
    }
  });

  const onSubmit = handleSubmit((data) => {
    handleOpen();
  });

  return (
    <>
      <form onSubmit={onSubmit} className="border rounded-lg bg-white mt-5 ">
        <div className="border-b py-4 px-4">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Actualizar Contraseña
          </h2>
        </div>

        <div className="px-4">
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
                errorMessage={
                  errors.nuevaContrasena && errors.nuevaContrasena.message
                }
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
                    value === watch("nuevaContrasena") ||
                    "Las contraseñas no coinciden",
                }}
                color={errors.confirmContrasena && "danger"}
                isInvalid={errors.confirmContrasena ? true : false}
                errorMessage={
                  errors.confirmContrasena && errors.confirmContrasena.message
                }
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

      <Modal
        backdrop={backdrop}
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center p-0 ">
                <h1 className="font-bold mt-4">
                  Ingresa la contraseña de tu cuenta
                </h1>
                {/* <p className="mt-4 text-sm text-slate-500">
                  Se ha enviado una codigo a su correo electrónico ingresado
                  <span className="text-slate-950"> {watch("correo")}</span>
                </p> */}
              </ModalHeader>
              <ModalBody className="">
                <form onSubmit={onSubmitModal}>
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
                    errorMessage={
                      errors.contrasena && errors.contrasena.message
                    }
                  />

                  <div className="flex flex-row justify-end gap-2">
                    <Botton color="danger" variant="light" onPress={onClose}>
                      Cerrar
                    </Botton>
                    <Botton
                      type="submit"
                     isLoading={isLoading}
                      className="bg-neutral-900 text-white hover:bg-neutral-700"
                    >
                      Actualizar
                    </Botton>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
