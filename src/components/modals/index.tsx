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

export const ModalContainer: FC<PropsWithChildren> = ({ children }) => {
  return <ModalContainerStyle>{children}</ModalContainerStyle>;
};
