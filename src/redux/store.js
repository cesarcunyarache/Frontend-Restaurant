import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/userApi";
import { reservasApi } from "./services/reservaApi";
import { colaboradorApi } from "./services/colaboradorApi";
import { usuariosApi } from "@/redux/services/usuariosApi";
import { meseroApi } from "@/redux/services/meseroApi";
import { clienteApi } from "@/redux/services/clienteApi";
import { productoApi } from "@/redux/services/productoApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import loadReducer from "./features/loadSlice";


import { reservaApi } from "./services/reservaApi";
import { categoriaApi } from "./services/categoriaApi";

const store = configureStore({
  reducer: {
    loadReducer,
    [userApi.reducerPath]: userApi.reducer,
    [reservasApi.reducerPath]: reservasApi.reducer,
    [colaboradorApi.reducerPath]: colaboradorApi.reducer,
    [usuariosApi.reducerPath]: usuariosApi.reducer,
    [meseroApi.reducerPath]: meseroApi.reducer,
    [clienteApi.reducerPath]: clienteApi.reducer,
    [productoApi.reducerPath]: productoApi.reducer,
    [categoriaApi.reducerPath]: categoriaApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      [userApi.middleware],
      [reservasApi.middleware],
      [colaboradorApi.middleware],
      [usuariosApi.middleware],
      [meseroApi.middleware],
      [clienteApi.middleware],
      [productoApi.middleware],
      [categoriaApi.middleware],
    ),
});

setupListeners(store.dispatch);

const RootState = store.getState();
const AppDispatch = store.dispatch;

export { store, RootState, AppDispatch };
