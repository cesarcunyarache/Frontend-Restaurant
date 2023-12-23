"use client";

import "./sidebar.css";

import Close from "@/components/Icon/Close";
import Menu from "@/components/Icon/Menu";
import Home from "@/components/Icon/Home";
import Reservas from "@/components/Icon/Reservas";
import Mesero from "@/components/Icon/Mesero";
import Logo from "@/components/Icon/Logo";
import Colaboradores from "@/components/Icon/Colaboradores";
import Mesas from "@/components/Icon/Mesas";
import Logout from "@/components/Icon/Logout";
import Profile from "@/components/Icon/Profile";
import Edit from "@/components/Icon/Edit";
import Acount from "@/components/Icon/Acount";
import Comentarios from "@/components/Icon/Comentarios";
import Puntos from "@/components/Icon/Puntos";
import Qr from "@/components/Icon/Qr";
import Cuenta from "@/components/Icon/Cuenta";
import Link from "next/link";
import Users from "@/components/Icon/Users";
import Customers from "@/components/Icon/Customers";
import Productos from "@/components/Icon/Productos";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button, Avatar } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  cn,
} from "@nextui-org/react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button as Botton,
  useDisclosure,
} from "@nextui-org/react";

import { QrReader } from "react-qr-reader";

import {
  usePostLogoutMutation,
  useGetProfileQuery,
} from "@/redux/services/userApi";

import { useDispatch, useSelector } from "react-redux";
import { update } from "@/redux/features/loadSlice";

const selectRol = (rol) => {
  switch (rol) {
    case 1:
      return "Gerente";
    case 2:
      return "Administrador";
    case 3:
      return "Colaborador";
  }
};

export default function SideBar() {
  const { data: profile, isLoading, isError, error } = useGetProfileQuery();

   
  const dispatch = useDispatch();

/*   console.log(isLoading)
  useEffect(() => {
    dispatch(update(isLoading));

  } ,[isLoading]) */

  if (isError) console.log(error);

  const [postLogout] = usePostLogoutMutation();
  const pathname = usePathname();
  const router = useRouter();
  const ruta = pathname.split("/");
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(false);

  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const [hasReadCode, setHasReadCode] = useState(false);

  const [data, setData] = useState("");

  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const navLinks = [
    { title: "Dashboard", path: "/admin", icon: <Home />, idRol: 2 },
    {
      title: "Reservas",
      path: "/admin/reservas",
      icon: <Reservas />,
      idRol: 3,
    },
    {
      title: "Colaboradores",
      path: "/admin/colaboradores",
      icon: <Colaboradores />,
      idRol: 2,
    },

    {
      title: "Usuarios",
      path: "/admin/usuarios",
      icon: <Users />,
      idRol: 2,
    },

    {
      title: "Clientes",
      path: "/admin/clientes",
      icon: <Customers />,
      idRol: 3,
    },

    /*  {
      title: "Mesas",
      path: "/admin/mesas",
      icon: <Mesas />,
    }, */
    {
      title: "Meseros",
      path: "/admin/meseros",
      icon: <Mesero />,
      idRol: 2,
    },

    {
      title: "Cuentas de Clientes",
      path: "/admin/cuentasClientes",
      icon: <Acount />,
      idRol: 2
    },
    /* {
      title: "Comentarios",
      path: "/admin/comentarios",
      icon: <Comentarios />,
    },*/
    {
      title: "Productos",
      path: "/admin/productos",
      icon: <Productos />,
      idRol: 2
    },
    /* {
      title: "Puntos",
      path: "/admin/puntos",
      icon: <Puntos />,
      idRol: 3
    },  */
  ];

  const handeLogout = async () => {
    const response = await postLogout();
    console.log(response);
    window.location.href = "/";
  };

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
            Bravazo
          </span>
        </div>
        <hr />

        <nav className="navegacion my-4 h-full ">
          <ul>
            {navLinks.map((link) =>  {
              if (!isLoading && link.idRol >= profile?.data?.idRol ) {
                return (
              <li key={link.title} className="flex w-full mt-1">
                <Button
                  color=""

                  variant="light"
                  className="w-full h-12 p-0 "
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
                    `/${ruta[1]}${
                      ruta[2] !== undefined ? `/${ruta[2]}` : ""
                    }` === link.path
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
              </li>)
              }
            })}
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
                {profile?.data?.nombres}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                {selectRol(profile?.data?.idRol)}
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
                 <DropdownItem key="perfil" startContent={<Profile />}
                 onClick={() => {
                  router.push("/admin/perfil");
                }}>
                  Perfil
                </DropdownItem>
                <DropdownItem key="cuenta" startContent={<Cuenta />} onClick={() => {
                  router.push("/admin/mi-cuenta");
                }}>
                  Mi cuenta
                </DropdownItem>
                <DropdownItem
                  key="qr"
                  showDivider
                  startContent={<Qr />}
                  onClick={() => {
                    router.push("/admin/reservas/escanear");
                  }}
                >
                  Qr
                </DropdownItem>
                <DropdownItem
                  key="Logout"
                  className="text-danger"
                  color="danger"
                  startContent={<Logout />}
                  onClick={handeLogout}
                >
                  Cerrar Sesión
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
}
