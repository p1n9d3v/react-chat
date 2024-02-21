import { UserInfo } from "firebase/auth";
import cn from "classnames";
import styles from "./index.module.css";
import { fireAuth } from "apis";
import { cloneElement, useEffect, useRef, useState } from "react";

interface Props {
    user: UserInfo;
    target: any;
}
function UserProfilePopup({ user, target }: Props) {
    const targetRef = useRef<HTMLDivElement>(null);
    const ref = useRef<HTMLDivElement>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        document.addEventListener("click", clickOutside);

        return () => {
            document.removeEventListener("click", clickOutside);
        };
    }, []);

    function clickOutside(e: MouseEvent) {
        const userClickEl = e.target as HTMLElement;
        if (
            ref.current &&
            !ref.current.contains(userClickEl) &&
            !targetRef.current?.contains(userClickEl)
        ) {
            setIsPopupOpen(false);
        }
    }

    return (
        <>
            {cloneElement(target, {
                onClick: () => setIsPopupOpen(!isPopupOpen),
                ref: targetRef,
            })}
            <div
                ref={ref}
                className={cn(styles.UserProfilePopup, {
                    [styles.UserProfilePopup___open]: isPopupOpen,
                    [styles.UserProfilePopup___close]: !isPopupOpen,
                })}
                style={{
                    top: targetRef.current?.getBoundingClientRect().bottom
                        ? targetRef.current?.getBoundingClientRect().bottom + 10
                        : 0,
                }}
            >
                <ul>
                    <li>{user?.displayName}</li>
                    <li>{user?.email}</li>
                    <li>
                        <button
                            className={styles.UserProfilePopup_logout}
                            onClick={() => fireAuth.logout()}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default UserProfilePopup;
