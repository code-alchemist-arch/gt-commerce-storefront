import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const CheckBoxStyle = styled.div`
  display: inline-flex;
  /* Switch label default style */
  .pickbazar__field-label {
    color: ${themeGet("colorsdarkRegular", "#77798C")};
    font-size: ${themeGet("fontSizes.2", "14")}px;
    font-weight: 400;
  }

  /* Switch label style when labelPosition on left */
  &.label_left {
    label {
      display: flex;
      align-items: center;
      .pickbazar__field-label {
        margin-right: 10px;
      }
    }
  }

  /* Switch label style when labelPosition on right */
  &.label_right {
    label {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;

      .pickbazar__field-label {
        margin-left: 10px;
      }
    }
  }

  /* Checkbox default style */
  input[type="checkbox"] {
    &.checkbox {
      opacity: 0;
      position: absolute;
      margin: 0;
      z-index: -1;
      width: 0;
      height: 0;
      overflow: hidden;
      pointer-events: none;

      &:checked + div {
        background-color: ${themeGet("secondary.color")};
      }
    }
    + div {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      border-radius: 4px;
      border: 1px solid ${themeGet("colorsdarkRegular", "#77798C")};
      position: relative;
      transition: all 0.3s ease;
    }
  }
`;

CheckBoxStyle.displayName = "CheckBoxStyle";

export default CheckBoxStyle;
