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
      className={`max-w-md p-4 mx-auto border rounded-lg ${className}`}
      {...props}
    >
      {title === "" ? null : (
        <h1 className="text-center text-lg font-black my-4">{title}</h1>
      )}
      {children}
    </form>
  );
}
