import React, { useEffect, useState } from 'react'
import { JokesProps } from "./Jokes.types"
import { cloneDeep } from "lodash"
import { Link } from "react-router-dom"
import styles from "./Jokes.module.scss"

const Jokes: React.FC<JokesProps> = ({ jokes }) => {
    const [jokesAuthor, setJokesAuthor] = useState<string[]>([])
    const [jokesTitle, setJokesTitle] = useState<{title: string, id: number}[]>([])
    const [jokesCreationDate, setJokesCreationDate] = useState<number[]>([])
    const [jokesViews, setJokesViews] = useState<number[]>([])
    
    useEffect(() => {
        const jokesCopy = cloneDeep(jokes)
        setJokesAuthor(jokesCopy.map(joke => joke.Author))
        setJokesTitle(jokesCopy.map(joke => ({title: joke.Title, id: joke.id})))
        setJokesCreationDate(jokesCopy.map(joke => joke.CreatedAt))
        setJokesViews(jokesCopy.map(joke => joke.Views))
    }, [jokes])

    const formatDate = (timeStamp: number) => {
        const date = new Date(timeStamp)
        const formatDate = date.toLocaleDateString(undefined, {day: "2-digit", month: "long",year: "numeric" })
        return formatDate
    }

    const viewColorFormat = (views: number) => {
        let color = "transparent";
        if(views <= 25) color = "tomato"
        if(views >= 26 && views <= 50) color = "orange"
        if(views >= 51 && views <= 75) color = "yellow"
        if(views >= 76 && views <= 100) color = "green"
        return color
    }

    return jokes ? (
        <div className={styles.Jokes_wrapper}>
            <ul className={styles.Jokes_author}>
                {jokesAuthor.map((author, index) => <li key={`author_${index}`}><h5>{author}</h5></li>)}
            </ul>
            <ul className={styles.Jokes_title}>
                {jokesTitle.map((title, index) => <li key={`title_${index}`}><Link to={`joke/${title.id}`}><h5>{title.title}</h5></Link></li>)}
            </ul>
            <ul className={styles.Jokes_createdDate}>
                {jokesCreationDate.map((date, index) => <li key={`date_${index}`}><h5>{formatDate(date)}</h5></li>)}
            </ul>
            <ul className={styles.Jokes_views}>
                {jokesViews.map((views, index) => <li key={`views_${index}`}><div className={styles.view_container} style={{background: viewColorFormat(views)}}><h4>{views}</h4></div></li>)}
            </ul>
        </div>
    ) : <></>
}

export default Jokes
