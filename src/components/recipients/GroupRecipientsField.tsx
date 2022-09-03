import { Dispatch, FC, SetStateAction } from 'react';
import {
  InputContainer,
  InputField,
  InputLabel,
  RecipientChipContainer,
} from '../../utils/styles';

type Props = {
  setQuery: Dispatch<SetStateAction<string>>;
};

export const GroupRecipientsField: FC<Props> = ({ setQuery }) => {
  return (
    <section>
      <InputContainer backgroundColor="#161616">
        <InputLabel>Recipient</InputLabel>
        <InputField onChange={(e) => setQuery(e.target.value)} />
      </InputContainer>
    </section>
  );
};
