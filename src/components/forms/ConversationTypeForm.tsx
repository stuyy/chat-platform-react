import styles from './index.module.scss';

export const ConversationTypeForm = () => {
  return (
    <form className={styles.conversationTypeForm}>
      <div>
        <input
          className={styles.radio}
          type="radio"
          name="conversationType"
          id="private"
        />
        <label className={styles.radioLabel} htmlFor="private">
          Private
        </label>
      </div>
      <div>
        <input
          className={styles.radio}
          type="radio"
          name="conversationType"
          id="group"
        />
        <label className={styles.radioLabel} htmlFor="group">
          Group
        </label>
      </div>
    </form>
  );
};
