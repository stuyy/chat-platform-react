import { FC } from 'react';
import { SystemMessageContainer } from '../../../utils/styles';
import { SystemMessageLevel, SystemMessageType } from '../../../utils/types';
import { RiAlertFill, RiInformationLine } from 'react-icons/ri';
type Props = {
  message: SystemMessageType;
};

const getSystemIcon = (type: SystemMessageLevel) => {
  switch (type) {
    case 'info':
      return RiInformationLine;
    case 'warning':
    case 'error':
      return RiAlertFill;
  }
};

export const SystemMessage: FC<Props> = ({ message }) => {
  const { content, level } = message;
  const Icon = getSystemIcon(level);
  return (
    <SystemMessageContainer>
      <div className="header">
        <Icon className="icon" />
        <span>System Message</span>
      </div>
      <div>
        <span className="content">{content}</span>
      </div>
    </SystemMessageContainer>
  );
};
