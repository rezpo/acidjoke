import React, {
    useState,
    useRef,
    FormEvent,
    ChangeEvent,
    useEffect,
    useCallback,
} from "react";
import { JokeFormProps } from "./JokeForm.types";
import { useRequest } from "../../hooks";
import { JokeProps } from "../../hooks/useRequest/useRequest.types";
import { NotificationProps } from "../Notification/Notification.types";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification";
import styles from "./JokeForm.module.scss";

const JokeForm: React.FC<JokeFormProps> = ({
    id,
    author,
    score,
    title,
    body,
    update = false,
}) => {
    const { updateJokeRequest, deleteJokeRequest, postJokeRequest } =
        useRequest();
    const formRef = useRef<HTMLFormElement>(null);
    const navigation = useNavigate();
    const [deleteJoke, setDeleteJoke] = useState<boolean>(false);
    const [authorValue, setAuthorValue] = useState<string>(author ?? "");
    const [titleValue, setTitleValue] = useState<string>(title ?? "");
    const [bodyValue, setBodyValue] = useState<string>(body ?? "");
    const [scoreValue, setScoreValue] = useState<number>(score ?? 0);
    const [updatedJoke, setUpdatedJoke] = useState<JokeProps | null>(null);
    const [createdJoke, setCreatedJoke] = useState<JokeProps | null>(null);
    const [openNotification, setOpenNotification] = useState<boolean>(false);
    const [notificationMsg, setNotificationMsg] = useState<string>("");
    const [notificationSeverity, setNotificationSeverity] =
        useState<NotificationProps["severity"]>("info");
    const notificationHandler = useCallback(
        () => setOpenNotification((prev) => !prev),
        []
    );

    useEffect(() => {
        if (updatedJoke) {
            setNotificationSeverity("success");
            setNotificationMsg(
                `Joke with ID ${updatedJoke.id} has been updated`
            );
            notificationHandler();
        }

        if (createdJoke) {
            setNotificationSeverity("success");
            setNotificationMsg(
                `A new joke with ID ${createdJoke.id} has been created`
            );
            notificationHandler();
        }
    }, [createdJoke, notificationHandler, updatedJoke]);

    const createJoke = useCallback(() => {
        postJokeRequest({
            Author: authorValue,
            Body: bodyValue,
            Title: titleValue,
            Views: scoreValue,
            CreatedAt: Date.now(),
        }).then((data) => setCreatedJoke(data));
    }, [authorValue, bodyValue, scoreValue, titleValue, postJokeRequest]);

    const deletJoke = useCallback(() => {
        id &&
            deleteJokeRequest(id).then((data) => {
                data && navigation(-1);
            });
    }, [deleteJokeRequest, navigation, id]);

    const updateJoke = useCallback(() => {
        updateJokeRequest({
            id: id ?? 0,
            Author: authorValue,
            Title: titleValue,
            Views: scoreValue,
            Body: bodyValue,
            CreatedAt: Date.now(),
        }).then((data) => setUpdatedJoke(data));
    }, [authorValue, bodyValue, id, scoreValue, titleValue, updateJokeRequest]);

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        update ? updateJoke() : createJoke();
    };

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case "title":
                setTitleValue(event.target.value);
                break;
            case "author":
                setAuthorValue(event.target.value);
                break;
            case "body":
                setBodyValue(event.target.value);
                break;
            case "score":
                setScoreValue(Number(event.target.value));
                break;
        }
    };

    return (
        <>
            <Notification
                msg={notificationMsg}
                open={openNotification}
                severity={notificationSeverity}
            />
            <form
                ref={formRef}
                className={styles.JokeForm_wrapper}
                onSubmit={submitHandler}
            >
                <div className={styles.JokeForm_input_wrapper}>
                    <label htmlFor="body">Joke</label>
                    <input
                        type="text"
                        name="body"
                        defaultValue={body}
                        onChange={changeHandler}
                    />
                </div>
                <div className={styles.JokeForm_input_wrapper}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={title}
                        onChange={changeHandler}
                    />
                </div>
                <div className={styles.JokeForm_input_wrapper}>
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        name="author"
                        defaultValue={author}
                        onChange={changeHandler}
                    />
                </div>
                <div className={styles.JokeForm_input_wrapper}>
                    <label htmlFor="score">Score</label>
                    <input
                        type="number"
                        name="score"
                        min={0}
                        max={100}
                        defaultValue={score}
                        onChange={changeHandler}
                    />
                </div>
                <div className={styles.buttons}>
                    <button type="submit" disabled={deleteJoke}>
                        OK
                    </button>
                    {update && deleteJoke ? (
                        <>
                            <div>
                                <strong>Are you sure?</strong>
                            </div>
                            <button
                                className={styles.delete}
                                onClick={deletJoke}
                            >
                                Yes
                            </button>
                            <button
                                className={styles.delete}
                                onClick={() => setDeleteJoke((prev) => !prev)}
                            >
                                No
                            </button>
                        </>
                    ) : (
                        <button
                            className={styles.delete}
                            onClick={() => setDeleteJoke((prev) => !prev)}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </>
    );
};

export default JokeForm;
