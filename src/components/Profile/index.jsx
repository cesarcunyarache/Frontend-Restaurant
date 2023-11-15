import { Select, SelectItem } from "@nextui-org/react";
import Input from "../Form/Input";
import Button from "../Form/Button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { usePutUpdateMutation } from "../../redux/services/userApi";

const validateDocument = {
  1: {
    length: 8,
    pattern: /^[0-9]*$/,
    message: "Este campo debe contener solo números",
  },
  2: {
    length: 12,
    pattern: /^[A-Za-z0-9]*$/,
    message: "Este campo debe contener solo caracteres alfanuméricos",
  },
  3: {
    length: 12,
    pattern: /^[A-Za-z0-9]*$/,
    message: "Este campo debe contener solo caracteres alfanuméricos",
  },
  4: {
    length: 11,
    pattern: /^[0-9]*$/,
    message: "Este campo debe contener solo números",
  },
};

export default function Profile(data = {}) {
  const {
    idTipoDoc,
    numeroDoc,
    nombres,
    apellidos,
    telefono,
    fechaNacimiento,
    genero,
  } = data?.data ?? {
    idTipoDoc: "DNI",
    numeroDoc: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    fechaNacimiento: "",
    genero: "",
  };

  const [putUpdate, { data: res, isLoading, isError, error }] =
    usePutUpdateMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setFieldValue,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data); 
      const response = await putUpdate(data);
      if (response.error)  toast.error(response.error.data.message);
      if (response.data) toast.success(response.data.message);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form onSubmit={onSubmit} className="border rounded-lg bg-white ">
      <div className="border-b py-4 px-4">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Información Personal
        </h2>
      </div>

      <div className="px-4">
        <div className="mt-5 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <Select
              variant="bordered"
              labelPlacement="outside"
              placeholder="Seleccione el tipo de documento"
              label="Tipo de Documento"
              className="py-2"
              radius="sm"
              size="md"
              {...(idTipoDoc ? { defaultSelectedKeys: [idTipoDoc.toString()] } : {})}
              color={errors.idTipoDoc && "danger"}
              isInvalid={errors.idTipoDoc ? true : false}
              errorMessage={errors.idTipoDoc && errors.idTipoDoc.message}
              onSelectionChange={() => setValue("numeroDoc", "")}
              {...register("idTipoDoc", {
                validate: (value) => {
                  if (value === "") {
                    return "Este campo es requerido";
                  }
                },
              })}
            >
              <SelectItem key={1} value="DNI">
                DNI
              </SelectItem>
              <SelectItem key={2} value="Carnet de Extranjería">
                Carnet de Extranjería
              </SelectItem>
              <SelectItem key={3} value="Pasaporte">
                Pasaporte
              </SelectItem>
              <SelectItem key={4} value="RUC">
                RUC
              </SelectItem>
            </Select>
          </div>
          <div className="sm:col-span-3">
            <Input
              label="Número de Documento"
              placeholder=" "
              name="numeroDoc"
              defaultValue={numeroDoc}
              /* isDisabled={watch("idTipoDoc") === undefined ? true : false} */
              register={register}
              maxLength={validateDocument[watch("idTipoDoc")]?.length}
              options={{
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
                pattern: {
                  value: validateDocument[watch("idTipoDoc")]?.pattern,
                  message: validateDocument[watch("idTipoDoc")]?.message,
                },
              }}
              color={errors.numeroDoc && "danger"}
              isInvalid={errors.numeroDoc ? true : false}
              errorMessage={errors.numeroDoc && errors.numeroDoc.message}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6  sm:grid-cols-6">
          <div className="sm:col-span-3">
            <Input
              label="Nombres"
              placeholder=" "
              name="nombres"
              defaultValue={nombres}
              onKeyDown={(e) => {
                if (
                  e.keyCode !== 32 &&
                  e.keyCode !== 8 &&
                  (e.keyCode < 65 || e.keyCode > 90)
                ) {
                  e.preventDefault();
                }
              }}
              register={register}
              options={{
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
              }}
              color={errors.nombres && "danger"}
              isInvalid={errors.nombres ? true : false}
              errorMessage={errors.nombres && errors.nombres.message}
            />
          </div>

          <div className="sm:col-span-3">
            <Input
              label="Apellidos"
              placeholder=" "
              name="apellidos"
              defaultValue={apellidos}
              onKeyDown={(e) => {
                if (
                  e.keyCode !== 32 &&
                  e.keyCode !== 8 &&
                  (e.keyCode < 65 || e.keyCode > 90)
                ) {
                  e.preventDefault();
                }
              }}
              register={register}
              options={{
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
              }}
              color={errors.apellidos && "danger"}
              isInvalid={errors.apellidos ? true : false}
              errorMessage={errors.apellidos && errors.apellidos.message}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <Input
              label="Telefono"
              type="text"
              placeholder=" "
              name="telefono"
              defaultValue={telefono}
              maxLength={9}
              onKeyDown={(e) => {
                if (
                  e.keyCode !== 8 &&
                  e.keyCode !== 32 &&
                  (e.keyCode < 48 || e.keyCode > 57 || e.keyCode === 229)
                ) {
                  e.preventDefault();
                }
              }}
              register={register}
              options={{
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },

                valueAsNumber: {
                  value: true,
                  message: "Este campo debe ser numerico",
                },
              }}
              color={errors.telefono && "danger"}
              isInvalid={errors.telefono ? true : false}
              errorMessage={errors.telefono && errors.telefono.message}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <Input
              label="Fecha de Nacimiento"
              type="date"
              placeholder=" "
              name="fechaNacimiento"
              defaultValue={fechaNacimiento}
              register={register}
              options={{
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
                validate: (value) => {
                  const fechaNacimiento = new Date(value);
                  const fechaActual = new Date();
                  const edad =
                    fechaActual.getFullYear() - fechaNacimiento.getFullYear();
                  return edad >= 16 || "Debes tener al menos 16 años";
                },
              }}
              color={errors.fechaNacimiento && "danger"}
              isInvalid={errors.fechaNacimiento ? true : false}
              errorMessage={
                errors.fechaNacimiento && errors.fechaNacimiento.message
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <Select
              variant="bordered"
              labelPlacement="outside"
              placeholder="Seleccione genero"
              label="Genero"
              className=" py-2"
              radius="sm"
              size="md"
              {...(genero ? { defaultSelectedKeys: [genero] } : {})}
              color={errors.genero && "danger"}
              isInvalid={errors.genero ? true : false}
              errorMessage={errors.genero && errors.genero.message}
              {...register("genero", {
                validate: (value) => {
                  if (value === "") {
                    return "Este campo es requerido";
                  }
                },
              })}
            >
              <SelectItem key="Masculino" value="Masculino">
                Masculino
              </SelectItem>
              <SelectItem key="Femenino" value="Femenino">
                Femenino
              </SelectItem>
            </Select>
          </div>
        </div>
        <div className="col-span-full">
          <div className="sm:col-span-3">
            <Button
              isLoading={isLoading}
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
