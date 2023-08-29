import { createBrowserRouter } from "react-router-dom";

import { PATH_ROOT } from "../constants/path";
import IssuePage from "../pages/IssuePage";

const router = createBrowserRouter([
  {
    path: PATH_ROOT,
    element: <IssuePage />,
  },
]);

export default router;
