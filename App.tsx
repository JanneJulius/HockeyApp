import store from "./src/store";
import { Provider } from "react-redux";
import React from "react";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";

import Main from "./src/components/Main";

export default function App() {
  return (
    <Provider store={store}>
      <AutocompleteDropdownContextProvider>
        <Main />
      </AutocompleteDropdownContextProvider>
    </Provider>
  );
}
