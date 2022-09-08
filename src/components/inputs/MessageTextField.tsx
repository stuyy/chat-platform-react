import { MessageTextarea } from '../../utils/styles/inputs/Textarea';
import { useState } from 'react';

export const MessageTextField = () => {
  const [message, setMessage] = useState('');

  const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    console.log(e.target.value);
    setMessage(e.target.value);
  };

  return (
    <MessageTextarea
      value={message}
      onChange={onMessageChange}
    ></MessageTextarea>
  );
};
