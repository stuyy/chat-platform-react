import React, { Dispatch, FC, SetStateAction, useState, useRef } from 'react';
import { CharacterLimit, MessageInputContainer } from '../../utils/styles';
import { MessageTextField } from '../inputs/MessageTextField';
import { CirclePlusFill, FaceVeryHappy } from 'akar-icons';
import styles from './index.module.scss';
import { Picker, EmojiData, BaseEmoji } from 'emoji-mart';

type Props = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  placeholderName: string;
  sendMessage: () => void;
  sendTypingStatus: () => void;
};

export const MessageInputField: FC<Props> = ({
  content,
  placeholderName,
  setContent,
  sendMessage,
  sendTypingStatus,
}) => {
  const ICON_SIZE = 36;
  const MAX_LENGTH = 2048;
  const [isMultiLine, setIsMultiLine] = useState(false);
  const atMaxLength = content.length === MAX_LENGTH;

  const [caretStartPosition, setCaretStartPosition] = useState<number>(0);
  const [caretEndPosition, setCaretEndPosition] = useState<number>(0);

  const onEmojiSelect = (e: BaseEmoji) => {
    console.log(e.native);
    console.log(caretStartPosition, caretEndPosition);
    console.log(content.length);
    console.log(caretEndPosition);
    console.log(content);
    // my mes{}sage
    // console.log(content);
    // const newContent =
    //   content.substring(0, caretStartPosition) +
    //   e.native +
    //   content.substring(caretEndPosition, content.length);
    // console.log(newContent);
    if (caretStartPosition === 0) {
      const newContent = `${content.substring(0, caretStartPosition)} ${
        e.native
      } ${content.substring(caretEndPosition, content.length)}`;
      setContent(newContent);
    } else {
      const newContent = `${content.substring(
        0,
        caretStartPosition - 1
      )} ${e.native}${content.substring(
        caretEndPosition - 1,
        content.length
      )}`;
      setContent(newContent);
    }

    // else
    //   setContent((prev) =>
    //     content.length === caretEndPosition
    //       ? `${prev}${e.native}`
    //       : `${prev.substring(0, caretStartPosition - 1)}${
    //           e.native
    //         }${prev.substring(caretEndPosition - 1, content.length)}`
    //   );
  };

  return (
    <>
      <MessageInputContainer isMultiLine={isMultiLine}>
        <CirclePlusFill className={styles.icon} size={ICON_SIZE} />
        <form onSubmit={sendMessage} className={styles.form}>
          <MessageTextField
            message={content}
            setMessage={setContent}
            maxLength={MAX_LENGTH}
            setIsMultiLine={setIsMultiLine}
            sendTypingStatus={sendTypingStatus}
            sendMessage={sendMessage}
            setCaretStartPosition={setCaretStartPosition}
            setCaretEndPosition={setCaretEndPosition}
          />
        </form>
        <div className={styles.emojiPicker}>
          <Picker
            showPreview={false}
            showSkinTones={false}
            theme="dark"
            onSelect={onEmojiSelect}
          />
        </div>
        <FaceVeryHappy className={styles.icon} size={ICON_SIZE} />
        {atMaxLength && (
          <CharacterLimit atMaxLength={atMaxLength}>
            {`${content.length}/${MAX_LENGTH}`}
          </CharacterLimit>
        )}
      </MessageInputContainer>
    </>
  );
};
