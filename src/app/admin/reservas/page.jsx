"use client";

import { useState } from "react";
import { useGetReservasQuery } from "@/redux/services/reservaApi";
import Breadcrumbs from "@/components/Breadcrumbs";
import React from "react";
import Table from "@/components/Table";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button as Botton,
  useDisclosure,
} from "@nextui-org/react";



export default function page() {
  const { data, isLoading, isError, error } = useGetReservasQuery();

  console.log(data);
  const users = !isLoading ? data.data : [];

  const inicialVisibleColumns = [
    "idReserva",
    "infoClient",
    "fecha",
    "hora",
    "estadoReserva",
    "accionReserva",
  ];

  const columns = [
    { name: "ID", uid: "idReserva", sortable: true },
    { name: "Información Personal", uid: "infoClient" },
    { name: "Fecha", uid: "fecha", sortable: true, search: true },
    { name: "Hora", uid: "hora", sortable: true, search: true },
    { name: "Estado", uid: "estadoReserva", sortable: true },
    { name: "Nombres", uid: "nombres", sortable: true, search: true },
    {
      name: "Número de documento",
      uid: "numeroDoc",
      sortable: true,
      search: true,
    },
    { name: "Accion", uid: "accionReserva" },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const [isModal, setIsModal] = useState(false);

  const handleOpen = (backdrop) => {
    onOpen();
  };

  return (
    <div className="p-4">
      <Breadcrumbs
        data={[
          {
            value: "Reservas",
            href: "/admin/reservas",
          },
          {
            value: "Lista",
            href: "/admin/reservas/",
          },
        ]}
        title={"Reservas"}
      />
      <div className="w-full h-full border rounded-lg mt-4 bg-white p-4">
        <Table
          inicialVisibleColumns={inicialVisibleColumns}
          columns={columns}
          isLoading={isLoading}
          data={users}
          isActiveBtn={true}
          btn="Escanear Qr"
          btnLink="reservas/escanear"
/*           status={true}  */
        />
      </div>

      <Modal
        backdrop={backdrop}
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        scrollBehavior="inside"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center">
                <h1 className="font-bold">Resumen</h1>
              </ModalHeader>
              <ModalBody className="m-2 ">
                <form onSubmit={onSubmitModal}>
                  <div ref={pdfRef}>
                    <ResumeReserva payload={qr} />
                  </div>
                </form>
              </ModalBody>

              <ModalFooter>
                <div className="flex flex-row justify-end gap-2">
                  <Botton color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Botton>
                  <Botton
                    onClick={onSubmitModal}
                    type="submit"
                    /* isLoading={isLoadingOTP || isLoadingCreate} */
                    className="bg-neutral-900 text-white hover:bg-neutral-700"
                  >
                    {/* {!isLoadingOTP && !isLoadingCreate && "Verficar"} */}
                    Confirmar Reserva
                  </Botton>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
