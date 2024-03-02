import ChatIcon from "components/icons/ChatIcon";
import HomeIcon from "components/icons/HomeIcon";
import UserIcon from "components/icons/UserIcon";
import { useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import cn from "classnames";

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const [active, setActive] = useState(location.pathname);

    useLayoutEffect(() => {
        setActive(location.pathname);
    }, [location.pathname]);

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    return (
        <ul className={styles.Sidebar}>
            <li
                onClick={() => handleNavigate("/users")}
                className={cn(styles.Sidebar_navItem, {
                    [styles.Sidebar_navItem___active]: active === "/users",
                })}
            >
                <UserIcon />
            </li>
            <li
                onClick={() => handleNavigate("/chats")}
                className={cn(styles.Sidebar_navItem, {
                    [styles.Sidebar_navItem___active]: active === "/chats",
                })}
            >
                <ChatIcon />
            </li>
        </ul>
    );
}

export default Sidebar;
