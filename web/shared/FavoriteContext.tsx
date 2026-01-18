import React, {Context, Dispatch, SetStateAction} from "react";

export const FavoriteContext: Context<[number[], Dispatch<SetStateAction<number[]>>]>
    = React.createContext([[], (() => {}) as Dispatch<SetStateAction<number[]>>]);