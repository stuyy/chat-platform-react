import { MessageTextarea } from '../../utils/styles/inputs/Textarea';
import { FC, Dispatch, SetStateAction, useRef } from 'react';
import { ClipboardEvent, DragEvent } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAttachment,
  incrementAttachmentCounter,
} from '../../store/message-panel/messagePanelSlice';
import { RootState } from '../../store';
import { useToast } from '../../utils/hooks/useToast';

type Props = {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  maxLength: number;
  setIsMultiLine: Dispatch<SetStateAction<boolean>>;
  sendTypingStatus: () => void;
  sendMessage: () => void;
};

export const MessageTextField: FC<Props> = ({
  message,
  setMessage,
  maxLength,
  setIsMultiLine,
  sendTypingStatus,
  sendMessage,
}) => {
  const DEFAULT_TEXTAREA_HEIGHT = 21;
  const ref = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();
  const { error } = useToast({ theme: 'dark' });
  const { attachments, attachmentCounter } = useSelector(
    (state: RootState) => state.messagePanel
  );

  const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setMessage(e.target.value);
    const { current } = ref;
    if (current) {
      const height = parseInt(current.style.height);
      current.style.height = '5px';
      current.style.height = current.scrollHeight + 'px';
      height > DEFAULT_TEXTAREA_HEIGHT
        ? setIsMultiLine(true)
        : setIsMultiLine(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    sendTypingStatus();
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
      setIsMultiLine(false);
      if (ref.current) ref.current.style.height = '21px';
    }
  };

  const handleFileAdd = (files: FileList) => {
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

  const onDrop = (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const { files } = e.dataTransfer;
    handleFileAdd(files);
  };

  const onPaste = (e: ClipboardEvent) => {
    const { files } = e.clipboardData;
    console.log('pasting...');
    console.log(files);
    handleFileAdd(files);
  };

  return (
    <MessageTextarea
      ref={ref}
      value={message}
      onChange={onMessageChange}
      placeholder="Send a Message"
      maxLength={maxLength}
      onKeyDown={onKeyDown}
      onDrop={onDrop}
      onPaste={onPaste}
    ></MessageTextarea>
  );
};
