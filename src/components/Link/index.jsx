"use client";

import { Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function index ({ children, ...props }) {
  const router = useRouter();
  return (
    <Link
      className="text-zinc-900 text-sm font-bold cursor-pointer"
      underline="hover"
      {...props}
      onClick={() => router.push(props.redirect)}
    >
      {children}
    </Link>
  );
}
