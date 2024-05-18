import { Button } from "@nextui-org/react";

export default function index({ className = "", children, ...props }) {
  return (
    <Button
      radius="sm"
      className={`bg-primary text-white  ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}
