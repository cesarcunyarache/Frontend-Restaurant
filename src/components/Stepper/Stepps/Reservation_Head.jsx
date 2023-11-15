import React, { useState } from "react";
import styles from "./Reservation_Head.css";
import Input from "../../Form/Input";

import { Select, SelectItem } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
export default function Reservation_Head() {
  const [selectedNivel, setSelectedNivel] = useState("opcion1"); // Define selectedNivel y su valor inicial

  const handleNivelChange = (event) => {
    setSelectedNivel(event.target.value);
  };

  return (
    <form className="border rounded-lg bg-white p-6  ">
      {/*  <div className="datos_reserva border rounded w-[80%] p-8 font-semibold"> */}
      <h2 className="font-bold text-[18px]">DATOS DE RESERVA</h2>
      <p className="pt-2 pb-2 font-normal text-[14px]">
        Complete los siguientes datos para realizar su reserva
      </p>

      <Input
        label="Cantidad de Comensales"
        placeholder="Ingrese la cantidad de comensales"
        type="number"
        name="cantComensales"
      />

      <Input
        label="Fecha"
        placeholder="Ingrese la fecha"
        type="date"
        name="fecha"
      />

      {/* <label>
          Hora
          <div className="bg-[#F4F4F5] rounded-xl h-[50px] w-auto">
            <select
              className="font-normal items-center m-auto p-4 bg-transparent text-[14px]"
              name=""
              id=""
            >
              <option className="text-[14px]" value="opcion1">
                Opción 1
              </option>
              <option className="text-[14px]" value="opcion2">
                Opción 2
              </option>
              <option className="text-[14px]" value="opcion3">
                Opción 3
              </option>
              <option className="text-[14px]" value="opcion4">
                Opción 4
              </option>
              <option className="text-[14px]" value="opcion5">
                Opción 5
              </option>
            </select>
          </div>
        </label> */}

      <Input
        label="Hora"
        placeholder="Ingrese la hora"
        type="time"
        name="hora"
        step="1h"
        min={8}
        max={20}
      />

      <Select
        variant="bordered"
        labelPlacement="outside"
        placeholder="Seleccione el nivel"
        label="Nivel"
        className="py-2"
        radius="sm"
        size="md"
      >
        <SelectItem key={1} value="Segundo nivel">
          Segundo nivel
        </SelectItem>
        <SelectItem key={2} value=" Tercer nivel">
          Tercer nivel
        </SelectItem>
      </Select>

      <Textarea
        className="py-2"
        variant="bordered"
        radius="sm"
        size="md"
        labelPlacement="outside"
        label="Comentario"
        placeholder="Ingrese un comentario (opcional)"
        name="Comentario"
      />

      {/*  <button className="text-[14px] m-auto text-center text-white font-semibold bg-red-600 rounded h-auto p-2 hover:bg-red-700">
            Comprobar disponibilidad
          </button> */}
      {/*   </div> */}
    </form>
  );
}
