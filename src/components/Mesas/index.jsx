"use client";

import { useState } from "react";
import { Tooltip, Divider, Button, Chip } from "@nextui-org/react";

export default function Mesas({ data }) {
  const { idMesa, pLeft, pTop, estado, capacidad } = data;
  const [isActive, setIsActive] = useState(false);

 /*  const dispatch = useDispatch();
  const reserva = useSelector((state) => state.reserva);
  const { cantComensales, cantidad, mesas } = reserva?.reservaState?.value; */

  const cantComensales = 10;
  const cantidad = 10;

  const status = (state) => {
    switch (state) {
      case 0:
        return "bg-zinc-950 text-gray-50  border-hidden";
      case 1:
        return "";
      case 2:
        return "bg-zinc-500 text-gray-50  border-hidden";
    }
  };
  return (
    <Tooltip
      showArrow
      content={
        <div className="px-1 py-2">
          <div className="text-small font-bold">Info Mesa</div>
          <Divider className="my-1" />
          <div className="text-tiny">Capacidad: {capacidad}</div>
        </div>
      }
    >
      <Button
        className={`border-2 rounded-[7px]  absolute text-xs cursor-pointer font-sans font-semibold text-center bg-transparent min-w-0 min-h-0 ${
          isActive ? "bg-neutral-900 text-gray-50 border-hidden" : ""
        }  ${status(estado)} `}
        variant="bordered"
        size="md"
        key={idMesa}
        isIconOnly
        onClick={() => {
          /* isActive ? setIsActive(false) : setIsActive(true); */
          if (cantidad > 0) {
            if (isActive) {
              setIsActive(false);
              
            } else {
              setIsActive(true);
              
            }
          } else {
            if (isActive) {
              setIsActive(false);
             
            }
          }
        }}
        style={{
     /*      width: "20px",
          height: "20px",
          padding: "0px", */
          left: `${pLeft}%`,
          top: `${pTop}%`,
        }}
        disabled={estado === 1 ? false : true}
      >
        {idMesa}
      </Button>
    </Tooltip>
  );
}
