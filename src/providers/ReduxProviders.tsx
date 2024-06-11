"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

interface Props {
  children: React.ReactNode;
}
export default function ReduxProviders({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}
