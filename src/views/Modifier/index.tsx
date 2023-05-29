import React, { useCallback, useEffect, useState } from "react";
import { ModifierProps } from "./Modifier.types";
import { useNavigate, useParams } from "react-router-dom";
import { JokeForm, Header } from "../../components";
import { useLocalStorage, useRequest } from "../../hooks";
import styles from "./Modifier.module.scss";
import { JokeProps } from "../../hooks/useRequest/useRequest.types";

const Modifier: React.FC<ModifierProps> = () => {
    const { getJokeRequest } = useRequest();
    const { id } = useParams();
    const [joke, setJoke] = useState<JokeProps | null>(null);
    const { validSession } = useLocalStorage();
    const sessionIsValid = validSession();
    const navigation = useNavigate();

    useEffect(() => {
        !sessionIsValid && navigation("/login");
    }, [navigation, sessionIsValid]);

    const getJoke = useCallback(() => {
        id &&
            getJokeRequest({ id: Number(id) }).then(
                (data) => !Array.isArray(data) && setJoke(data)
            );
    }, [getJokeRequest, id]);

    useEffect(() => {
        getJoke();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Header goBack />
            <div className={styles.Modifier_wrapper}>
                <div className={styles.form_wrapper}>
                    <JokeForm
                        update={Boolean(id)}
                        id={joke?.id ?? 0}
                        author={joke?.Author}
                        score={joke?.Views}
                        title={joke?.Title}
                        body={joke?.Body}
                    />
                </div>
            </div>
        </>
    );
};

export default Modifier;
