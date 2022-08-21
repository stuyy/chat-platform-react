import { createRef, Dispatch, FC, useEffect } from 'react';
import { ModalContainer, ModalContentBody, ModalHeader } from '.';
import { OverlayStyle } from '../../utils/styles';
import { CreateConversationForm } from '../forms/CreateConversationForm';
import { MdClose } from 'react-icons/md';

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

export const CreateConversationModal: FC<Props> = ({ setShowModal }) => {
  const ref = createRef<HTMLDivElement>();

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
          <CreateConversationForm />
        </ModalContentBody>
      </ModalContainer>
    </OverlayStyle>
  );
};
