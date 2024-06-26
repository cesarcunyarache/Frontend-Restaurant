"use client";

import "./sidebar.css";

import Close from "@/components/Icon/Close";
import Menu from "@/components/Icon/Menu";
import Home from "@/components/Icon/Home";
import Reservas from "@/components/Icon/Reservas";
import Mesero from "@/components/Icon/Mesero";
import Logo from "@/components/Icon/Logo";
import Colaboradores from "@/components/Icon/Colaboradores";
import Categoria from "@/components/Icon/Categoria";
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
import ShoppingCart from "@/components/Icon/ShoppingCart";
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

    /* {
      title: "Reservas",
      path: "/admin/reservas",
      icon: <Reservas />,
      idRol: 3,
    } */,

    {
      title: "Ventas",
      path: "/admin/ventas",
      icon: <ShoppingCart />,
      idRol: 2,
    },


    {
      title: "Empleados",
      path: "/admin/empleados",
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
    /*  {
       title: "Meseros",
       path: "/admin/meseros",
       icon: <Mesero />,
       idRol: 2,
     }, */

    /* {
      title: "Cuentas de Clientes",
      path: "/admin/cuentasClientes",
      icon: <Acount />,
      idRol: 2
    }, */
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

    {
      title: "Categoria",
      path: "/admin/categorias",
      icon: <Categoria />,
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
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                onClick={() => {
                  expanded ? setExpanded(false) : setExpanded(true)
                }}>
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <a href="/admin" className="flex ms-2 md:me-24 justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-primary mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                </svg>

                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Restaurante</span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <div className="w-full">
                    <div className=" gap-2 flex justify-around items-center h-12 w-full ">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            color="default"
                            variant="light"
                            className="flex p-0"
                            isIconOnly
                            radius="full"
                          >

                            <Avatar
                              isBordered
                              radius="full"
                              size="sm"
                              name="CE"
                            // src="/user.svg"
                            /* className={`p-1 ${!expanded ? "hidden" : ""}`} */
                            />
                            <div
                              className={`flex flex-col items-start justify-center ${!expanded ? "hidden" : ""
                                }`}
                            >
                              {/*  <h4 className="text-small font-semibold leading-none text-default-600">
                                {profile?.data?.nombres}
                              </h4>
                              <h5 className="text-small tracking-tight text-default-400">
                                {selectRol(profile?.data?.idRol)}
                              </h5> */}
                            </div>
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

              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className={`${expanded ? 'sm:hidden' : "hidden"} z-50 bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm`} onClick={() => setExpanded(false)}></div>

      < aside id="logo-sidebar" className={`relative w-[320px] top-0 left-0 transition-all duration-300  h-screen pt-20  bg-white border-r border-gray-200  xs:fixed ${expanded ? 'xs:translate-x-0 xs:z-50 xs:w-[225px]' : 'xs:translate-x-[-320px] xs:z-50 xs:w-[225px] '} `} >
        <div id="logo-sidebar" className={` ${!expanded && "xs:hidden"} h-full px-3 pb-4 overflow-y-auto bg-white `} aria-label="Sidebar">
          <nav id="logo-sidebar" className="navegacion my-4">
            <ul>
              {navLinks.map((link) => {
                /*   if (!isLoading && link.idRol >= profile?.data?.idRol) { */
                return (
                  <li key={link.title} className="flex w-full mt-1">
                    <Button
                      color=""

                      variant="light"
                      className="w-full h-10 p-0 "
                      isIconOnly={expanded ? false : true}
                    >
                      <Link
                        passHref
                        href={link.path}
                        className={`
                  flex items-center text-base w-full 
                  h-12 rounded-xl text-gray-500
                  hover:text-primaryxs
                  hover:bg-gray-100 ${`/${ruta[1]}${ruta[2] !== undefined ? `/${ruta[2]}` : ""
                            }` === link.path
                            ? "bg-gray-50 text-primary font-semibold"
                            : ""
                          }`}
                        onClick={() => {
                          setActive(false);
                          setExpanded(false);
                        }}
                      >
                        <div className="mx-3 ">{link.icon}</div>
                        <span
                        /*  className={` mr-6 ${!expanded ? "w-0 opacity-0" : ""}`} */
                        >
                          {link.title}
                        </span>
                      </Link>
                    </Button>
                  </li>)
              }
              )}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
