import { CirclePlusFill } from 'akar-icons';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  addAttachment,
  incrementAttachmentCounter,
} from '../../store/message-panel/messagePanelSlice';
import { useToast } from '../../utils/hooks/useToast';
import { FileInput } from '../../utils/styles/inputs/Textarea';
import { DivMouseEvent, InputChangeEvent } from '../../utils/types';
import styles from './index.module.scss';

export const MessageAttachmentActionIcon = () => {
  const attachmentIconRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useToast({ theme: 'dark' });
  const { attachmentCounter, attachments } = useSelector(
    (state: RootState) => state.messagePanel
  );

  const onClick = (e: DivMouseEvent) => {
    console.log('on click');
    fileInputRef.current?.click();
  };

  const onChange = (e: InputChangeEvent) => {
    const file = e.target.files?.item(0);
    if (attachments.length >= 5)
      return error('Maximum 5 Attachments Allowed', { position: 'top-center' });
    if (file && file.size > 1000000)
      return error('File exceeds limit: 1 MB', { position: 'top-center' });
    if (file) {
      console.log(file);
      dispatch(addAttachment({ id: attachmentCounter, file }));
      dispatch(incrementAttachmentCounter());
    }
  };

  return (
    <div ref={attachmentIconRef} onClick={onClick}>
      <CirclePlusFill size={36} className={styles.icon} cursor="pointer" />
      <FileInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onChange}
      />
    </div>
  );
};
