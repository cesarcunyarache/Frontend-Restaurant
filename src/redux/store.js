import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/userApi";
import { reservasApi } from "./services/reservaApi";
import { colaboradorApi } from "./services/colaborador";
import {usuariosApi} from '@/redux/services/usuariosApi'
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [reservasApi.reducerPath]: reservasApi.reducer,
    [colaboradorApi.reducerPath]: colaboradorApi.reducer,
    [usuariosApi.reducerPath]: usuariosApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      [userApi.middleware],
      [reservasApi.middleware],
      [colaboradorApi.middleware],
      [usuariosApi.middleware],
    ),
});

setupListeners(store.dispatch);

const RootState = store.getState();
const AppDispatch = store.dispatch;

export { store, RootState, AppDispatch };
