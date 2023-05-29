export interface JokesRequestProps {
    page?: number
    limit?: number
    views?: number
    id?: number
}

export interface JokeProps {
    id: number
    Body: string
    Title: string
    Views: number
    Author: string
    CreatedAt: number
}
