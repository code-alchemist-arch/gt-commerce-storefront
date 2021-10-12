import styled from "styled-components";

export const ModifyPasswordWrapper = styled.div`
   {
  }
`;
export const TitleSection = styled.div`
   {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const FormWrapper = styled.div`
   {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 25px;

    & .actions {
      display: flex;
      justify-content: flex-end;

      button {
        width: 280px;
      }
    }

    @media screen and (max-width: 464px) {
      grid-template-columns: 1fr;
      grid-gap: 20px;

      & .actions {
        justify-content: center;
        button {
          width: 100%;
        }
      }
    }
  }
`;
export const FormInputsWrapper = styled.div`
   {
  }
`;
export const FormErrorsWrapper = styled.div`
   {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 35px;
  }
`;
