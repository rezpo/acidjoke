import React, {
    useEffect,
    useState,
    useRef,
    ChangeEvent,
    useCallback,
    FormEvent,
} from "react";
import { HomeProps } from "./Home.types";
import { JokeProps } from "../../hooks/useRequest/useRequest.types";
import { useLocalStorage, useRequest } from "../../hooks";
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg";
import { ReactComponent as Plus } from "../../assets/icons/plus-circle.svg";
import { Link } from "react-router-dom";
import { Jokes, Header } from "../../components";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.scss";

const Home: React.FC<HomeProps> = (props) => {
    const { getJokesRequest } = useRequest();
    const { validSession } = useLocalStorage();
    const formRef = useRef<HTMLFormElement>(null);
    const [page, setPage] = useState<number>(1);
    const [items, setItems] = useState<number>(5);
    const [jokes, setJokes] = useState<JokeProps[] | null>(null);
    const sessionIsValid = validSession();
    const navigation = useNavigate();

    const getJokes = useCallback(
        (page: number, limit: number) => {
            getJokesRequest({ page, limit }).then((data) => {
                Array.isArray(data) && setJokes(data);
            });
        },
        [getJokesRequest]
    );

    useEffect(() => {
        sessionIsValid ? getJokes(page, items) : navigation("/login");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const changeHandler = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            event.preventDefault();
            const item = Number(event.target.value);
            setItems(item);
            getJokes(page, item);
        },
        [getJokes, page]
    );

    const paginationHandler = (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        switch (event.currentTarget.value) {
            case "prev":
                setPage((prev) => (prev > 1 ? prev - 1 : 1));
                getJokes(page > 1 ? page - 1 : 1, items);
                break;
            case "next":
                setPage((prev) => prev + 1);
                getJokes(page + 1, items);
        }
    };

    return (
        <>
            <Header />
            <div className={styles.Home}>
                <div className={styles.header}>
                    <Link className={styles.button} to="joke">
                        <Plus height={16} width={16} />
                        Add new joke
                    </Link>
                    <div className={styles.filters_wrapper}>
                        <form id="jokes-list" ref={formRef}>
                            <label htmlFor="jokes-list">Ver</label>
                            <select
                                id="jokes-list-selector"
                                value={items}
                                name="items"
                                form="jokes-list"
                                onChange={changeHandler}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                            </select>
                        </form>
                    </div>
                </div>
                <div>{jokes && <Jokes jokes={jokes} />}</div>
                <div className={styles.pagination_wrapper}>
                    <button
                        value="prev"
                        onClick={paginationHandler}
                        disabled={page === 1}
                    >
                        <ArrowLeft />
                    </button>
                    <button value="next" onClick={paginationHandler}>
                        <ArrowRight />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Home;
