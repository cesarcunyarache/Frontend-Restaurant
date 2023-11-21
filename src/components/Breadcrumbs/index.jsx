import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function index({data = [], title}) {
  const router = useRouter();
  const handelOnClic = (href) => {
    router.push(href);
  };

  return (
    <div className="flex flex-col flex-wrap ">
      <Breadcrumbs underline="hover">
        {data.map((point, index) => {
          return (
            <BreadcrumbItem
              key={index}
              onClick={() => {
                router.push(point.href);
              }}
            >
              {point.value}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumbs>
      <h1 className="text-gray-950 font-semibold text-2xl font-sans tracking-wide mt-1">
        {title}
      </h1>
    </div>
  );
}
