"use client"

import { Select as SelectUI, SelectItem } from "@nextui-org/react";

export default function Select({className="", name = "", register = () => {}, options = [], ...props }) {
  return (
    <SelectUI
      variant="bordered"
      labelPlacement="outside"
      className={`py-2 ${className}`}
      radius="sm"
      size="md"

      {...props}
      {...register(name, options)}
    >
      {options.map((option) => (
        <SelectItem key={option.key} value={option.value}>
          {option.value}
        </SelectItem>
      ))}
    </SelectUI>
  );
}
