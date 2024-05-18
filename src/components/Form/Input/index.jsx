"use cliente";
import { Input } from "@nextui-org/react";
export default function index({ className = "", name = "", endContent = null, register = () => { }, options = {}, ...props }) {
  return (
    <Input

      className={`py-2 ${className}`}
      classNames={{

        inputWrapper: [
          "group-data-[focus=true]:border-primary",
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
      endContent={
        endContent
      }
    />
  );
}
