import React, { Children } from "react";
import { Dropdown, DropdownItem } from "@nextui-org/react";

export default function DropdownRend({children, ...props}) {
  return (
    <>
      <DropdownItem {...props}> {children}</DropdownItem>
    </>
  );
}
