import styled from "styled-components";

export const SearchBoxWrapper = styled.div<{
  isSticky: boolean;
  open: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ isSticky }) => (isSticky ? "100%" : "auto")};
  padding: 10px 20px;
  border-radius: 4px;

  transition: all 0.4s ease;

  background: ${({ isSticky, open }) =>
    isSticky ? (open ? "#80808073" : "none") : "#80808073"};

  input {
    width: ${({ isSticky, open }) => (isSticky ? (open ? "100%" : 0) : "auto")};
    background: transparent;
    border: none;
    outline: none;

    &:focus {
      outline: none;
    }

    transition: all 0.4s ease;
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
  }
`;
