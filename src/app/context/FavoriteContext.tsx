"use client"

import { createContext } from "react";
import { FavoriteContextProps } from "../types/types";

export const FavoriteContext = createContext<FavoriteContextProps | undefined>(undefined);