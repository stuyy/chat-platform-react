import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { selectType } from '../../store/selectedSlice';
import { MessagePanelConversationHeader } from './headers/MessagePanelConversationHeader';
import { MessagePanelGroupHeader } from './headers/MessagePanelGroupHeader';

export const MessagePanelHeader = () => {
  const { id: routeId } = useParams();
  const { isCalling, isCallInProgress, activeConversationId, callType } =
    useSelector((state: RootState) => state.call);
  const type = useSelector(selectType);

  const showCallPanel = isCalling || isCallInProgress;
  if (!showCallPanel)
    return type === 'private' ? (
      <MessagePanelConversationHeader />
    ) : (
      <MessagePanelGroupHeader />
    );

  return null;

  // if (showCallPanel && activeConversationId === parseInt(routeId!))
  //   return callType === 'video' ?
};
