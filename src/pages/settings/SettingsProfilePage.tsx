import { Edit } from 'akar-icons';
import { UserBanner } from '../../components/settings/profile/UserBanner';
import { toast } from 'react-toastify';
import { Page } from '../../utils/styles';
import { Button } from '../../utils/styles/button';
import {
  ProfileAboutSection,
  ProfileAboutSectionHeader,
  ProfileDescriptionField,
  ProfileSection,
  SettingsProfileUserDetails,
} from '../../utils/styles/settings';

export const SettingsProfilePage = () => {
  return (
    <Page>
      <UserBanner />
      <ProfileSection>
        <SettingsProfileUserDetails>
          <div className="avatar"></div>
          <span>@username</span>
        </SettingsProfileUserDetails>
        <ProfileAboutSection>
          <ProfileAboutSectionHeader>
            <label htmlFor="about">About Me</label>
            <Edit strokeWidth={2} size={28} />
          </ProfileAboutSectionHeader>
          <ProfileDescriptionField maxLength={200} disabled={true} />
        </ProfileAboutSection>
      </ProfileSection>
    </Page>
  );
};
