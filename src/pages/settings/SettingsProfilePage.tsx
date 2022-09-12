import { useContext, useState } from 'react';
import { Edit } from 'akar-icons';
import { UserBanner } from '../../components/settings/profile/UserBanner';
import { Page } from '../../utils/styles';
import {
  ProfileAboutSection,
  ProfileAboutSectionHeader,
  ProfileDescriptionField,
  ProfileEditActionBar,
  ProfileSection,
  SettingsProfileUserDetails,
} from '../../utils/styles/settings';
import { Button } from '../../utils/styles/button';
import { UpdateProfileParams } from '../../utils/types';
import { updateUserProfile } from '../../utils/api';
import { AuthContext } from '../../utils/context/AuthContext';
import { CDN_URL } from '../../utils/constants';

export const SettingsProfilePage = () => {
  const { user } = useContext(AuthContext);
  console.log();
  const [bannerSource] = useState(CDN_URL.concat(user?.profile?.banner || ''));
  const [bannerFile, setBannerFile] = useState<File>();
  const [bannerSourceCopy, setBannerSourceCopy] = useState(bannerSource);
  const [about] = useState('hello world');
  const [aboutCopy, setAboutCopy] = useState(about);
  const [isEditing, setIsEditing] = useState(false);

  const isChanged = () => aboutCopy !== about || bannerFile;

  const reset = () => {
    setAboutCopy(about);
    setBannerSourceCopy(bannerSource);
    setIsEditing(false);
    setBannerFile(undefined);
    URL.revokeObjectURL(bannerSourceCopy);
  };

  const save = async () => {
    const formData = new FormData();
    bannerFile && formData.append('banner', bannerFile);
    about !== aboutCopy && formData.append('about', aboutCopy);
    try {
      await updateUserProfile(formData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Page>
      <UserBanner
        bannerSource={bannerSource}
        bannerSourceCopy={bannerSourceCopy}
        setBannerSourceCopy={setBannerSourceCopy}
        setBannerFile={setBannerFile}
      />
      <ProfileSection>
        <SettingsProfileUserDetails>
          <div className="avatar"></div>
          <span>@username</span>
        </SettingsProfileUserDetails>
        <ProfileAboutSection>
          <ProfileAboutSectionHeader>
            <label htmlFor="about">About Me</label>
            <Edit
              cursor="pointer"
              strokeWidth={2}
              size={28}
              onClick={() => setIsEditing(!isEditing)}
            />
          </ProfileAboutSectionHeader>
          <ProfileDescriptionField
            maxLength={200}
            disabled={!isEditing}
            value={aboutCopy}
            onChange={(e) => setAboutCopy(e.target.value)}
          />
        </ProfileAboutSection>
      </ProfileSection>
      {isChanged() && (
        <ProfileEditActionBar>
          <div>
            <span>You have unsaved changes</span>
          </div>
          <div className="buttons">
            <Button size="md" variant="secondary" onClick={reset}>
              Reset
            </Button>
            <Button size="md" onClick={save}>
              Save
            </Button>
          </div>
        </ProfileEditActionBar>
      )}
    </Page>
  );
};
