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

export enum ActionType{
    AddFavorite,
    RemoveFavorite
}
type Action = {
    id: number,
    type: ActionType
}
export function favoriteReducer(favorites: number[], action: Action){
    switch(action.type){
        case ActionType.AddFavorite:
            if(favorites.indexOf(action.id) === -1){
                return [...favorites, action.id];
            }else{
                return favorites;
            }
            break;
        case ActionType.RemoveFavorite:
            return favorites.filter((i) => i != action.id);
            break;
    }
}