import { RouterProvider } from "react-router-dom";

import Toast from "./components/common/Toast";
import { ToastProvider } from "./contexts/toastContext";
import router from "./routes/route";

function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
      <Toast />
    </ToastProvider>
  );
}

export default App;
