import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "../../hooks";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";

const Login: React.FC = () => {
    const token = uuidv4();
    const navigation = useNavigate();
    const { store } = useLocalStorage();

    const startSession = () => {
        store("user", {
            token,
            timeStamp: Date.now(),
        });

        navigation("/");
    };

    return (
        <div className={styles.wrapper}>
            <h1>Hey User, it's time to start session</h1>
            <button onClick={startSession}>Tell me a joke</button>
        </div>
    );
};

export default Login;
