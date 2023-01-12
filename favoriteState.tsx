import React from "react"

type GlobalStateType = {
    getFavorites: () => number[],
    addFavorite: (id: number) => void,
    removeFavorite: (id: number) => void,
    addListener: (cb: (f: number[]) => void) => void;
}

let favorites: number[] = [11007];
const listeners: ((n: number[]) => void)[] = [];
export const defaultValue = {
    getFavorites: () => {
        return favorites;
    },
    addFavorite: (id: number) => {
        favorites.push(id);
        listeners.forEach((e) => e(favorites));
    },
    removeFavorite: (id: number) => {
        favorites = favorites.filter((i) => i !== id);
        listeners.forEach((e) => e(favorites));
    },
    addListener: (callback: (n: number[]) => void) => {
        listeners.push(callback);
    }
}

export const GlobalContext = React.createContext<GlobalStateType>(defaultValue);