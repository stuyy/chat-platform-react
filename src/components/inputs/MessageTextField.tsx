import { MessageTextarea } from '../../utils/styles/inputs/Textarea';
import { FC, Dispatch, SetStateAction, useRef } from 'react';

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

  return (
    <MessageTextarea
      ref={ref}
      value={message}
      onChange={onMessageChange}
      placeholder="Send a Message"
      maxLength={maxLength}
      onKeyDown={onKeyDown}
    ></MessageTextarea>
  );
};
