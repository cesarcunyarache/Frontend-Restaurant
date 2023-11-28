"use client";
import React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Divider,
} from "@nextui-org/react";
import Profile from "../Icon/Profile";
/* import {datas} from "./data"; */

export default function AutocompleteMeseros({
  data = [],
  name = "",
  register = () => {},
  options = {},
  ...props
}) {
  return (
    <Autocomplete
      defaultItems={data}
      label="Colaborador"
      variant="bordered"
      labelPlacement="outside"
      placeholder="Seleccione el colaborador"
      radius="sm"
      size="md"
      popoverContent
      key={name}
      {...props}
      {...register(name, options)}
    >
      {(data) => {
        return (
          <AutocompleteItem key={data.idMesero} textValue={data.numeroDoc}>
            <div className="flex gap-4 items-center p-1">
              <Avatar
                isBordered
                src={data.imagen}
                name={data.nombres}
                className="flex-shrink-0"
                size="sm"
              />
              <div className="flex flex-col">
                <span className="text-small">{`${data.nombres} ${data.apellidos}`}</span>
                <span className="text-tiny text-default-400">
                  {data.numeroDoc}
                </span>
              </div>
            </div>
          </AutocompleteItem>
        );
      }}
    </Autocomplete>
  );
}
