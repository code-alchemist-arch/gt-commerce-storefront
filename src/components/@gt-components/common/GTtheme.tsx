/**
 * GTThem Props
 */
export interface GTThemeProps {
  text: {
    color: {
      main: string;
    };
  };
  background: {
    main: string;
    primary: {
      main: string;
      dark?: string;
      light?: string;
    };
  };
}

/**
 * GTTheme Props
 */
export const GTTheme: GTThemeProps = {
  text: {
    color: {
      main: "white",
    },
  },
  background: {
    main: "rgb(92, 65, 53)",
    primary: {
      main: "rgb(199, 173, 157)",
      dark: "rgb(92, 65, 53)",
    },
  },
};
