import { createSlice } from "@reduxjs/toolkit";
import CacheService from "../../../services/cache-service";

const THEME_KEY = "theme";
const theme = CacheService.get(THEME_KEY);
const ThemeToggleSlice = createSlice({
    name: "theme-toggler",
    initialState: theme || "light",
    reducers: {
        handleToggleTheme: () => {
            const element = document.body;
            if (element?.classList.contains("dark-mode"))
                CacheService.set(THEME_KEY, "light");
            CacheService.set(THEME_KEY, "dark");

            element.classList.toggle("dark-mode");
            return CacheService.get(theme);
        },
        applySavedTheme: () => {
            const element = document.body;
            switch (theme) {
                case "dark":
                    element.classList.add("dark-mode");
                    break;
                case "light":
                    element.classList.remove("dark-mode");
                    break;
                default:
                    element.classList.remove("dark-mode");
                    break;
            };
            return theme;
        },
    },
});

// Actions 
export const { handleToggleTheme, applySavedTheme } = ThemeToggleSlice.actions;

// Reducers
export default ThemeToggleSlice.reducer;