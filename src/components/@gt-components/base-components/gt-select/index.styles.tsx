import styled from "styled-components";

export const GTSelectWrapper = styled.div`
  width: 100%;
  label {
    display: block;
    font-size: 1.2em;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #562345;
  }

  select {
    display: block;
    width: 100%;
    padding: 10px;
    border: 1px solid #f0f0f0;
    color: gray;

    &:disabled {
      background-color: #b3b3b3;
    }
  }
`;
