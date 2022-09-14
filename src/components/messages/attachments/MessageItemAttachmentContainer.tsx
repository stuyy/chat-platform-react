import { FC } from 'react';
import { CDN_URL_PREVIEW } from '../../../utils/constants';
import { GroupMessageType, MessageType } from '../../../utils/types';

type Props = {
  message: MessageType | GroupMessageType;
};
export const MessageItemAttachmentContainer: FC<Props> = ({ message }) => {
  return (
    <div>
      {message.attachments?.map((attachment) => (
        <img
          key={attachment.key}
          src={CDN_URL_PREVIEW.concat(attachment.key)}
          width={300}
          alt={attachment.key}
        />
      ))}
    </div>
  );
};
