"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Tabs from "./Tabs";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { useGetVerifyQuery } from "../../redux/services/userApi";
import DropdownRend from "./Dropdown";
import { useGetLogoutQuery, usePostLogoutMutation, useGetProfileQuery } from '../../redux/services/userApi'

export default function NavBar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { data, isLoading, isError, error } = useGetVerifyQuery();

  const { data: profile, isLoading: isLoadingProfile } = useGetProfileQuery();



  const [postLogout] = usePostLogoutMutation()
  /* if (!isLoading) console.log(data); */

  const handeLogout = async () => {
    const response = await postLogout();
    console.log(response);
    window.location.href = "/"
  }


  const menuItems = [
    "Inicio",
    "Sobre nosotros",
    "Experiencias",
    "Acerca de"
  ];
  return (
    <Navbar
      className="border-b-1"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden flex-grow-0" justify="start">
        <NavbarMenuToggle
          className="justify-center"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">Bravazo</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#Inicio">
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem isActive className="border-b-2 border-blue-">
          <Link color="foreground" href="#Sobre-nosotros">
            Sobre nosotros
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#Experiencias">
            Experiencias
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#Acerca-de">
            Acerca de
          </Link>
        </NavbarItem>
        {/* <NavbarItem>
          <Link color="foreground" href="#">
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page"
          className="" background>
            Acerca de
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Nosotros
          </Link>
        </NavbarItem> */}
        {/*    <Tabs></Tabs> */}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform p-1"
              color="default"
              name="Jason Hughes"
              size="sm"
              src="user.svg"
            />
          </DropdownTrigger>

          {!isLoading && data?.status === "ok" ? (
            <DropdownMenu
              aria-label="Profile"
              variant="flat"

              onAction={(key) => router.push(key)}
            >
              <DropdownItem key="/datos-personales" className="h-14 gap-2">
                <p className="font-semibold">Sesion iniciada como</p>
                <p className="font-semibold">{profile?.data?.correo}</p>
              </DropdownItem>
              <DropdownItem key="/datos-personales">Mis datos</DropdownItem>
              <DropdownItem key="/reservar">Reservar</DropdownItem>
              <DropdownItem key="analytics">Puntos</DropdownItem>
              <DropdownItem key="configurations">Configuracion</DropdownItem>
              <DropdownItem key="system">Contactanos</DropdownItem>
              <DropdownItem key="help_and_feedback"> Ayuda y comentarios</DropdownItem>
              <DropdownItem key="#" textValue="Logout" onClick={handeLogout} color="danger">Log Out</DropdownItem>
            </DropdownMenu>
          ) : (
            <DropdownMenu
              aria-label="Profile Auth"
              variant="flat"
              onAction={(key) => router.push(key)}
            >
              <DropdownItem key="/login">Iniciar Sesión</DropdownItem>
              <DropdownItem key="/registro">Regístrate</DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
