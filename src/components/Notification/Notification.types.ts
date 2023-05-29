export interface NotificationProps {
    open: boolean
    msg: string;
    severity: "info" | "error" | "success" | "warning";
}
