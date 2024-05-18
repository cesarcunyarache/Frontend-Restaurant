"use client";

import { Select as SelectUI, SelectItem } from "@nextui-org/react";

export default function Select({
  className = "",
  name = "",
  register = () => { },
  data = [],
  options = {},
  ...props
}) {
  return (
    <SelectUI
      variant="bordered"
      labelPlacement="outside"
      className={`top-0 py-2 ${className}`}
      classNames={{
        label: "top-[29px]",

        trigger: [
          "data-[open=true]:border-primary",
          "data-[focus=true]:border-primary",
          "data-[hover=true]:border-[#E6E6E6]",
        ],

        label: "top-[29px] pb-[10px] ",
      }}
      radius="sm"
      size="md"
      key={name}
      {...props}
      {...register(name, options)}
    >
      {data.map((option) => (
        <SelectItem key={option.key} value={option.value}>
          {option.value}
        </SelectItem>
      ))}
    </SelectUI>
  );
}
