import styled from "styled-components";

export const BoxContent = styled.div<{ noPadding: boolean }>`
  padding: ${(props) => (props.noPadding ? "0" : "15px 25px")};

  @media screen and (max-width: 460px) {
    padding: 10px 15px;
  }
`;

export const ProfileContent = styled.div`
  padding: 20px;
  background: #f7f7f780;
  @media screen and (max-width: 450px) {
    padding: 15px;

    ${BoxContent} {
      padding: 10px;
    }
  }

  @media screen and (max-width: 320px) {
    padding: 8px;

    ${BoxContent} {
    }
  }
`;

export const ProfileGridLayout = styled.div`
  height: 100%;
  @media screen and (min-width: 991px) {
    display: grid;
    grid-template-columns: 255px 1fr;

    ${ProfileContent} {
      padding: 30px;
    }
  }
`;
export const ProfileSideBarMenu = styled.div`
  background: #fff;
  padding: 50px 25px 25px 30px;
  margin-bottom: 1px;
  @media screen and (max-width: 991px) {
    display: none;
  }
`;
