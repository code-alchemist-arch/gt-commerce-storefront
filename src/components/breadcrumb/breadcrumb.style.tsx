import styled from "styled-components";

export const BreadcrumbContainer = styled.div<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  width: 100%;
  position: relative;
  padding: 0 15px;
`;

export const BreadcrumbItem = styled.li`
  font-size: 13px;
  font-weight: 500;
  a {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const BreadcrumbWrapper = styled.ol`
  max-width: 1600px;
  margin: 15px auto;
  display: flex;
  align-items: center;
  opacity: 1;
  color: ${(props) => props.color};
  z-index: 10;
  padding-left: 0px;
  svg {
    transform: rotate(-90deg);
  }

  ${BreadcrumbItem} {
    a {
      color: ${(props) => props.color};
    }
  }
`;

export const BreadcrumbItemSeparator = styled.li`
  display: flex;
  align-items: center;
  margin: 0 5px;
`;
