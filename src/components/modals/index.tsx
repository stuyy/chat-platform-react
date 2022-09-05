import { FC, PropsWithChildren } from 'react';
import {
  ModalContainerStyle,
  ModalContentBodyStyle,
  ModalHeaderStyle,
} from '../../utils/styles';

export const ModalHeader: FC<PropsWithChildren> = ({ children }) => {
  return <ModalHeaderStyle>{children}</ModalHeaderStyle>;
};

export const ModalContentBody: FC<PropsWithChildren> = ({ children }) => {
  return <ModalContentBodyStyle>{children}</ModalContentBodyStyle>;
};

type ModalContainerProps = {
  showModal?: boolean;
};

export const ModalContainer: FC<PropsWithChildren & ModalContainerProps> = ({
  children,
  showModal,
}) => {
  console.log(`showModal: ${showModal}`);
  return (
    <ModalContainerStyle showModal={showModal}>{children}</ModalContainerStyle>
  );
};
