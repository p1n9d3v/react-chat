import Layout from "components/layout/Layout";
import PrivateProvider from "contexts/PrivateProvider";
import Chats from "pages/Chats";
import Home from "pages/Home";
import Login from "pages/Login";
import Users from "pages/Users";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <PrivateProvider>
                <Layout />
            </PrivateProvider>
        ),
        children: [
            {
                index: true,
                element: <Home />,
            },
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
