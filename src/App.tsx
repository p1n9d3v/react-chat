import Layout from "components/layout/Layout";
import { useUser } from "contexts/UserContext";
import Chats from "pages/Chats";
import Home from "pages/Home";
import Login from "pages/Login";
import Users from "pages/Users";
import { PropsWithChildren, useLayoutEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const PrivateApp = ({ children }: PropsWithChildren) => {
    const { login } = useUser();
    useLayoutEffect(() => {
        if (!login) document.location.href = "/login";
    }, [login]);
    return <>{children} </>;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <PrivateApp>
                <Layout />
            </PrivateApp>
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
