"use client";

import { Select as SelectUI, SelectItem } from "@nextui-org/react";

export default function Select({
  className = "",
  name = "",
  register = () => {},
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
