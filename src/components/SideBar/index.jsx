"use client";

import "./sidebar.css";
import Close from "@/components/Icon/Close";
import Menu from "@/components/Icon/Menu";
import Home from "@/components/Icon/Home";
import Reservas from "@/components/Icon/Reservas";
import Logo from "@/components/Icon/Logo";
import Colaboradores from "@/components/Icon/Colaboradores";
import Logout from "@/components/Icon/Logout";
import Profile from "@/components/Icon/Profile";
import Edit from "@/components/Icon/Edit";
import Qr from "@/components/Icon/Qr";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button, Avatar } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  cn,
} from "@nextui-org/react";

import { usePostLogoutMutation } from "@/redux/services/userApi";

export default function SideBar() {
  const [ postLogout ] = usePostLogoutMutation();
  const pathname = usePathname();

  const ruta = pathname.split('/');
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(false);
 

  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const navLinks = [
    { title: "Dashboard", path: "/admin", icon: <Home /> },
    { title: "Reservas", path: "/admin/reservas", icon: <Reservas /> },
    {
      title: "Colaboradores",
      path: "/admin/colaboradores",
      icon: <Colaboradores />,
    },
  ];

  const handeLogout = async () => {
    const response = await postLogout();
    console.log(response);
    window.location.href = "/"
  }

  return (
    <>
      <div
        className="menu bg-black"
        onClick={() => (active ? setActive(false) : setActive(true))}
      >
        <Menu />
        <Close />
      </div>

      <div
        className={`barra-lateral  flex flex-col justify-between w-[280px] min-w-[280px] h-full p-4 bg-white transition-all duration-500 ease-in-out z-50 ${
          !expanded ? "min-w-[80px] w-[80px]" : ""
        }  ${active ? "max-barra-lateral" : ""}`}
      >
        <div className="nombre-pagina flex ml-2 my-2 items-center">
          <div
            onClick={() => (expanded ? setExpanded(false) : setExpanded(true))}
          >
            <Logo />
          </div>
          <span
            className={`font-bold text-2xl ml-1 ${
              !expanded ? "w-0 opacity-0" : ""
            }`}
          >
            Bravaso
          </span>
        </div>
        <hr />

        <nav className="navegacion my-4 h-full ">
          <ul>
            {navLinks.map((link) => (
              <li key={link.title} className="flex w-full mt-1">
                <Button
                  color="default"
                  variant="light"
                  className="w-full h-12 p-0"
                  isIconOnly={expanded ? false : true}
                >
                  <Link
                    passHref
                    href={link.path}
                    className={`
                  flex items-center text-lg w-full 
                  h-12 rounded-xl text-zinc-500
                  hover:text-zinc-950
                  hover:bg-gray-100 ${

                    `/${ruta[1]}${ruta[2] !== undefined ? `/${ruta[2]}` : ''}` === link.path 
                      ? "bg-gray-100 text-zinc-950 font-semibold"
                      : ""
                  }`}
                    onClick={() => {
                      setActive(false);
                    }}
                  >
                    <div className="mx-3 ">{link.icon}</div>
                    <span
                      className={` mr-6 ${!expanded ? "w-0 opacity-0" : ""}`}
                    >
                      {link.title}
                    </span>
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <hr />
        <div className="w-full">
          <div className="px-2 my-2 gap-2 flex justify-around items-center h-12 w-full ">
            <Avatar
              isBordered
              radius="sm"
              size="sm"
              src="/user.svg"
              className={`p-1 ${!expanded ? "hidden" : ""}`}
            />
            <div
              className={`flex flex-col items-start justify-center ${
                !expanded ? "hidden" : ""
              }`}
            >
              <h4 className="text-small font-semibold leading-none text-default-600">
                Cesar Cunyarache
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                @csarcastillo
              </h5>
            </div>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  color="default"
                  variant="light"
                  className="flex p-0"
                  isIconOnly
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                    />
                  </svg>
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="flat">
                <DropdownItem key="perfil" startContent={<Profile />}>
                  Perfil
                </DropdownItem>
                <DropdownItem key="editar" startContent={<Edit />}>
                  Editar
                </DropdownItem>
                <DropdownItem key="qr" showDivider startContent={<Qr />}>
                  Qr
                </DropdownItem>
                <DropdownItem
                  key="Logout"
                  className="text-danger"
                  color="danger"
                  startContent={<Logout />}
                  onClick={handeLogout}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
}
