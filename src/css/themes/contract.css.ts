import { createThemeContract } from "@vanilla-extract/css"

export const vars = createThemeContract({
  color: {
    default: null,
  },
  font: {
    default: null,
  },
  backgroundColor: {
    default: null,
  },
})