import { CirclePlusFill } from 'akar-icons';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  addAttachment,
  incrementAttachmentCounter,
} from '../../store/message-panel/messagePanelSlice';
import { FileInput } from '../../utils/styles/inputs/Textarea';
import { DivMouseEvent, InputChangeEvent } from '../../utils/types';
import styles from './index.module.scss';

export const MessageAttachmentActionIcon = () => {
  const attachmentIconRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { attachmentCounter } = useSelector(
    (state: RootState) => state.messagePanel
  );

  const onClick = (e: DivMouseEvent) => {
    console.log('on click');
    fileInputRef.current?.click();
  };

  const onChange = (e: InputChangeEvent) => {
    const file = e.target.files?.item(0);
    if (file) {
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
