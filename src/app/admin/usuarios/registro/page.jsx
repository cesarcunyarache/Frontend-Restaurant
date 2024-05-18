"use client";
import { useState } from "react";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Autocomplete from "@/components/Autocomplete";
import Load from "@/components/Load";
import { usePostRegisterMutation } from "@/redux/services/usuariosApi";

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

import Select from "@/components/Form/Select";
import Textarea from "@/components/Form/TextArea";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useRouter } from "next/navigation";
import { useGetColaboradoresQuery } from "@/redux/services/colaboradorApi";

import { usePostSendOTPMutation } from "@/redux/services/userApi";

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

export default function Page({ data = {}, isUpdate = false, param = "" }) {
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

  /* console.log(param); */

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const [isModal, setIsModal] = useState(false);
  const [otp, setOtp] = useState("");

  const handleOpen = (backdrop) => {
    onOpen();
  };

  const [idEmpleado, setIdColaborador] = useState(param);

  const { data: colab, isLoading } = useGetColaboradoresQuery();

  const router = useRouter();
  const [postRegister, { isLoading: isLoadingCreate }] =
    usePostRegisterMutation();

  const [
    postSendOTP,
    {
      data: dataOTP,
      isLoading: isLoadingOTP,
      error: isErrorOTP,
      error: errorOTP,
    },
  ] = usePostSendOTPMutation();

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

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (idEmpleado !== null && idEmpleado !== "") {
        if (isModal) {
          handleOpen();
        } else {
          const response = await postSendOTP({ ...data, idEmpleado });
          if (response.error) toast.error(response.error.data.message);
          if (response.data) {
            toast.success(response.data.message)
            handleOpen();
            setIsModal(true);
          }
        }
      } else {
        toast.error("Seleccione un colaborador");
      }
    } catch (error) {
      console.error(error);
    }
  });

  const onSubmitModal = handleSubmit(async () => {
    try {
      if (idEmpleado !== null && idEmpleado !== "") {
        if (otp.length < 4) {
          toast.error("Completa los campos");
        } else {
          const data = {
            ...getValues(),
            otp,
            idEmpleado,
          };
          const response = await postRegister(data);
          if (response.error) toast.error(response.error.data.message);
          if (response.data) {
            toast.success(response.data.message);
            setIsModal(false);
            onClose();
            if (lastClickedButton === "crear") {
              router.push("/admin/usuarios");
            } else if (lastClickedButton === "crearOtro") {
              reset();
            }
          }
        }
      } else {
        toast.error("Seleccione un colaborador");
      }
    } catch (error) {
      console.error(error);
    }
  });

  const onHandleReSend = async () => {
    try {
      if (idEmpleado !== null && idEmpleado !== "") {
        const response = await postSendOTP({ ...getValues(), idEmpleado });
        if (response.error) toast.error(response.error.data.message);
        if (response.data) {
          toast.success(response.data.message)
          setIsModal(true);
        }
      } else {
        toast.error("Seleccione un colaborador");
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* const onSubmitDefault = handleSubmit(async (data) => {
    handleOpen();
     try {
      console.log({ ...data, idEmpleado });
      const response = await postCreate(data);
      if (response?.error) toast.error(response?.error?.data?.message);
      if (response?.data) {
        toast.success(response?.data?.message);
        if (lastClickedButton === "crear") {
          router.push("/admin/colaboradores");
        } else if (lastClickedButton === "crearOtro") {
          reset();
        }
      }
    } catch (error) {
      console.error(error);
    } 
  }); */

  /* const onSubmitUpdate = handleSubmit(async (data) => {
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
  }); */

  return (
    <div className="p-4 w-full h-full">
      {isLoading ? (
        <Load />
      ) : (
        <>
          <Breadcrumbs
            data={
              isUpdate
                ? [
                    {
                      value: "Usuarios",
                      href: "/admin/usuarios",
                    },
                    {
                      value: nombres,
                      href: `/admin/usuarios/${param}/editar`,
                    },
                    {
                      value: "Edit",
                      href: `/admin/usuarios/${param}/editar`,
                    },
                  ]
                : [
                    {
                      value: "Usuarios",
                      href: "/admin/usuarios",
                    },
                    {
                      value: "Crear",
                      href: "/admin/usuarios/registro",
                    },
                  ]
            }
            title={"Usuarios"}
          />
          <form onSubmit={onSubmit} className="  max-w-4xl mt-4" noValidate>
            <div className="px-4 border  pb-4 rounded-lg bg-white">
              <div className="mt-5 grid grid-cols-1 gap-x-6 sm:grid-cols-4">
                <div className="sm:col-span-3">
                  <Autocomplete
                    data={isLoading ? [] : colab?.data}
                    name="idEmpleado"
                    register={register}
                    defaultSelectedKey={idEmpleado}
                    onSelectionChange={(value) => {
                      setIdColaborador(value);
                    }}
                    options={{
                      validate: (value) => {
                        if (value === null) {
                          return "Este campo es requerido";
                        }
                      },
                    }}
                    color={idEmpleado === null && "danger"}
                    isInvalid={idEmpleado === null && true}
                    errorMessage={
                      idEmpleado === null && "Este campo es requerido"
                    }
                    isRequired
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-4">
                <div className="sm:col-span-3">
                  <Input
                    label="Correo"
                    type="email"
                    placeholder=" "
                    defaultValue={" "}
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
                    isRequired
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-4">
                <div className="sm:col-span-3">
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
                      minLength: {
                        value: 6,
                        message:
                          "La contraseña debe tener al menos 6 caracteres",
                      },
                    }}
                    color={errors.contrasena && "danger"}
                    isInvalid={errors.contrasena ? true : false}
                    errorMessage={
                      errors.contrasena && errors.contrasena.message
                    }
                    isRequired
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-4">
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
                        value === watch("contrasena") ||
                        "Las contraseñas no coinciden",
                    }}
                    color={errors.confirmContrasena && "danger"}
                    isInvalid={errors.confirmContrasena ? true : false}
                    errorMessage={
                      errors.confirmContrasena &&
                      errors.confirmContrasena.message
                    }
                    isRequired
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-4">
                <div className="sm:col-span-3">
                  <Select
                    placeholder="Seleccione el rol"
                    label="Rol"
                    data={[
                      { key: 1, value: "Administrador" },
                      { key: 2, value: "Colaborador" },
                    ]}
                    name="idRol"
                    {...(idTipoDoc !== ""
                      ? { defaultSelectedKeys: [idTipoDoc.toString()] }
                      : {})}
                    register={register}
                    options={{
                      validate: (value) => {
                        if (value === "") {
                          return "Este campo es requerido";
                        }
                      },
                    }}
                    color={errors.idRol && "danger"}
                    isInvalid={errors.idRol ? true : false}
                    errorMessage={errors.idRol && errors.idRol.message}
                    isRequired
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <div className="sm:col-span-3 flex flex-column gap-2 ">
                <Button
                  isLoading={isLoadingOTP && lastClickedButton === "crear"}
                  type="submit"
                  className="my-4"
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
                              onClick={onHandleReSend}
                            >
                              Reenviar
                            </NextLink>
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-row justify-end gap-2">
                        <Botton
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Cerrar
                        </Botton>
                        <Botton
                          type="submit"
                          isLoading={isLoadingOTP || isLoadingCreate}
                          className=" hover:bg-neutral-700"
                        >
                          {!isLoadingOTP && !isLoadingCreate && "Verficar"}
                        </Botton>
                      </div>
                    </form>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
}
