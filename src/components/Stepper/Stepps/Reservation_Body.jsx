import React, { useState } from 'react';
import styles from './Reservation_Body.css'

export default function Reservation_Body() {
    const [selectedNivel, setSelectedNivel] = useState("opcion1"); // Define selectedNivel y su valor inicial

    const handleNivelChange = (event) => {
        setSelectedNivel(event.target.value);
    };

    return (
        <form className="border rounded-lg bg-white p-6  max-w-md">
            <div className="contenido">
                <h2 className="font-bold text-[18px] pb-2">Terraza Bravazo</h2>

                <div className="flex flex-row text-[14px] font-semibold">
                    <p className="pr-4">Juan Villegas Flores</p>
                    <p className="pr-4">Dia <span>18/11/2023</span></p>
                    <p className="pr-4">Hora <span>7:30 PM</span></p>
                    <p>2 <span>Personas</span></p>
                </div>
                <div className="pt-4 w-[500px]">
                    <div className="border w-[100%]"></div>
                </div>
            </div>

            <div className="leyenda pt-4">
                <ul className="flex flex-row">
                    <li className="pr-4"> <span className="bg-gray-500 rounded text-gray-500">....</span> Deshabilitado</li>
                    <li className="pr-4"> <span className="bg-red-600 rounded text-red-600">....</span> Reservado</li>
                    <li className="pr-4"> <span className="bg-blue-500 rounded text-blue-500">....</span> Disponible</li>
                    <li className="pr-4"> <span className="bg-green-600 rounded text-green-600">....</span> Seleccionado</li>
                </ul>
            </div>

            <div className="niveles">
                {selectedNivel === "opcion1" ? (

                    <div className="setContainer">
                        <div className="imagenUno relative">
                            <img
                                className=""
                                src="https://freepass.es/storage/seatschart/August2023/1691687721290.png"
                                alt="Segundo nivel"
                            />
                            <div className="span1">
                                <span id="seatmark_id_27_0" className="seat-mark" style={{ left: "86.5%", top: "26%" }}>1</span>
                            </div>
                            <div className="span2">
                                <span id="seatmark_id_27_1" className="seat-mark" style={{ left: "86.5%", top: "47.5%" }}>2</span>
                            </div>
                            <div className="span3">
                                <span id="seatmark_id_27_2" className="seat-mark" style={{ left: "77.4%", top: "26.6%" }}>3</span>
                            </div>
                            <div className="span4">
                                <span id="seatmark_id_27_3" className="seat-mark" style={{ left: "77.4%", top: "47.3%" }}>4</span>
                            </div>
                            <div className="span5">
                                <span id="seatmark_id_27_4" className="seat-mark" style={{ left: "69.8%", top: "61.3%" }}>5</span>
                            </div>
                            <div className="span6">
                                <span id="seatmark_id_27_5" className="seat-mark" style={{ left: "62.5%", top: "42.2%" }}>6</span>
                            </div>
                            <div className="span7">
                                <span id="seatmark_id_27_6" className="seat-mark" style={{ left: "54.2%", top: "42.1%" }}>7</span>
                            </div>
                            <div className="span8">
                                <span id="seatmark_id_27_7" className="seat-mark" style={{ left: "48.2%", top: "24.8%" }}>8</span>
                            </div>
                            <div className="span9">
                                <span id="seatmark_id_27_8" className="seat-mark" style={{ left: "39.7%", top: "24.9%" }}>9</span>
                            </div>
                            <div className="span10">
                                <span id="seatmark_id_27_9" className="seat-mark" style={{ left: "29.9%", top: "24.9%" }}>10</span>
                            </div>
                            <div className="span11">
                                <span id="seatmark_id_27_10" className="seat-mark" style={{ left: "21%", top: "24.9%" }}>11</span>
                            </div>
                            <div className="span12">
                                <span id="seatmark_id_27_11" className="seat-mark" style={{ left: "12.4%", top: "24.8%" }}>12</span>
                            </div>
                            <div className="span13">
                                <span id="seatmark_id_27_12" className="seat-mark" style={{ left: "13.6%", top: "42.5%" }}>13</span>
                            </div>
                            <div className="span14">
                                <span id="seatmark_id_27_13" className="seat-mark" style={{ left: "22.3%", top: "42.2%" }}>14</span>
                            </div>
                            <div className="span15">
                                <span id="seatmark_id_27_14" className="seat-mark" style={{ left: "32.2%", top: "42.2%" }}>15</span>
                            </div>
                            <div className="span16">
                                <span id="seatmark_id_27_15" className="seat-mark" style={{ left: "43.1%", top: "42.6%" }}>16</span>
                            </div>
                        </div>
                    </div>

                ) : (
                    <img
                        className=""
                        src="https://freepass.es/storage/seatschart/November2023/1699428797713.png"
                        alt="Tercer nivel"
                    />
                )}
            </div>
        </form>
    )
};