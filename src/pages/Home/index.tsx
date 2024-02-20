import { fireAuth } from "apis";
import PhoneIcon from "components/icons/PhoneIcon";
import IconButton from "components/ui/IconButton";
import Loading from "components/ui/Loading";
import styles from "./index.module.css";

function Home() {
    return (
        <div className={styles.Home}>
            <IconButton icon={<PhoneIcon />} text="Audio" />
            <button onClick={() => fireAuth.logout()}>logout</button>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <Loading />
            </div>
        </div>
    );
}

export default Home;
