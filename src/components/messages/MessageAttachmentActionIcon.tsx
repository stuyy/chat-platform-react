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
    const { files } = e.target;
    if (!files) return;
    const maxFilesDropped = 5 - attachments.length;
    if (maxFilesDropped === 0) return error('Max files reached');
    const filesArray = Array.from(files);
    let localCounter = attachmentCounter;
    for (let i = 0; i < filesArray.length; i++) {
      console.log(filesArray[i]);
      if (i === maxFilesDropped) break;
      dispatch(addAttachment({ id: localCounter++, file: filesArray[i] }));
      dispatch(incrementAttachmentCounter());
    }
  };

  return (
    <div ref={attachmentIconRef} onClick={onClick}>
      <CirclePlusFill size={36} className={styles.icon} cursor="pointer" />
      <FileInput
        multiple
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onChange}
      />
    </div>
  );
};
