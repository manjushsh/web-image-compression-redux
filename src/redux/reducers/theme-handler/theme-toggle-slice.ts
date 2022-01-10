import { createSlice } from "@reduxjs/toolkit";
import CacheService from "../../../services/cache-service";

const THEME_KEY = "theme";
const theme: string = CacheService.get(THEME_KEY);

const applyTheme = (element: HTMLElement, state: any, method: string = 'add', type: string = 'dark') => {
    element.classList[method]("dark-mode");
    state.theme = type;
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
                    applyTheme(element, state, 'add', 'dark');
                    break;
                case "light":
                    applyTheme(element, state, 'remove', 'light');
                    break;
                default:
                    applyTheme(element, state, 'remove', 'light');
                    break;
            };
        },
    },
});

// Actions 
export const { handleToggleTheme, applySavedTheme } = ThemeToggleSlice.actions;

// Reducers
export default ThemeToggleSlice.reducer;