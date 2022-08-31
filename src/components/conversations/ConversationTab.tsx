import {
  ConversationTabItemStyle,
  ConversationTabStyle,
} from '../../utils/styles';
import { chatTypes } from '../../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store';
import { updateType } from '../../store/selectedSlice';
import { ConversationTypeData } from '../../utils/types';

export const ConversationTab = () => {
  const selectedType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const onSelectType = (chat: ConversationTypeData) => {
    dispatch(updateType(chat.type));
    if (chat.type === 'group') navigate('/groups');
    else navigate('/conversations');
  };
  return (
    <ConversationTabStyle>
      {chatTypes.map((chat) => (
        <ConversationTabItemStyle
          selected={chat.type === selectedType}
          key={chat.type}
          onClick={() => onSelectType(chat)}
        >
          {chat.label}
        </ConversationTabItemStyle>
      ))}
    </ConversationTabStyle>
  );
};
