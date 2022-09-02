import { FC, Dispatch, SetStateAction } from 'react';
import { chatTypes } from '../../utils/constants';
import { ConversationType } from '../../utils/types';
import styles from './index.module.scss';

type Props = {
  type: ConversationType;
  setType: Dispatch<SetStateAction<ConversationType>>;
};

export const ConversationTypeForm: FC<Props> = ({ type, setType }) => {
  return (
    <form className={styles.conversationTypeForm}>
      {chatTypes.map((chatType) => (
        <div>
          <input
            className={styles.radio}
            type="radio"
            name="conversationType"
            id={chatType.type}
            onChange={() => setType(chatType.type)}
            checked={type === chatType.type}
          />
          <label className={styles.radioLabel} htmlFor={chatType.type}>
            {chatType.label}
          </label>
        </div>
      ))}
    </form>
  );
};
