import { createBrowserRouter } from "react-router-dom";
import { Home, Modifier, Login } from "../views";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "joke/:id?",
        element: <Modifier />,
    },
]);

export { router };
