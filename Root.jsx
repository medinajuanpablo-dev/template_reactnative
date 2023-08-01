import React from "react";
import { NativeBaseProvider } from "native-base";
import { Provider as ReduxProvider } from "react-redux";
import { NavigationContainer as NavigationProvider } from "@react-navigation/native";

import App from "./src/App";
import { store } from "./src/store";

export default function Root() {
  return (
    <NativeBaseProvider>
      <NavigationProvider>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </NavigationProvider>
    </NativeBaseProvider>
  );
}
