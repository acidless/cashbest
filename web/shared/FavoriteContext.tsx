import React, {Context, Dispatch, SetStateAction} from "react";

export const FavoriteContext: Context<[number[], Dispatch<SetStateAction<number[]>>]>
    = React.createContext([[] as number[], (() => {}) as Dispatch<SetStateAction<number[]>>]);