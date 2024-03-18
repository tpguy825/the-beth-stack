import { colors } from "../colors.js";

export const logger = {
  info: (message: string) => console.log(colors.info(message)),
  error: (message: string) => console.error(colors.error(message)),
  warning: (message: string) => console.warn(colors.warning(message)),
  success: (message: string) => console.log(colors.success(message))
};
