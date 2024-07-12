"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import Select from "@/components/Form/Select";
import Breadcrumbs from "@/components/Breadcrumbs";
import AutocompleteProductos from "@/components/Autocomplete/AutoCompleteProductos"
import AutocompleteCategorias from "@/components/Autocomplete/AutoCompleteCategorias"
import {
  Popover, PopoverTrigger, PopoverContent, User, Avatar, CardHeader, Card, Spinner, Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure
} from "@nextui-org/react";
import { toast } from "sonner";
import Ellipsis from "@/components/Icon/Ellipsis";
import { PlusIcon } from "@/components/Icon/PlusIcon";


import { addSale } from "@/redux/features/salesSlice";
import { usePostClientByNumeroDocMutation, usePostCreatePatchParamsMutation } from '@/redux/services/clienteApi'
import { useGetProductosQuery } from '@/redux/services/productoApi'
import { useGetCategoriasQuery } from '@/redux/services/categoriaApi';
import {
  usePostCreateMutation,
  usePutUpdateMutation,
} from "@/redux/services/colaboradorApi";

import { usePostCreateVentaMutation } from '@/redux/services/ventaApi'


import { validateDocument, capitalizeWords } from '@/utils/validation/tipoDocumento';
import { DeleteIcon } from "@/components/Icon/DeleteIcon";
import { SearchIcon } from "@/components/Table/SearchIcon";
import SaveIcon from "@/components/Icon/SaveIcon";

import { v4 as uuidv4 } from 'uuid';
import Users from "@/components/Icon/Users";

