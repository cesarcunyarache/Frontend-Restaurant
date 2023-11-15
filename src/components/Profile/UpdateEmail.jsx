"use client";

import Input from "../Form/Input";
import Button from "../Form/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  usePostSendOTPUpdateEmailMutation,
  usePutUpdateEmailMutation,
} from "../../redux/services/userApi";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button as Botton,
  useDisclosure,
} from "@nextui-org/react";

import OtpInput from "react-otp-input";
import { Link as NextLink } from "@nextui-org/react";

export default function UpdateEmail(data = {}) {
  const { correo } = data?.data ?? {
    correo: "",
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const [isModal, setIsModal] = useState(false);
  const [otp, setOtp] = useState("");

  const handleOpen = (backdrop) => {
    onOpen();
  };

  const { register, handleSubmit, watch, getValues, setValue, formState: { errors } } = useForm();

  const [putUpdateEmail, { data: dataUpdate, isLoading, isError, error }] =
    usePutUpdateEmailMutation();

  const [
    postSendOTPUpdateEmail,
    {
      data: dataOTP,
      isLoading: isLoadingOTP,
      error: isErrorOTP,
      error: errorOTP,
    },
  ] = usePostSendOTPUpdateEmailMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (isModal) {
        handleOpen();
      } else {
        const response = await postSendOTPUpdateEmail(data);
        if (response.error) toast.error(response.error.data.message);
        if (response.data) {
          handleOpen();
          setIsModal(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

  const onSubmitModal = handleSubmit(async () => {
    try {
      if (otp.length < 4) {
        toast.error("Completa los campos");
      } else {
        const data = {
          ...getValues(),
          otp,
        };
        const response = await putUpdateEmail(data);
        if (response.error) toast.error(response.error.data.message);
        if (response.data) {
          toast.success(response.data.message);
          setValue("contrasena", "")
          setIsModal(false);
          onClose();
        } 
          
          
      }
    } catch (error) {
      console.error(error);
    }
  });

  const handleResend = async () => {
    try {
      const response = await postSendOTPUpdateEmail({
        correo: watch("correo"),
        contrasena: watch("contrasena"),
      });
      if (response.error) toast.error(response.error.data.message);
      if (response.data) toast.error(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="border rounded-lg bg-white  mt-5">
        <div className="border-b py-4 px-4">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Información de la cuenta
          </h2>
        </div>

        <div className="px-4">
          <div className="mt-5 col-span-full">
            <Input
              label="Correo"
              type="email"
              placeholder=" "
              defaultValue={correo}
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
          </div>

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

          <div className="col-span-full">
            <div className="sm:col-span-3">
              <Button
                type="submit"
                className="bg-neutral-900 text-white w-40 my-4"
                isLoading={isLoadingOTP}
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
              <ModalHeader className="flex flex-col text-center">
                <h1 className="font-bold">Verificar Correo</h1>
                <p className="mt-4 text-sm text-slate-500">
                  Se ha enviado una codigo a su correo electrónico ingresado
                  <span className="text-slate-950"> {watch("correo")}</span>
                </p>
              </ModalHeader>
              <ModalBody className="m-2 ">
                <form onSubmit={onSubmitModal}>
                  <div className="flex flex-col">
                    <div className="mx-auto max-w-md">
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        inputStyle={
                          "bg-white border-2 border-gray-300 text-gray-900 text-4xl rounded-lg text-center hover:border-slate-400 hover:border-2 focus:outline-none focus:border-slate-700 focus:ring-slate-700 m-2 h-12 w-20"
                        }
                        renderSeparator={<span></span>}
                        renderInput={(props) => <input {...props} />}
                      />
                    </div>

                    <div className="flex flex-row justify-center my-5 text-sm">
                      <p>
                        ¿No recibiste el código?{" "}
                        <NextLink
                          className="text-zinc-900 text-sm font-bold cursor-pointer"
                          underline="hover"
                          onClick={handleResend}
                        >
                          Reenviar
                        </NextLink>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row justify-end gap-2">
                    <Botton color="danger" variant="light" onPress={onClose}>
                      Cerrar
                    </Botton>
                    <Botton
                      type="submit"
                      isLoading={isLoading || isLoadingOTP}
                      className="bg-neutral-900 text-white hover:bg-neutral-700"
                    >
                      {!isLoading && !isLoadingOTP && "Verficar"}
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
