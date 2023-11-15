"use client";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import IconBack from "./IconBack";

export default function Back() {
  const router = useRouter();
  return (
    <div className="w-full">
      <div className="">
        <Button onClick={() => router.back()} startContent={<IconBack/>} color="default" variant="light"> 
          Atrás
        </Button>
      </div>
    </div>
  );
}
