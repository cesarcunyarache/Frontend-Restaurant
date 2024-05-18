"use cliente";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/Icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/Icon/EyeSlashFilledIcon";
import { useState } from "react";


export default function InputPassword({ className = "", name = "", register = () => { }, options = {}, ...props }) {

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    
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
            type={isVisible ? "text" : "password"}
            color="warning"
            borderColor="orange"
            {...props}
            {...register(name, options)}
            endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                </button>
            }
        />
    );
}
