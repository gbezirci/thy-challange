import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { router } from "./routes";

import "./main.css";

import { CustomizedTailwind } from "./theme";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
   <Provider store={store}>

    <PrimeReactProvider value={{ unstyled: true, pt: CustomizedTailwind }}>
      <RouterProvider router={router} />
    </PrimeReactProvider>
   </Provider>
  </>
);
