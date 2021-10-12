import React from "react";
import InformationBox from "../../components/information-box/information-box";

import {
  ProfileGridLayout,
  ProfileSideBarMenu,
  ProfileContent,
} from "./profile-layout.style";

import ProfileMenu from "./profile-menu";

type Props = {
  selectedItem?: string;
  withBox?: boolean;
  children: React.ReactElement;
  deviceType: any;
};

const ProfileLayout: React.FC<Props> = ({
  deviceType,
  selectedItem,
  children,
  withBox = true,
}: Props) => {
  return (
    <ProfileGridLayout>
      <ProfileSideBarMenu>
        <ProfileMenu selectedItem={selectedItem} />
      </ProfileSideBarMenu>

      <ProfileContent>
        {withBox ? <InformationBox>{children}</InformationBox> : children}
      </ProfileContent>
    </ProfileGridLayout>
  );
};

export default ProfileLayout;
