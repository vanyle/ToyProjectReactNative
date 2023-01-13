import React from "react"

type GlobalStateType = {
    addFavorite: (id: number) => void,
    removeFavorite: (id: number) => void,
    favoriteIds: number[]
};

export const GlobalContext = React.createContext<GlobalStateType>({
    addFavorite: () => {
        // ...
    },
    removeFavorite: () => {
        // ...
    },
    favoriteIds: []
});