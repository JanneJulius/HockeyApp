import store from "./src/store";
import { Provider } from "react-redux";
//import { StyleSheet, View, Text } from "react-native";
import React, { useState, useEffect } from "react";

import Main from "./src/components/Main";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
