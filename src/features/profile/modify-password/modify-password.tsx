import React from "react";
import Label from "components/label/label";
import { ModifyPasswordWrapper, TitleSection } from "./modify-password.style";
import { defaultTheme } from "../../../site-settings/site-theme/default";
import ModifyPasswordForm from "./modify-password-form";

const ModifyPassword = () => {
  return (
    <ModifyPasswordWrapper>
      <TitleSection>
        <Label
          iconName="password"
          text="Change Password"
          fontSize={16}
          fontWeight={500}
          iconColor={defaultTheme.secondary.color}
          iconHeight={30}
          iconWidth={30}
        />
      </TitleSection>
      <ModifyPasswordForm />
    </ModifyPasswordWrapper>
  );
};

export default ModifyPassword;
