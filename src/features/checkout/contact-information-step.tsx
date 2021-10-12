import React from "react";
import InformationBox from "components/information-box/information-box";
import { ContactInformation } from "./checkout.style";
import ContactForm from "./contact-form";
import { StepAction } from "components/step-box/step-box.style";
import Label from "../../components/label/label";

const ContactInformationStep = ({
  showForm,
  email,
  isLoading,
  onSubmit,
  handleChangeEmail,
}) => {
  return (
    <InformationBox className="contactInfoStep">
      <ContactInformation className={!showForm ? "confirmed" : ""}>
        <Label
          text={`${email ? email : "Contact Information"}`}
          fontSize={14}
          fontWeight={500}
          // iconName={!deviceType.mobile ? 'user' : undefined}
          iconName={"user"}
          iconHeight={20}
          iconWidth={20}
        ></Label>
        {showForm ? (
          <ContactForm
            onSubmit={onSubmit}
            email={email}
            loadingState={isLoading}
          />
        ) : (
          <>
            {" "}
            {handleChangeEmail && (
              <StepAction onClick={handleChangeEmail}>Change</StepAction>
            )}
          </>
        )}
      </ContactInformation>
    </InformationBox>
  );
};

export default ContactInformationStep;
