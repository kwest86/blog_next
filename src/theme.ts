import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.100",
      },
    },
  },
  colors: {
    bg: {
      primary: "#FFFFFF",
      secondaly: "#e3f6f5",
      tertiary: "#bae8e8",
    },
    headline: {
      primary: "#272343",
      secondary: "#2d334a",
    },
    button: {
      background: "#FFB359",
      text: "#272343",
    },
    highlight: "#FFB359",
  },
  components: {
    Text: {
      baseStyle: {
        color: "headline.secondary",
      },
    },
    Heading: {
      baseStyle: {
        color: "headline.primary",
      },
    },
    Button: {
      baseStyle: {
        backgroundColor: "button.background",
        color: "button.text",
      },
    },
    Box: {
      baseStyle: {
        backgroundColor: "bg.primary",
      },
    },
  },
});

export default theme;
