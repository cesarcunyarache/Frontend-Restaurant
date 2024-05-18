"use cliente";
import { Input } from "@nextui-org/react";
export default function index({className="", name = "", register = () => {},  options = {}, ...props }) {
  return (
    <Input
      className={`py-2 ${className}`}
      classNames={{
        
        inputWrapper: [
          "group-data-[focus=true]:border-orange-500",
          "data-[hover=true]:border-[#E6E6E6]"
        ],
      }}
      variant="bordered"
      radius="sm"
      size="md"
       labelPlacement="outside"
      type="text"
      color="warning"
      borderColor="orange"
      {...props}
      {...register(name, options)}
    />
  );
}
