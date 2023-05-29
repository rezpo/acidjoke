import React, { useEffect, useState } from "react";
import { NotificationProps } from "./Notification.types";
import { ReactComponent as CloseX } from "../../assets/icons/x.svg";
import styles from "./Notifications.module.scss";

const Notification: React.FC<NotificationProps> = ({ open, msg, severity }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [notificationSeverity, setNotificationSeverity] =
        useState<string>("");

    useEffect(() => {
        setIsOpen(open);
        switch (severity) {
            case "info":
                setNotificationSeverity(styles.info);
                break;
            case "error":
                setNotificationSeverity(styles.error);
                break;
            case "success":
                setNotificationSeverity(styles.success);
                break;
            case "warning":
                setNotificationSeverity(styles.warning);
                break;
            default:
                setNotificationSeverity(styles.info);
                break;
        }
    }, [severity, open]);

    return notificationSeverity ? (
        <div
            className={`${
                styles.Notification_wrapper
            } ${notificationSeverity} ${styles.close} ${isOpen && styles.open}`}
        >
            <span>{msg}</span>
            <div
                onClick={() => setIsOpen((prev) => !prev)}
                className={styles.close_button}
            >
                <CloseX />
            </div>
        </div>
    ) : (
        <></>
    );
};

export default Notification;
