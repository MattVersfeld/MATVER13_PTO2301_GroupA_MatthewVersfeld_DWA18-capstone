/**
 * State interfaces
 */
export interface Episode {
}

export interface ShowDetails {
    showData: any[];
    showImage: string;
    showTitle: string;
    showDescription: string;
    showDate: string;
    seasonPick: string;
    episodes: Episode[];
    displayEpisodes: any[];
    displayImage: string;
}

export interface MediaPlayer {
    mediaTitle: string;
    mediaFile: string;
    mediaImage: string;
}

export interface AppState {
    phase: string;
    shows: any[];
    DisplayShows: any[];
    showDetails: ShowDetails;
    loadCarousel: boolean;
    carousel: any[];
    favoriteShows: any[];
    showBackup: any[];
    mediaPlayer: MediaPlayer;
    isMediaPlaying: boolean;
    resetData: boolean;
}

/**
 * API interfaces
 */

export type ShowData = showAPI[]

export interface showAPI {
    id: string
    title: string
    description: string
    seasons: number
    image: string
    genres: number[]
    updated: string
}
