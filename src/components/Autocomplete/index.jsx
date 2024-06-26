"use client";
import React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Divider,
} from "@nextui-org/react";
import { Main } from "next/document";

export default function index({
  data = [],
  name = "",
  register = () => { },
  options = {},
  ...props
}) {
  return (
    <Autocomplete
      defaultItems={data}
      variant="bordered"
      labelPlacement="outside"
      radius="sm"
      size="md"
      className="label:text-lime-500"
      inputProps={{
        classNames: {
          inputWrapper: "group-data-[focus=true]:border-primary data-[hover=true]:border-[#E6E6E6]",
        },
      }}
      classNames={{
        label: [
          "text-lime-500"
        ],
        base: [
          "text-lime-500",
  


           [],
        ],
      

        inputWrapper: [
          "bg-teal-300",
          "text-lime-500",
        ]
  


      }}
      key={name}
      {...props}
      {...register(name, options)}

    >
      {(data) => {
        if (data.idUsuario === null) {
          return (
            <AutocompleteItem key={data.idEmpleado} textValue={data.numeroDoc} classNames={{
              inputWrapper: [
                "group-data-[focus=true]:border-primary",
                "data-[hover=true]:border-[#E6E6E6]"
              ],
            }}>
              <div className="flex gap-4 items-center p-1">
                <Avatar
                  isBordered
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
        }
      }}
    </Autocomplete>
  );
}
