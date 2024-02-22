import React from "react";
import MainScreen from "./src/components/MainScreen/MainScreen";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

const App = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
};

export default App;
