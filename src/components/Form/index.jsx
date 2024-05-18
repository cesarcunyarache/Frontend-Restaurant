import React from "react";
import { Input } from "@nextui-org/react";
export default function Form({
  title = "",
  className = "",
  onSubmit = () => {},
  children,
  ...props
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={` p-4  border rounded-lg ${className}`}
      {...props}
    >
      {title === "" ? null : (
        <h1 className="text-center text-2xl font-black my-10">{title}</h1>
      )}
      {children}
    </form>
  );
}
