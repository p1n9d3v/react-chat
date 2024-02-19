import { useUser } from "contexts/UserContext";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

function PrivateProvider({ children }: PropsWithChildren) {
    const { login } = useUser();

    if (!login) return <Navigate to="/login" />;
    return <>{children}</>;
}

export default PrivateProvider;
