import { NextPage } from "next";
import { useQuery } from "@apollo/client";
import { Modal } from "@redq/reuse-modal";
import { GET_LOGGED_IN_CUSTOMER } from "graphql/query/customer.query";
import { ProfileProvider } from "contexts/profile/profile.provider";
import SettingsContent from "features/user-profile/settings/settings";
import {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from "features/user-profile/user-profile.style";
import Sidebar from "features/user-profile/sidebar/sidebar";
import { SEO } from "components/seo";
import ErrorMessage from "components/error-message/error-message";
import { ME } from "../graphql/query/user.query";

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const ProfilePage: NextPage<Props> = ({ deviceType }) => {
  const { data, error, loading } = useQuery(ME);
  if (!data || loading) {
    return <div>loading...</div>;
  }
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <SEO title="Profile - SiteName" description="Profile Details" />
      <ProfileProvider initData={data.me}>
        <PageWrapper>
          <SidebarSection>
            <Sidebar />
          </SidebarSection>
          <ContentBox>
            <SettingsContent deviceType={deviceType} />
          </ContentBox>
        </PageWrapper>
      </ProfileProvider>
    </>
  );
};

export default ProfilePage;
