import React from "react";
import Main from "../components/MainContent";

export const previewShows = (props: {
    id: string;
    title: string;
    description: string;
    seasons: number;
    image: string;
    genres: number[];
    updated: string;
}[]) => {
    props.map((show) => {
        return (
            <Main
                key={show.id}
            />
        )
    })
}