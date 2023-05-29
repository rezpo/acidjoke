import React, { useState } from "react";
import ThemeContext from "./theme";
import { ThemeContextProps } from "./theme/theme.types";
import lightTheme from "../theme/light.module.scss";
import darkTheme from "../theme/dark.module.scss";

const Provider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<ThemeContextProps>({ theme: "light" });

    return (
        <ThemeContext.Provider value={{ theme: theme.theme, setTheme }}>
            <div
                className={
                    theme.theme === "light"
                        ? lightTheme._wrapper
                        : darkTheme._wrapper
                }
            >
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export default Provider;
