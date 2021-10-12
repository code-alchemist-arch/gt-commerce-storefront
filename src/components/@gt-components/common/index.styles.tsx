import styled, { createGlobalStyle } from "styled-components";

export const ContentDivider = styled.hr`
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
`;

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400&display=swap');
  
  html {
    --primary-color: #351527;
    --secondary-color: #785D5B;
  }

  body {
      font-family: 'Noto Sans JP', sans-serif;
  }


`;
