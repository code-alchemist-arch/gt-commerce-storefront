import React, { useState } from "react";
import {
  FooterWrapper,
  InfoBlock,
  InfoGrid,
  Title,
  Divisor,
  Content,
  InfoIcon,
  Copy,
  Copyright,
  SocialLinks,
  Newsletter,
  FooterContainer,
  NewsletterError,
  NewsletterText,
  InputWrapper,
  NewsletterThankyou,
  NewsletterInputs,
  OperationHours,
  OperationHoursTitle,
  NewsletterContent,
} from "./footer.style";
import DOMPurify from "isomorphic-dompurify";
import marked from "marked";
import Image from "next/image";
import { FormattedMessage } from "react-intl";
import PhoneIcon from "../../assets/icons/PhoneIcon";
import { defaultTheme } from "../../site-settings/site-theme/default";
import AddressIcon from "../../assets/icons/AddressIcon";
import WhiskyIcon from "../../assets/icons/WhiskyIcon";
import { validateEmail } from "../../utils/utils";
import { Button } from "../../components/button/button";
import Input from "../../components/input/input";
import NavLink from "../../components/nav-link/nav-link";

type SiteFooterProps = {
  onSuscribeClick?: Function;
  columns: any[];
  copy?: string;
  address?: string;
  phone?: string;
  className?: string;
  footerMessage?: string;
  socialLinks?: {
    label: string;
    icon_slug: string;
    url: string;
  }[];
  show_company_info?: boolean;
  show_newsletter?: boolean;
  newsletter_background?: string;
  show_logo?: boolean;
  operation_hours?: string;
};

const SiteFooter: React.FC<SiteFooterProps> = ({
  className,
  columns = [],
  copy,
  address,
  phone,
  show_company_info,
  socialLinks,
  show_newsletter,
  newsletter_background,
  operation_hours,
  footerMessage = "Site Footer Message",
  show_logo = false,
}: SiteFooterProps) => {
  const [email, setEmail] = useState("");
  const [subscribeEnabled, setSubscribeEnabled] = useState(false);
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleEmailChange = (value) => {
    setEmail(value);
    setSubscribeEnabled(validateEmail(value));
  };

  const resetForm = () => {
    handleEmailChange(" ");
    setError("");
  };

  const handleSubscribeClick = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/subscribe", {
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();

      if (error) {
        setError(error);
        return;
      }
      setSubscribed(true);
      resetForm();
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const sanitizeContent = React.useCallback(
    (content) => {
      return DOMPurify.sanitize(marked(content), { ADD_ATTR: ["target"] });
    },
    [columns]
  );

  return (
    <FooterContainer>
      {show_newsletter && (
        <Newsletter>
          {newsletter_background && (
            <Image
              className="bg"
              src={`${process.env.API_CMS_URL}${newsletter_background}`}
              layout="fill"
            />
          )}
          <NewsletterContent onSubmit={(e) => handleSubscribeClick(e)}>
            <NewsletterText>
              Subscribe to get our latest offers and news!
            </NewsletterText>
            <NewsletterInputs>
              <InputWrapper>
                <Input
                  onUpdate={handleEmailChange}
                  placeholder="Enter your email address"
                  value={email}
                />
                <NewsletterError>{error}</NewsletterError>
              </InputWrapper>
              <Button
                disabled={!subscribeEnabled}
                type="submit"
                style={{ height: 48 }}
              >
                Subscribe
              </Button>
            </NewsletterInputs>
            {subscribed && <NewsletterThankyou>Thank you!</NewsletterThankyou>}
          </NewsletterContent>
        </Newsletter>
      )}
      <FooterWrapper className={className}>
        <InfoGrid>
          {columns.map(({ id, title, content }) => (
            <InfoBlock key={id}>
              <Title>{title}</Title>
              <Divisor />
              {!!content && (
                <Content
                  dangerouslySetInnerHTML={{ __html: sanitizeContent(content) }}
                />
              )}
            </InfoBlock>
          ))}
          {show_company_info && (
            <InfoBlock>
              {show_logo && (
                <div style={{ marginBottom: 30 }}>
                  <Image
                    src={"/images/logo-white.svg"}
                    alt=""
                    width={400}
                    height={100}
                    quality={100}
                    priority
                  />
                </div>
              )}
              {copy && <Copy>{copy}</Copy>}
              {phone && (
                <InfoIcon>
                  <PhoneIcon color={defaultTheme.footer.color} />
                  <a style={{ marginLeft: "15px" }} href="#">
                    Phone: {phone}
                  </a>
                </InfoIcon>
              )}
              {address && (
                <InfoIcon>
                  <AddressIcon color={defaultTheme.footer.color} />
                  <span style={{ marginLeft: "15px" }}>{address}</span>
                </InfoIcon>
              )}
              {operation_hours && (
                <OperationHours>
                  <OperationHoursTitle>
                    <FormattedMessage
                      id="hoursOfOperationTitle"
                      defaultMessage="HOURS OF OPERATION"
                    />
                  </OperationHoursTitle>
                  <div
                    dangerouslySetInnerHTML={{ __html: operation_hours }}
                  ></div>
                </OperationHours>
              )}
            </InfoBlock>
          )}
        </InfoGrid>

        <Copyright border dangerouslySetInnerHTML={{ __html: footerMessage }} />
        {socialLinks && (
          <SocialLinks>
            {socialLinks.map((link, i) => (
              <NavLink
                iconName={link.icon_slug}
                iconColor={defaultTheme.colors.white}
                href={link.url}
                label=""
                key={i}
              />
            ))}
          </SocialLinks>
        )}
      </FooterWrapper>
    </FooterContainer>
  );
};

export default SiteFooter;
