import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { animals } from "./data";

export default function App() {
    const colors = [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
    ];

    return (
        <div className="w-full flex flex-row flex-wrap gap-4">
            {colors.map((color) => (
                <Autocomplete
                   
                    color={color}
                    variant="bordered"
                    radius="sm"
                    size="md"
                    labelPlacement="outside"
                    defaultItems={animals}
                    label="Favorite Animal"
                    placeholder="Search an animal"
                    defaultSelectedKey={"cat"}
                    className="max-w-xs"
                >
                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                </Autocomplete>
            ))}
        </div>
    );
}
