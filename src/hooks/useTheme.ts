import { useTheme as useStyledTheme } from "styled-components";
import theme from "../styling/theme/lightTheme";

const useTheme = useStyledTheme as () => typeof theme;

export default useTheme;