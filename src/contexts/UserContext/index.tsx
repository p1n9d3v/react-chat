import { fireAuth } from "apis";
import { UserInfo } from "firebase/auth";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useLayoutEffect } from "react";

interface Login {
    login: boolean;
    currentUser: UserInfo | null;
}

const initialState: Login = {
    login: false,
    currentUser: null,
};

const UserContext = createContext(initialState);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
    const [userState, setUserState] = useState<Login>(initialState);

    useLayoutEffect(() => {
        fireAuth.observeAuthState((user: UserInfo | null) => {
            setUserState({
                login: !!user,
                currentUser: !!user
                    ? ({
                          displayName: user.displayName,
                          email: user.email,
                          photoURL: user.photoURL,
                          uid: user.uid,
                      } as UserInfo)
                    : null,
            });
            if (window.location.pathname !== "/login" && !user) {
                window.location.href = "/login";
            }
        });
    }, []);

    return (
        <UserContext.Provider value={userState}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const { currentUser, login } = useContext(UserContext);
    return {
        currentUser,
        login,
        isMe: (uid: string) => currentUser!.uid === uid,
    };
};
