import { useContext, useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { Edit } from 'akar-icons';
import { UserBanner } from '../../components/settings/profile/UserBanner';
import { OverlayStyle, Page } from '../../utils/styles';
import {
  ProfileAboutSection,
  ProfileAboutSectionHeader,
  ProfileDescriptionField,
  ProfileEditActionBar,
  ProfileSection,
  SettingsProfileUserDetails,
} from '../../utils/styles/settings';
import { Button } from '../../utils/styles/button';
import { updateUserProfile } from '../../utils/api';
import { AuthContext } from '../../utils/context/AuthContext';
import { CDN_URL } from '../../utils/constants';

export const SettingsProfilePage = () => {
  const { user, updateAuthUser } = useContext(AuthContext);
  const [bannerSource, setBannerSource] = useState(
    CDN_URL.concat(user?.profile?.banner || '')
  );
  const [bannerFile, setBannerFile] = useState<File>();
  const [bannerSourceCopy, setBannerSourceCopy] = useState(bannerSource);
  const [about, setAbout] = useState(user?.profile?.about || '');
  const [aboutCopy, setAboutCopy] = useState(about);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Updating About');
    setAbout(user?.profile?.about || '');
  }, [user?.profile?.about]);

  useEffect(() => {
    console.log('Updating Banner URL');
    console.log(user?.profile?.banner);
    setBannerSource(CDN_URL.concat(user?.profile?.banner || ''));
    setBannerSourceCopy(CDN_URL.concat(user?.profile?.banner || ''));
  }, [user?.profile?.banner]);

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
      setLoading(true);
      const { data: updatedUser } = await updateUserProfile(formData);
      console.log(updatedUser);
      URL.revokeObjectURL(bannerSourceCopy);
      setBannerFile(undefined);
      updateAuthUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <OverlayStyle>
          <MoonLoader size={40} color="#fff" />
        </OverlayStyle>
      )}
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
              <Button
                size="md"
                variant="secondary"
                onClick={reset}
                disabled={loading}
              >
                Reset
              </Button>
              <Button size="md" onClick={save} disabled={loading}>
                Save
              </Button>
            </div>
          </ProfileEditActionBar>
        )}
      </Page>
    </>
  );
};
