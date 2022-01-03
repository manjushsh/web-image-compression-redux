import { createSlice } from "@reduxjs/toolkit";
import CacheService from "../../../services/cache-service";

const THEME_KEY = "theme";
const theme: any = CacheService.get(THEME_KEY);

const applyLightTheme = (element: HTMLElement, state: any) => {
    element.classList.remove("dark-mode");
    state.theme = "light";
};

const applyDarkTheme = (element: HTMLElement, state: any) => {
    element.classList.add("dark-mode");
    state.theme = "dark";
};

const ThemeToggleSlice = createSlice({
    name: "theme-toggler",
    initialState: { theme: theme || "light" },
    reducers: {
        handleToggleTheme: state => {
            const element = document.body;
            if (element?.classList.contains("dark-mode")) {
                state.theme = "light";
                CacheService.set(THEME_KEY, "light");
            }
            else {
                state.theme = "dark";
                CacheService.set(THEME_KEY, "dark");
            }
            element.classList.toggle("dark-mode");
        },
        applySavedTheme: state => {
            const element = document.body;
            switch (theme) {
                case "dark":
                    applyDarkTheme(element, state);
                    break;
                case "light":
                    applyLightTheme(element, state);
                    break;
                default:
                    applyLightTheme(element, state);
                    break;
            };
        },
    },
});

// Actions 
export const { handleToggleTheme, applySavedTheme } = ThemeToggleSlice.actions;

// Reducers
export default ThemeToggleSlice.reducer;