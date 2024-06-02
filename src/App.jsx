import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import { Suspense } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs  } from "@mui/x-date-pickers/AdapterDayjs";

const router = createBrowserRouter(routes);

function App() {
  return (
    <Suspense fallback={"Loading..."}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </Suspense>
  );
}

export default App;
