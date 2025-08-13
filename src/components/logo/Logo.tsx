import blackLogo from "../../assets/blackLogo.svg";
import whiteLogo from "../../assets/whiteLogo.svg";
import { useThemeStore } from "../../store/theme-store";

export function Logo() {
  const theme = useThemeStore((state) => state.theme);

  const logoSrc = theme === "dark" ? whiteLogo : blackLogo;

  return <img src={logoSrc} alt="Logo" width={"100px"} />;
}
