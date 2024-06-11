"use client";
import React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
} from "@nextui-org/react";

export default function index({
  data = [],
  name = "",
  register = () => { },
  options = {},
  ...props
}) 

{

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
     
      key={name}
      {...props}
      {...register(name, options)}

    >
      {(data) => {
    
          return (
            <AutocompleteItem key={data.idCategoria} textValue={data.categoria} classNames={{
              inputWrapper: [
                "group-data-[focus=true]:border-primary",
                "data-[hover=true]:border-[#E6E6E6]"
              ],
            }}>
              <div className="flex gap-4 items-center p-1">
                <Avatar
                  isBordered
                  name={data.categoria}
                  src={data.imagen}
                  className="flex-shrink-0"
                  size="sm"
                />
                <div className="flex flex-col">
                  <span className="text-small">{`${data.categoria} `}</span>
                  {/* <span className="text-tiny text-default-400">
                    {data.categoria}
                  </span> */}
                </div>
              </div>
            </AutocompleteItem>
          );
        }
    }
    </Autocomplete>
  );
}
