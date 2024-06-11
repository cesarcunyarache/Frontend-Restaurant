import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { userApi } from "./services/userApi";
import { reservasApi } from "./services/reservaApi";
import { colaboradorApi } from "./services/colaboradorApi";
import { usuariosApi } from "@/redux/services/usuariosApi";
import { meseroApi } from "@/redux/services/meseroApi";
import { clienteApi } from "@/redux/services/clienteApi";
import { productoApi } from "@/redux/services/productoApi";
import { ventaApi } from "@/redux/services/ventaApi";
import { categoriaApi } from "./services/categoriaApi";

import salesReducer from '@/redux/features/salesSlice'

import thunk from "redux-thunk";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";


const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistConfig = {
  key: "sales",
  version: 1,
  storage,
  whitelist: ["salesState"],
  serialize: (data) => JSON.stringify(data),
  deserialize: (data) => JSON.parse(data),
};

const rootReducer = combineReducers({
  salesState: salesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [reservasApi.reducerPath]: reservasApi.reducer,
    [colaboradorApi.reducerPath]: colaboradorApi.reducer,
    [usuariosApi.reducerPath]: usuariosApi.reducer,
    [meseroApi.reducerPath]: meseroApi.reducer,
    [clienteApi.reducerPath]: clienteApi.reducer,
    [productoApi.reducerPath]: productoApi.reducer,
    [categoriaApi.reducerPath]: categoriaApi.reducer,
    [ventaApi.reducerPath]: ventaApi.reducer,

    sales: persistedReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
      {
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }
    ).concat(
      [userApi.middleware],
      [reservasApi.middleware],
      [colaboradorApi.middleware],
      [usuariosApi.middleware],
      [meseroApi.middleware],
      [clienteApi.middleware],
      [productoApi.middleware],
      [categoriaApi.middleware],
      [ventaApi.middleware],
      [thunk]
    ),
});

setupListeners(store.dispatch);

const RootState = store.getState();
const AppDispatch = store.dispatch;

export { store, RootState, AppDispatch };
