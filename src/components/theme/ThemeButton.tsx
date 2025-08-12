import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton } from "@radix-ui/themes";
import { useThemeStore } from "../../store/theme-store";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export const ThemeButton = () => {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <Box className="absolute" left={"5"} top={"5"}>
      <IconButton variant="ghost" onClick={toggleTheme}>
        <FontAwesomeIcon
          color={theme === "dark" ? "white" : "gold"}
          icon={theme === "dark" ? faMoon : faSun}
        />
      </IconButton>
    </Box>
  );
};
