"use client";
import { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import { useDispatch, useSelector } from "react-redux";

import Load from "@/components/Load";
export default function AdminLayout({ children }) {
  /*   const load = useSelector((state) => state.loadReducer);
    const [isLoading, setIsLoading] = useState(load?.value); */

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <SideBar />
      <main className=" w-full overflow-auto mt-[72px] mb-2 ">{children}</main>
    </div>
  );
}
