export type Shows = Show[]

export interface Show {
    id: string
    title: string
    description: string
    seasons: number
    image: string
    genres: number[]
    updated: string
}