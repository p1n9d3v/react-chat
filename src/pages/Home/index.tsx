import PhoneIcon from "components/icons/PhoneIcon";
import IconButton from "components/ui/IconButton";
import styles from "./index.module.css";

function Home() {
    return (
        <div className={styles.Home}>
            <IconButton icon={<PhoneIcon />} text="Audio" />
        </div>
    );
}

export default Home;
