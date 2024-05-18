import React from "react";
import { DatePicker } from "@nextui-org/react";

export default function index({ label, ...props }) {
    return (
        <DatePicker
            variant="bordered"
            className=""
            labelPlacement="outside"
            classNames={{
                innerWrapper: [
                    "focus-within\:border-primary:focus-within",
                    "focus-within[focus-within=true]:border-primary",
                    ":focus-within:border-primary",
                    "focus-within:border-red-800",

                    "focus-within:hover:border-default-foreground:hover:focus-within:border-red-500",
                    "focus-within:border-default-foreground:focus-within:border-red-500",
                    "focus-within:border-red-500:focus-within"
                ],
                inputWrapper: [
                    "focus-within\:border-primary:focus-within",
                    "focus-within[focus-within=true]:border-primary",
                    ":focus-within:border-primary",
                    "focus-within:border-red-800",
                    "focus-within:hover:border-default-foreground:hover:focus-within:border-red-500",
                    "focus-within:border-red-500:focus-within"

                ]
            }}
            label={label}
            radius="sm"
            size="md"

            showMonthAndYearPickers
            {...props}
        />
    );
}
