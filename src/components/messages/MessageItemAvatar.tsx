import { FC } from 'react';
import { CDN_URL } from '../../utils/constants';
import { MessageItemAvatarStyle } from '../../utils/styles';
import { GroupMessageType, MessageType } from '../../utils/types';
import defaultAvatar from '../../__assets__/default_avatar.jpg';

type Props = {
  message: MessageType | GroupMessageType;
};

export const MessageItemAvatar: FC<Props> = ({ message }) => {
  const getProfilePicture = () => {
    const { profile } = message.author;
    console.log(message);
    return profile && profile.avatar
      ? CDN_URL.BASE.concat(profile.avatar)
      : defaultAvatar;
  };

  return <MessageItemAvatarStyle src={getProfilePicture()} alt="avatar" />;
};
