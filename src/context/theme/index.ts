import { createContext } from "react";
import { ThemeContextProps } from "./theme.types";

const ThemeContext = createContext<{
    theme: ThemeContextProps["theme"];
    setTheme: React.Dispatch<
        React.SetStateAction<{ theme: ThemeContextProps["theme"] }>
    >;
}>({
    theme: "light",
    setTheme: () => {},
});

export default ThemeContext;
