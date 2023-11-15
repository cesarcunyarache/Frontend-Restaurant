"use client";

import { useRouter } from "next/navigation";
import Button from "../components/Form/Button";

export default function Notfound() {
  const router = useRouter();
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p classNames="text-base font-semibold text-stone-950">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>

        <div className="flex items-center justify-center mx-auto gap-x-6 ">
          <Button className="w-30" onClick={() => router.push("/")}>
            Regresar
          </Button>
        </div>
      </div>
    </main>
  );
}
