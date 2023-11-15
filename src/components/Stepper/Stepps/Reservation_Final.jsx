import React, { useState } from "react";
import styles from "./Reservation_Final.css";
import Collaborators from "../../Collaborators";

export default function Reservation_Final() {
  return (
    <form className="border rounded-lg bg-white p-6 ">
      <div className="elegirMesero pt-4">
        <h2 className="text-[18px] font-bold pb-2 pl-8 pr-4 m-auto">
          "En nuestro restaurante, te damos el control. Elije a tu mesero o
          mesera favorito/a y disfruta de un servicio a medida."
        </h2>
        <div className="contenido flex flex-row">
          <div className="ladoIzquiero flex flex-row">
            <div className="colaboradores w-[300px] pt-4 pl-10">
              <Collaborators autoPlay={false} />
            </div>
          </div>
          <div className="ladoDerecho p-8 font-bold">
            <p>Nombre de mesero</p>
            <p className="pb-4 pt-2">Disponibilidad</p>
            <button className="text-[14px] m-auto text-center text-white font-semibold bg-red-600 rounded h-auto w-[100px] p-2 hover:bg-red-700">
              Elegir
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
