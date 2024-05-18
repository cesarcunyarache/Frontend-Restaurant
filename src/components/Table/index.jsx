"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Spinner,
  Avatar
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import /* users */ "./data";
import { capitalize } from "./utils";
import { useState, useMemo, useCallback } from "react";
import Link from "@/components/Link";
import Select from "@/components/Form/Select";
import { useRouter } from "next/navigation";
import Edit from "@/components/Icon/Edit";
import Qr from "@/components/Icon/Qr";
import Input from "../Form/Input";


/* const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Nombres", uid: "nombres", sortable: true },
  { name: "Apellidos", uid: "apellidos", sortable: true },
  { name: "Telefono", uid: "telefono", sortable: true },
  { name: "Fecha de Nacimiento", uid: "fechaNacimiento" },
  { name: "EMAIL", uid: "email" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "Acciones", uid: "acciones" },
]; */

const statusOptions = [
  { name: "Cancelada", uid: "0" },
  { name: "Pendiente", uid: "1" },
  { name: "Asistió", uid: "2" },
  { name: "No presentado", uid: "3" },
  { name: "Completada", uid: "4" },
];

const statusOptionsProducto = [
  { name: "Inhabilidado", uid: "0" },
  { name: "Habilitado", uid: "1" },
];

const statusColorMap = {
  0: { estado: "danger", text: "Cancelada" },
  1: { estado: "warning", text: "Pendiente" },
  2: { estado: "primary", text: "Asistió" },
  3: { estado: "default", text: "No presentado" },
  4: { estado: "success", text: "Completada" },
};

const statusColorMapProducto = {
  0: { estado: "danger", text: "Inhabilidado" },
  1: { estado: "success", text: "Habilitado" },
};

/* const inicialVisibleColumns = ["id","nombres", "apellidos", "telefono", "fechaNacimiento", "acciones"];
 */
