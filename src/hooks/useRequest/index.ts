import axios from "axios";
import { JokesRequestProps, JokeProps } from "./useRequest.types";

const useRequest = () => {
    axios.interceptors.response.use(
        (response) => {
            // console.log(response);
            return response;
        },
        (err) => {
            console.error(err);
            return Promise.reject(err);
        }
    );

    const getJokesRequest = async (props: JokesRequestProps) => {
        try {
            const { page = 1, limit = 5, views } = props;
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}`,
                {
                    params: { _limit: limit, _page: page, Views: views },
                }
            );

            return response.data as JokeProps[];
        } catch (err: any) {
            throw new Error(`Error: ${err.message}`);
        }
    };

    const getJokeRequest = async (props: JokesRequestProps) => {
        try {
            const { id, page = 1, limit = 5, views } = props;
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/${id}`,
                {
                    params: { _limit: limit, _page: page, Views: views },
                }
            );

            return response.data as JokeProps;
        } catch (err: any) {
            throw new Error(`Error: ${err.message}`);
        }
    };

    const updateJokeRequest = async (props: JokeProps) => {
        try {
            const { id, Author, Body, CreatedAt, Title, Views } = props;
            const response = await axios.patch(
                `${process.env.REACT_APP_BASE_URL}/${id}`,
                {
                    Author,
                    Body,
                    CreatedAt,
                    Title,
                    Views,
                }
            );

            return response.data as JokeProps;
        } catch (err: any) {
            throw new Error(`Error: ${err.message}`);
        }
    };

    const deleteJokeRequest = async (id: number) => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_BASE_URL}/${id}`
            );

            return response.data;
        } catch (err: any) {
            throw new Error(`Error: ${err.message}`);
        }
    };

    const postJokeRequest = async (props: Partial<JokeProps>) => {
        try {
            const { Author, Body, Title, Views, CreatedAt } = props;
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}`,
                {
                    Author,
                    Body,
                    Title,
                    Views,
                    CreatedAt,
                }
            );

            return response.data as JokeProps;
        } catch (err: any) {
            throw new Error(`Error: ${err.message}`);
        }
    };

    return {
        getJokesRequest,
        getJokeRequest,
        updateJokeRequest,
        postJokeRequest,
        deleteJokeRequest,
    };
};

export default useRequest;
