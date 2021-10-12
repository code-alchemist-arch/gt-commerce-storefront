import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { LabelStyle } from "../../components/label/label.style";

export const MenuSpacer = styled.div`
  margin: 25px 0;
  height: 1px;
`;

export const ProfileMenuWrapper = styled.div`
  & ${LabelStyle} {
    margin: 25px 0;
    cursor: pointer;

    &:hover:not(.title),
    &.selected {
      div {
        color: ${themeGet("secondary.color")};
      }
      svg path {
        fill: ${themeGet("secondary.color")};
      }
    }

    &.title {
      margin: 0;
      cursor: default;
    }

    &.user-email {
      margin: 20px 0 50px 0;
    }
  }

  &.mobile {
    padding-bottom: 200px;
    & ${LabelStyle} {
      &.title {
        margin: 0 0 30px 0;
      }
    }
  }
`;
