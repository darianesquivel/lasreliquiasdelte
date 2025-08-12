import blackLogo from "./logo.svg";
import whiteLogo from "./logoblanco.svg";
import { useThemeStore } from "../store/theme-store";

export function Logo() {
  const theme = useThemeStore((state) => state.theme);

  const logoSrc = theme === "dark" ? whiteLogo : blackLogo;

  return <img src={logoSrc} alt="Logo" width={"200px"} />;
}