export default function Page({
  data = {},
  isUpdate = false,
  param = "",
  isEditProfile = false,
}) {
  const {
    idTipoDoc,
    /* numeroDoc, */
    nombres,
    apellidos,
    telefono,
    fechaNacimiento,
    genero,
    direccion,
  } = data?.data ?? {
    idTipoDoc: "",

    nombres: "",
    apellidos: "",
    telefono: "",
    fechaNacimiento: "",
    genero: "",
    direccion: "",
  };

  const router = useRouter();

  const { data: categorias, isLoadingCategorias } = useGetCategoriasQuery();
  const { data: productos, isLoading, isError, error } = useGetProductosQuery();

  const [postCreate, { isLoading: isLoadingCreate }] = usePostCreateMutation();
  const [putUpdate, { isLoading: isLoadingUpdate }] = usePutUpdateMutation();
  const [postClienteByNumeroDoc, { isLoading: isLoadingCliente }] = usePostClientByNumeroDocMutation();
  const [postCreateCliente, { isLoading: isLoadingCreateCliente }] = usePostCreatePatchParamsMutation()
  const [postCreataVenta, { isLoading: isLoadingCreateVenta }] = usePostCreateVentaMutation()


  const [lastClickedButton, setLastClickedButton] = useState("");
  const [isCliente, setIsCliente] = useState(false);
  const [numeroDoc, setNumeroDoc] = useState("");
  const [cliente, setCliente] = useState({})
  const [idCategoria, setIdCategoria] = useState("");
  const [selectProducto, setSelectProducto] = useState({});
  const [listProductFilter, setListProductFilter] = useState([])
  const [listProducts, setListProducts] = useState([])
  const [cantidad, setCantidad] = useState(1)
  const [showDialog, setShowDialog] = useState(false)
  const [question, setQuestion] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (idCategoria !== "") {
      setListProductFilter(productos?.data.filter((value) => value.idCategoria == idCategoria));

    } else {
      setListProductFilter(productos?.data);
    }

  }, [idCategoria])


  useEffect(() => {
    const handleBeforeUnload = (event) => {
      setShowDialog(true)
      event.preventDefault();
    };

    const handleUnload = (event) => {
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  if (showDialog) {
    /* window.confirm('Desear navegar o cambiar de pantalla') */
    setShowDialog(false)
  }


  const sales = useSelector((state) => state?.sales?.salesState?.value);


  const dispatch = useDispatch();


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const saveStore = () => {
    dispatch(
      addSale({ uid: 'c48bf08f-83cc-4ff5-b25e-a3bab52cea5a', cliente, listProducts })
    );
  }

  const onSubmit = handleSubmit(async (data) => {
    try {

      if (listProducts.length === 0) {
        toast.info("Agregue al menos un producto")
        return
      }

      if (!isCliente) {
        if (!question) {
          onOpen();
          setQuestion(true)
          return
        }
      }
      const total = calcularTotal();

      const response = await postCreataVenta({ idCliente: cliente.idCliente === undefined ? null : cliente.idCliente, detalleVenta: listProducts, total, igv: total * 0.18 });
      console.log({ idCliente: cliente.idCliente === undefined ? null : cliente.idCliente, detalleVenta: listProducts, total, igv: total * 0.18 })
      if (response?.error) toast.error(response?.error?.data?.message);
      if (response?.data) {
        toast.success(response?.data?.message);
        if (lastClickedButton === "crear") {
          router.push("/admin/ventas");
        } else if (lastClickedButton === "crearOtro") {
          setListProducts([])
          setIsCliente(false)
          setCliente({})
          setSelectProducto({})
          reset();
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      console.log({ ...data, id: param });
      const response = await putUpdate({ ...data, id: param });
      if (response.error) {
        console.log(response.error);
        toast.error(response?.error?.data?.message);
      }
      if (response.data) {
        if (!isEditProfile) {
          router.push("/admin/empleados");
        }
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  });

  const searchClientNumeroDoc = async (numeroDoc) => {
    try {

      if (watch('idTipoDoc') && watch('idTipo') === '') {
        toast.info("Seleccione el tipo de Documento")
        return;
      }

      const response = await postClienteByNumeroDoc({ numeroDoc, idTipoDoc: watch('idTipoDoc') });
      if (response?.data) setCliente(response?.data?.data);
      console.log(response)

      if (response.error) {
        console.log(response.error);
        toast.error(response?.error?.data?.message);
        setCliente({})
      }
      if (!isLoadingCliente) {
        if (response?.data?.data?.isNew == undefined) {
          console.log(cliente)

          setIsCliente(true)


        } else {
          setIsCliente(false)

        }
      }

    } catch (error) {
      console.log(error)
    }
  }

  const createClienteParams = async () => {
    try {

      console.log(cliente)
      if (isCliente) return;

      const response = await postCreateCliente(cliente);
      if (response.error) {
        console.log(response.error);
        toast.error(response?.error?.data?.message);
      }

      if (!isLoadingCreateCliente) {

        if (response?.data) {
          setCliente({ ...cliente, 'idCliente': response?.data.data?.idCliente })
          setIsCliente(true);
          console.log(cliente)
        }
      }


    } catch (error) {
      console.log(error)
    }
  }


  const addOrUpdateProduct = (product) => {
    setListProducts((prevList) => {
      const productIndex = prevList.findIndex(item => item.idProducto === product.idProducto);

      if (productIndex !== -1) {
        const updatedList = [...prevList];
        const existingProduct = updatedList[productIndex];
        const newQuantity = parseInt(existingProduct.cantidad) + parseInt(cantidad);
        updatedList[productIndex] = {
          ...existingProduct,
          cantidad: newQuantity,
          subTotal: newQuantity * parseFloat(existingProduct.precio)
        };
        return updatedList;
      } else {
        return [...prevList, { ...product, cantidad, subTotal: cantidad * product.precio }];
      }
    });
  };

  const removeProduct = (idProducto) => {
    setListProducts((prevList) => prevList.filter(product => product.idProducto !== idProducto));
  };

  const calcularTotal = () => {
    return listProducts.reduce((total, producto) => total + producto.subTotal, 0);
  }


  useEffect(() => {
    const handleLoad = () => {
      // Perform actions after the component has fully loaded

      console.log('Unload event')
    };
    window.addEventListener('load', handleLoad);
    return () => {
      window.removeEventListener('load', handleLoad);

    };
  }, []);


  return (
    <>
      <div className={`p-4 ${isEditProfile && "pt-0"}`}>
        {!isEditProfile && (
          <div className="flex w-full justify-between items-end">
            <Breadcrumbs
              data={
                isUpdate
                  ? [
                    {
                      value: "Ventas",
                      href: "/admin/ventas",
                    },
                    {
                      value: nombres,
                      href: `/admin/ventas/${param}/editar`,
                    },
                    {
                      value: "Edit",
                      href: `/admin/ventas/${param}/editar`,
                    },
                  ]
                  : [
                    {
                      value: "Ventas",
                      href: "/admin/ventas",
                    },
                    {
                      value: "Crear",
                      href: "/admin/ventas/registro",
                    },
                  ]
              }
              title={"Ventas"}
            />
           {/* <div className="flex  flex-col  ">
              <Button isIconOnly className="bg-zinc-50 border-2 text-black" onClick={saveStore}> <SaveIcon /></Button>
            </div>*/}
          </div>
        )}

        <form onSubmit={onSubmit} className="" noValidate>
          <div className="border rounded-lg bg-white  mt-5 max-w-4xl">
            <div className="border-b py-2 px-4 flex justify-between items-center ">
              <h2 className="text-sm   leading-7 text-neutral-600 font-semibold">
                Informacion del cliente
              </h2>

              {
                Object.keys(cliente).length !== 0 &&
                <Popover showArrow placement="bottom">
                  <PopoverTrigger>
                    <User
                      disabled={isLoadingCliente}
                      as="button"
                      className="transition-transform bg-transparent"
                      avatarProps={{
                        className: "bg-transparent",
                        icon: <Ellipsis />,
                        isFocusable: true

                      }}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="p-1">
                    <Card shadow="none" className="max-w-[360px]   border-none bg-transparent">
                      <CardHeader className="justify-between">
                        <div className="flex gap-3">
                          <Avatar isBordered radius="full" size="md" name={cliente?.nombres.toUpperCase()} />
                          <div className="flex flex-col items-start justify-center">
                            <h4 className="text-sm font-semibold leading-none text-default-600">{capitalizeWords(cliente?.nombres)}</h4>
                            <h5 className="text-xs tracking-tight text-default-500">{cliente?.numeroDoc}</h5>
                          </div>
                        </div>
                        <Button
                          className={!isCliente ? "ml-2" : "bg-transparent text-foreground border-default-200 ml-2"}
                          color="primary"
                          radius="full"
                          isLoading={isLoadingCreateCliente}
                          size="sm"
                          variant={!isCliente ? "solid" : "bordered"}
                          onPress={async () => {
                            await createClienteParams()
                          }}
                        >
                          {!isCliente ? "Resgistro" : "Cliente"}
                        </Button>
                      </CardHeader>

                    </Card>
                  </PopoverContent>
                </Popover>
              }
            </div>


            <div className="p-4 ">
              <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <Select
                    placeholder="Seleccione el tipo de documento"
                    label="Tipo de Documento"
                    data={[
                      { key: 1, value: "DNI" },
                      { key: 2, value: "Carnet de Extranjería" },
                      { key: 3, value: "Pasaporte" },
                      { key: 4, value: "RUC" },
                    ]}
                    name="idTipoDoc"
                    {...(idTipoDoc !== ""
                      ? { defaultSelectedKeys: [idTipoDoc.toString()] }
                      : {})}
                    register={register}
                    options={{
                      validate: (value) => {
                        if (value === "") {
                          return "Este campo es requerido";
                        }
                      },
                    }}
                    defaultSelectedKeys={"1"}
                    color={errors.idTipoDoc && "danger"}
                    isInvalid={errors.idTipoDoc ? true : false}
                    errorMessage={errors.idTipoDoc && errors.idTipoDoc.message}
                    isDisabled={isLoadingCreate}
                    onSelectionChange={() => {
                      console.log(watch("numeroDoc"));

                      /* setValue("numeroDoc", ""); */
                    }}
                    isRequired
                  />
                </div>
                <div className="sm:col-span-3">
                  <Input
                    label="Número de Documento"
                    placeholder=" "
                    name="numeroDoc"
                    defaultValue={numeroDoc}
                    /* isDisabled={watch("idTipoDoc") === undefined ? true : false} */
                    register={register}

                    onValueChange={(value) => {
                      setNumeroDoc(value);
                    }}
                    onKeyUp={async (e) => {

                      if (e.key === 'Enter') {
                        console.log(e)
                        setNumeroDoc(e.target.value)

                        await searchClientNumeroDoc(e.target.value)
                      }
                    }}

                    maxLength={validateDocument[watch("idTipoDoc")]?.length}
                    options={{
                      required: {
                        value: true,
                        message: "Este campo es requerido",
                      },
                      pattern: {
                        value: validateDocument[watch("idTipoDoc")]?.pattern,
                        message: validateDocument[watch("idTipoDoc")]?.message,
                      },
                      maxLength: {
                        value: validateDocument[watch("idTipoDoc")]?.length,
                        message:
                          validateDocument[watch("idTipoDoc")]?.lengthMessage,
                      },
                      minLength: {
                        value: validateDocument[watch("idTipoDoc")]?.minLength,
                        message:
                          validateDocument[watch("idTipoDoc")]?.lengthMessage,
                      },
                    }}
                    color={errors.numeroDoc && "danger"}
                    isInvalid={errors.numeroDoc ? true : false}
                    errorMessage={errors.numeroDoc && errors.numeroDoc.message}
                    isRequired
                    endContent={isLoadingCliente ? <Spinner color="primary" size="sm" /> : <span className="bg-transparent text-zinc-400 cursor-pointer" isIconOnly onClick={async () => {
                      await searchClientNumeroDoc(numeroDoc);

                    }}><SearchIcon /></span>}
                  />
                </div>
              </div>

            </div>
          </div>


          <div /* onSubmit={onSubmit} */ className="border rounded-lg bg-white  mt-5 max-w-4xl">
            <div className="border-b py-2 px-4 flex justify-between items-center">
              <h2 className="text-sm   leading-7 text-neutral-600 font-semibold">
                Detalle de la Venta
              </h2>
            </div>

            <div className="p-4 items-center">
              <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">

                <div className="sm:col-span-3">
                  <AutocompleteCategorias
                    label="Categoria"

                    placeholder="Seleccione la categoria"
                    data={isLoadingCategorias ? [] : categorias?.data}
                    name="IdCategoria"
                    /*  register={register} */
                    /*  defaultSelectedKey={idCategoria.toString()} */
                    onSelectionChange={(value) => {

                      setIdCategoria(value);
                      console.log(idCategoria);
                    }}

                  /*  options={{
                     validate: (value) => {
                       if (value === null) {
                         return "Este campo es requerido";
                       }
                     },
                   }} */
                  /*  color={IdCategoriaValue === null && "danger"}
                   isInvalid={IdCategoriaValue === null && true}
                   errorMessage={
                     IdCategoriaValue === null && "Este campo es requerido"
                   } */
                  /*   isRequired */
                  />
                </div>

                <div className="sm:col-span-3 ">
                  <AutocompleteProductos
                    label="Productos"

                    placeholder="Seleccione la productos"
                    /*        data={isLoading ? [] : listProductFilter}   */
                    data={idCategoria === "" || idCategoria === null ? productos?.data : listProductFilter}
                    name="IdProducto"

                    /*  register={register} */
                    /*  defaultSelectedKey={idCategoria.toString()} */
                    onSelectionChange={(value) => {
                      setSelectProducto(productos?.data.find(element => element.idProducto == value));
                    }}

                  /*  options={{
                     validate: (value) => {
                       if (value === null) {
                         return "Este campo es requerido";
                       }
                     },
                   }} */
                  /*  color={IdCategoriaValue === null && "danger"} */
                  /*  isInvalid={IdCategoriaValue === null && true}
                   errorMessage={
                     IdCategoriaValue === null && "Este campo es requerido"
                   } */
                  /* isRequired */
                  />

                </div>

              </div>

            </div>

            <div className="px-4  pb-4 items-center">
              <div className="grid grid-cols-2 gap-x-6 sm:grid-cols-6 ">


                <div className="sm:col-span-3 flex gap-2 ">
                  <Input
                    type="number"
                    label="Cantidad"
                    placeholder=" "
                    name="cantidad"
                    defaultValue={cantidad.toString()}
                    min="1"
                    value={cantidad}
                    onValueChange={setCantidad}
                    className="py-0"
                    /* isDisabled={watch("idTipoDoc") === undefined ? true : false} */
                    register={register}
                    /* maxLength={validateDocument[watch("idTipoDoc")]?.length} */

                    color={errors.cantidad && "danger"}
                    isInvalid={errors.cantidad ? true : false}
                    errorMessage={errors.cantidad && errors.cantidad.message}
                    isRequired

                    options={{
                      required: {
                        value: true,
                        message: "Este campo es requerido",
                      }
                    }}

                  />

                  <Button className="max-w-3 p-0 mt-6 " isIconOnly={true} onClick={() => {
                    if (selectProducto !== undefined && selectProducto !== '' && Object.keys(selectProducto).length !== 0) {
                      if (cantidad > 0) {
                        addOrUpdateProduct(selectProducto)
                      }
                    } else {
                      toast.info("Seleccione un producto")
                    }
                  }}><PlusIcon /></Button>
                </div>
              </div>
            </div>
          </div>

          <div /* onSubmit={onSubmit} */ className="border rounded-lg bg-white  mt-5 max-w-4xl">
            <div className="border-b py-2 px-4 flex justify-between items-center">
              <h2 className="text-sm   leading-7 text-neutral-600 font-semibold">
                Lista de Productos
              </h2>
            </div>

            <div className="p-4 items-center">

              <Table aria-label="Example static collection table" className="max-h-80" isHeaderSticky>
                <TableHeader>
                  <TableColumn>Producto</TableColumn>
                  <TableColumn>Cantidad</TableColumn>
                  <TableColumn>Subtotal</TableColumn>
                  <TableColumn>Acción</TableColumn>
                </TableHeader>
                <TableBody>
                  {

                    listProducts.map((producto, index) => {

                      return <TableRow key={index}>
                        <TableCell> <div className="flex gap-4 items-center p-1">
                          <Avatar
                            isBordered
                            name={""}
                            src={producto.imagen}
                            className="flex-shrink-0"
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <span className="text-small">{`${producto.nombre} `}</span>
                            <span className="text-tiny text-default-400">
                              {producto.precio}
                            </span>
                          </div>
                        </div></TableCell>
                        <TableCell>{producto.cantidad}</TableCell>
                        <TableCell>{producto.subTotal}</TableCell>
                        <TableCell><div className="relative flex items-center gap-2">


                          <Button isIconOnly={true} className="text-lg bg-transparent text-danger cursor-pointer active:opacity-50"
                            onClick={() => {
                              removeProduct(producto.idProducto);
                            }}>
                            <DeleteIcon />
                          </Button>

                        </div></TableCell>
                      </TableRow>
                    })

                  }

                </TableBody>
              </Table>
            </div>
          </div>

          <div className="col-span-full">
            <div className="sm:col-span-3 flex flex-column gap-2 ">
              {isUpdate ? (
                <Button
                  isLoading={isLoadingUpdate}
                  type="submit"
                  className="  my-4"
                >
                  Actualizar
                </Button>
              ) : (
                <>
                  <Button
                    isLoading={isLoadingCreateVenta && lastClickedButton === "crear"}
                    type="submit"
                    className="my-4"
                    onClick={() => setLastClickedButton("crear")}
                  >
                    Crear
                  </Button>

                  <Button
                    type="submit"
                    isLoading={
                      isLoadingCreateVenta && lastClickedButton === "crearOtro"
                    }
                    className="bg-zinc-50 border-2 text-black  my-4"
                    onClick={() => setLastClickedButton("crearOtro")}
                  >
                    Crear y Crear otro
                  </Button>

                  <Button
                    className="bg-zinc-50 border-2 text-black  my-4"
                    onClick={() => router.back()}
                  >
                    Cancelar
                  </Button>
                </>
              )}
            </div>
          </div>

        </form>

        <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                <ModalBody className="flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="size-20 text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>

                  <p className="font-semibold text-center">
                    ¿Desea proceder con el
                    registro del cliente?
                  </p>

                </ModalBody>
                <ModalFooter>
                  <Button className="bg-transparent text-red-500" color="danger" variant="light" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button color="primary" onPress={onClose} onClick={createClienteParams} isLoading={isLoadingCreateCliente}>
                    Aceptar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>



    </>
  );
}
