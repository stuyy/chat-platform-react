import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CDN_URL } from '../../utils/constants';
import {
  AvatarUploadContainer,
  GroupAvatarUploadContainer,
} from '../../utils/styles';
import { FileInput } from '../../utils/styles/inputs/Textarea';
import { InputChangeEvent } from '../../utils/types';
import defaultAvatar from '../../__assets__/default_avatar.jpg';

export const GroupAvatarUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { selectedGroupContextMenu } = useSelector(
    (state: RootState) => state.groups
  );

  const getGroupAvatar = () => {
    return selectedGroupContextMenu && selectedGroupContextMenu.avatar
      ? CDN_URL.BASE.concat(selectedGroupContextMenu.avatar)
      : defaultAvatar;
  };

  const onFileChange = (e: InputChangeEvent) => {};

  const onAvatarClick = () => fileInputRef.current?.click();

  return (
    <GroupAvatarUploadContainer>
      <AvatarUploadContainer
        onClick={onAvatarClick}
        url={getGroupAvatar()}
      ></AvatarUploadContainer>
      <FileInput
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={onFileChange}
      />
    </GroupAvatarUploadContainer>
  );
};
