import { FC } from 'react';
import { CDN_URL } from '../../utils/constants';
import { UserAvatarContainer } from '../../utils/styles';
import { User } from '../../utils/types';
import defaultAvatar from '../../__assets__/default_avatar.jpg';

type Props = {
  user: User;
};

export const UserAvatar: FC<Props> = ({ user }) => {
  const getProfilePicture = () => {
    const { profile } = user;
    return profile && profile.avatar
      ? CDN_URL.BASE.concat(profile.avatar)
      : defaultAvatar;
  };

  return <UserAvatarContainer src={getProfilePicture()} alt="avatar" />;
};