export default function Index({
  inicialVisibleColumns = [],
  columns = [],
  isLoading,
  data = [],
  btn = "",
  btnLink = "",
  status = false,
  isActiveBtn = false,
  isSearch = true,
  statusFilterDrown = false,
  statusMeseros = false,
  buttonTable = null,
}) {
  const router = useRouter();
  const users = !isLoading ? data : [];

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(inicialVisibleColumns)
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "id",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns?.filter((column) =>
      Array.from(visibleColumns)?.includes(column?.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers?.filter(
        (user) => {
          return columns?.some((column) => {
            if (column?.search) {
              const value = user[column?.uid]?.toString()?.toLowerCase();
              return value?.includes(filterValue?.toLowerCase());
            }
            return false;
          });
        }
        /*  user.nombres.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.apellidos.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.telefono.toLowerCase().includes(filterValue) */
      );
    }

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter)?.length !== statusOptions?.length
    ) {
      filteredUsers = filteredUsers?.filter((user) =>
        Array.from(statusFilter)?.includes(user.estado)
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{
              radius: "sm",
              isBordered: true,
              className: "mr-2 animate-pulse",
            }}
            description={user?.numeroDoc}
            name={user?.nombres}
          >
            {user?.numeroDoc}
          </User>
        );

      case "infoClient":
        return (
          <User
            avatarProps={{
              radius: "full",
              isBordered: true,
              className: "mr-2 animate-pulse",
            }}
            description={user?.numeroDoc}
            name={user?.nombres}
          >
            {user?.numeroDoc}
          </User>
        );

      case "infoMesero":
        return (
          <User
            avatarProps={{
              radius: "sm",
              isBordered: true,
              className: "mr-2",
              src: user?.imagen,
              name: user?.nombres,
            }}
            description={user?.numeroDoc}
            name={user?.nombres}
          >
            {user?.numeroDoc}
          </User>
        );

      case "imagen":
        return (
          <Avatar isBordered radius="full" src={user.imagen} name={user.categoria} />
        );

      case "infoProducto":
        return (
          <User
            avatarProps={{
              radius: "sm",
              isBordered: true,
              className: "mr-2",
              src: user?.imagen,
              name: user?.nombre,
            }}
            description={"S/" + user?.precio}
            name={user?.nombre}
          >
            {"S/"}
            {user?.precio}
          </User>
        );

      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "estadoReserva":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.estado].estado}
            size="sm"
            variant="flat"
          >
            {statusColorMap[user.estado].text}
          </Chip>
        );

      case "estado":
        return (
          <Chip
            className="capitalize"
            color={statusColorMapProducto[user.estado].estado}
            size="sm"
            variant="flat"
          >
            {statusColorMapProducto[user.estado].text}
          </Chip>
        );


      case "estadoMesero":
        return (
          <Chip
            className="capitalize"
            color={statusColorMapProducto[user.estado].estado}
            size="sm"
            variant="flat"
          >
            {statusColorMapProducto[user.estado].text}
          </Chip>
        );

      case "accionReserva":
        return (
          <div className="relative flex justify-start items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    router.push(`/admin/reservas/${user?.idReserva}/`);
                  }}
                >
                  Ver Detalle
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      case "accionCliente":
        return (
          <div className="relative flex justify-start items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    router.push(`/admin/clientes/${user?.idCliente}/editar`);
                  }}
                >
                  Editar
                </DropdownItem>
                {/* 
                {user?.idUsuario === null ? (
                  <DropdownItem
                    onClick={() => {
                      router.push(`/admin/usuarios/registro/${user?.idEmpleado}`);
                    }}
                  >
                    Crear Usuario
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    onClick={() => {
                      router.push(`/admin/usuarios/${user?.idUsuario}/editar`);
                    }}
                  >
                    Editar Usuario
                  </DropdownItem>
                )} */}

                <DropdownItem
                  onClick={() => {
                    router.push(`/admin/meseros/registro/${user?.idEmpleado}`);
                  }}
                >
                  Crear Venta
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );

      case "accion":
        return (
          <div className="relative flex justify-start items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    router.push(`/admin/empleados/${user?.idEmpleado}/editar`);
                  }}
                >
                  Editar
                </DropdownItem>

                {user?.idUsuario === null ? (
                  <DropdownItem
                    onClick={() => {
                      router.push(`/admin/usuarios/registro/${user?.idEmpleado}`);
                    }}
                  >
                    Crear Usuario
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    onClick={() => {
                      router.push(`/admin/usuarios/${user?.idUsuario}/editar`);
                    }}
                  >
                    Editar Usuario
                  </DropdownItem>
                )}

                <DropdownItem
                  onClick={() => {
                    router.push(`/admin/meseros/registro/${user?.idEmpleado}`);
                  }}
                >
                  Crear o Editar Mesero
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      case "acciones":
        return (
          <div className="relative py-2 flex justify-start items-center gap-2">
            <Button
              color="default"
              variant="bordered"
              size="sm"
              className="gap-0 border-hidden text-primary font-bold hover:underline"
              startContent={<Edit />}
              onClick={() => {
                router.push(`/admin/usuarios/${user?.idUsuario}/editar`);
              }}
            >
              Editar
            </Button>
          </div>
        );

      case "accionEditarCategoria":
        return (
          <div className="relative py-2 flex justify-start items-center gap-2">
            <Button
              color="default"
              variant="bordered"
              size="sm"
              className="gap-0 border-hidden text-primary font-bold hover:underline"
              startContent={<Edit />}
              onClick={() => {
                router.push(`/admin/categorias/${user?.idCategoria}/editar`);
              }}
            >
              Editar
            </Button>
          </div>
        );
      case "accionMesero":
        return (
          <div className="relative py-2 flex justify-start items-center gap-2">
            <Button
              color="default"
              variant="bordered"
              size="sm"
              className="gap-0 border-hidden font-bold hover:underline"
              startContent={<Edit />}
              onClick={() => {
                router.push(`/admin/meseros/${user?.idEmpleado}/editar`);
              }}
            >
              Editar
            </Button>
          </div>
        );

      case "accionProducto":
        return (
          <div className="relative py-2 flex justify-start items-center gap-2">
            <Button
              color="default"
              variant="bordered"
              size="sm"
              className="gap-0 border-hidden font-bold hover:underline"
              startContent={<Edit />}
              onClick={() => {
                router.push(`/admin/productos/${user?.idProducto}/editar`);
              }}
            >
              Editar
            </Button>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e) => {
    if (e.target.value !== "") {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    }
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div
          className={`flex gap-3 items-end ${isSearch ? "justify-between" : "justify-between"
            }`}
        >
          {isSearch && (
            <Input
              isClearable
              className="w-80 sm:max-w-[44%]"
              placeholder="Buscar..."
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          )}
          {!isSearch && (
            <div className="flex justify-center items-center">
              <h1 className="text-2xl font-bold text-center mb-2">Reservas</h1>
            </div>
          )}
          <div className="flex gap-3">
            {status && (
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                  >
                    Estado
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                >
                  {statusOptions.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}

            {statusFilterDrown && (
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                  >
                    Estado
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                >
                  {statusOptionsProducto.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}

            {statusMeseros && (
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                  >
                    Estado
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                >
                  {statusOptionsProducto.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                  className="capitalize"
                >
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            {buttonTable != null && (
              buttonTable
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} registros
          </span>
          <label className="flex w-42 items-center gap-2 text-default-400 text-small">
            <span>Filas por página:</span>
            <Select
              label=""
              placeholder="5"
              defaultSelectedKeys={["5"]}
              className="w-20"
              data={[
                { key: "5", value: "5" },
                { key: "10", value: "10" },
                { key: "15", value: "15" },
              ]}
              onChange={onRowsPerPageChange}
            ></Select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-end items-center ">
        {/* <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span> */}
        <Pagination
          isCompact
          showControls
          showShadow
          classNames={{
            cursor: "bg-primary text-background",
          }}
          color="default"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2 ml-24">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={!isLoading && bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[400px]",
      }}
      /*  selectedKeys={selectedKeys} */
      /*  selectionMode="multiple" */
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      /* onSelectionChange={setSelectedKeys} */

      onSortChange={setSortDescriptor}
      loadingContent={<Spinner />}
      /* loadingState={loadingState} */
      isLoading={isLoading}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={
          isLoading ? <Spinner color="default" /> : "No hay registros"
        }
        items={sortedItems}
      >
        {(item) => (
          <TableRow
            key={
              /* item.idReserva ? item?.idReserva : item?.idCliente || item?.idProducto ? item?.idCliente : item?.idEmpleado */
              item.idEmpleado ?? item.idCliente ?? item.idCategoria
            }
          >
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
