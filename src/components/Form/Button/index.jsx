import { Button } from "@nextui-org/react";

export default function index({ className = "", children, ...props }) {
  return (
    <Button
      radius="sm"
      className={`bg-neutral-900 text-white w-full my-4 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}
