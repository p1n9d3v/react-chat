import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import styles from "./index.module.css";

function Layout() {
    return (
        <div className={styles.Layout}>
            <Header />
            <div className={styles.Layout_body}>
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
