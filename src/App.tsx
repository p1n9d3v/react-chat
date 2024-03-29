import Layout from "components/layout/Layout";
import Chats from "pages/Chats";
import Login from "pages/Login";
import Users from "pages/Users";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "users",
                element: <Users />,
            },
            {
                path: "chats",
                element: <Chats />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
