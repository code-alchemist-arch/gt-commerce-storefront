import styled from "styled-components";

export const InspirationFormWrapper = styled.div`
  max-width: 960px;
  width: 100%;
  margin: auto;

  padding: 20px;
  form {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 10px;
    flex: 1;

    background: #f0f0f0;

    button {
      display: flex;
      height: fit-content;

      margin: auto;
    }

    @media (max-width: 1023px) {
      flex-wrap: wrap;
    }
  }
`;

export const InspirationForm = styled.form`
  display: flex;
  align-items: flex-end;
`;

export const GTSelectsWrapper = styled.div`
  display: flex;
  flex: 1;

  align-items: flex-end;
  @media (max-width: 1023px) {
    flex-wrap: wrap;
    width: 100%;
  }
`;

export const GTSelectWrapper = styled.div`
  flex: 1;
  padding: 10px;

  min-width: fit-content;
  @media (max-width: 1023px) {
    width: 100%;
    flex-basis: 100%;
  }
`;

export const GTButtonWrapper = styled.div`
  padding: 10px;

  @media (max-width: 1023px) {
    width: 100%;
  }
`;

export const FormTitle = styled.h3`
  display: block;

  text-align: center;
  overflow: hidden;
  span {
    position: relative;

    display: inline-block;
    padding: 0 20px;
    font-family: lato, arial, sans-serif;
    font-weight: 400;
    font-size: 30px;
    letter-spacing: 0.1em;
    line-height: 1;
    text-align: center;
    text-transform: uppercase;
    color: #562345;

    &:before,
    &:after {
      content: "";
      display: block;
      width: 1000px;
      position: absolute;
      top: 50%;
      border-top: 1px solid #bbac78;
    }

    &:before {
      right: 100%;
    }

    &:after {
      left: 100%;
    }
  }
`;
