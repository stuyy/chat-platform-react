import { createRef, Dispatch, FC, useEffect, useState } from 'react';
import { ModalContainer, ModalContentBody, ModalHeader } from '.';
import { OverlayStyle } from '../../utils/styles';
import { CreateConversationForm } from '../forms/CreateConversationForm';
import { MdClose } from 'react-icons/md';
import { ConversationTypeForm } from '../forms/ConversationTypeForm';
import { ConversationType } from '../../utils/types';

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

export const CreateConversationModal: FC<Props> = ({ setShowModal }) => {
  const ref = createRef<HTMLDivElement>();
  const [type, setType] = useState<ConversationType>('private');

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) =>
      e.key === 'Escape' && setShowModal(false);
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { current } = ref;
    if (current === e.target) {
      console.log('Close Modal');
      setShowModal(false);
    }
  };

  return (
    <OverlayStyle ref={ref} onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <h2>Create a Conversation</h2>
          <MdClose size={32} onClick={() => setShowModal(false)} />
        </ModalHeader>
        <ModalContentBody>
          <ConversationTypeForm type={type} setType={setType} />
          <CreateConversationForm type={type} setShowModal={setShowModal} />
        </ModalContentBody>
      </ModalContainer>
    </OverlayStyle>
  );
};
