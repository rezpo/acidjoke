import React, { useContext } from "react";
import { HeaderProps } from "./Header.types";
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left.svg";
import { ReactComponent as Moon } from "../../assets/icons/moon.svg";
import { ReactComponent as Sun } from "../../assets/icons/sun.svg";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/";
import styles from "./Header.module.scss";
import { ThemeContextProps } from "../../context/theme/theme.types";

const Header: React.FC<HeaderProps> = ({ goBack }) => {
    const navigation = useNavigate();
    const { theme, setTheme } = useContext(ThemeContext);

    const switchTheme = (theme: ThemeContextProps["theme"]) => {
        setTheme({ theme: theme });
    };

    return (
        <div className={styles.Header_wrapper}>
            <div className={styles.Header_navigation_wrapper}>
                {goBack && (
                    <div className={styles.nav} onClick={() => navigation(-1)}>
                        <ArrowLeft /> <span>Back to page</span>
                    </div>
                )}
            </div>
            {theme === "light" ? (
                <div
                    className={styles.theme_setter}
                    onClick={() => switchTheme("dark")}
                >
                    <Moon height={16} />
                    <span>Ligths Off</span>
                </div>
            ) : (
                <div
                    className={styles.theme_setter}
                    onClick={() => switchTheme("light")}
                >
                    <Sun height={16} />
                    <span>Ligths On</span>
                </div>
            )}
        </div>
    );
};

export default Header;
