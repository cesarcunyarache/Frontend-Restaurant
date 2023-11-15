"use cliente";
import { Input } from "@nextui-org/react";
export default function index({className="", name = "", register = () => {},  options = {}, ...props }) {
  return (
    <Input
      className={`py-2 ${className}`}
      variant="bordered"
      radius="sm"
      size="md"
      labelPlacement="outside"
      type="text"
      {...props}
      {...register(name, options)}
    />
  );
}
