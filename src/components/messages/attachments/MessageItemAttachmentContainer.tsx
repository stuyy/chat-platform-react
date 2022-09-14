import { FC, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { CDN_URL } from '../../../utils/constants';
import { useKeydown } from '../../../utils/hooks';
import { OverlayStyle } from '../../../utils/styles';
import { GroupMessageType, MessageType } from '../../../utils/types';
import styles from './index.module.scss';

type Props = {
  message: MessageType | GroupMessageType;
};
export const MessageItemAttachmentContainer: FC<Props> = ({ message }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const onClick = (key: string) => {
    setShowOverlay(true);
    setImageUrl(CDN_URL.ORIGINAL.concat(key));
  };

  const handleKeydown = (e: KeyboardEvent) =>
    e.key === 'Escape' && setShowOverlay(false);
  useKeydown(handleKeydown);

  return (
    <>
      {showOverlay && (
        <OverlayStyle>
          <MdClose
            className={styles.closeIcon}
            onClick={() => setShowOverlay(false)}
          />
          <img src={imageUrl} alt="overlay" style={{ maxHeight: '90%' }} />
        </OverlayStyle>
      )}
      <div>
        {message.attachments?.map((attachment) => (
          <img
            key={attachment.key}
            src={CDN_URL.PREVIEW.concat(attachment.key)}
            width={300}
            alt={attachment.key}
            onClick={() => onClick(attachment.key)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
    </>
  );
};
