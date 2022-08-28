import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { editMessageThunk } from '../../store/messageSlice';
import {
  EditMessageActionsContainer,
  EditMessageInputField,
} from '../../utils/styles';
import { EditMessagePayload, MessageType } from '../../utils/types';

type Props = {
  selectedEditMessage: MessageType;
  onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const EditMessageContainer: FC<Props> = ({
  selectedEditMessage,
  onEditMessageChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectedEditMessage);
    console.log('Submitting Edit');
    const params: EditMessagePayload = {
      conversationId: parseInt(id!),
      messageId: selectedEditMessage.id,
      content: selectedEditMessage.content,
    };
    dispatch(editMessageThunk(params));
  };
  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={onSubmit}>
        <EditMessageInputField
          value={selectedEditMessage.content}
          onChange={onEditMessageChange}
        />
      </form>
      <EditMessageActionsContainer>
        <div>
          escape to <span>cancel</span> - enter to <span>save</span>
        </div>
      </EditMessageActionsContainer>
    </div>
  );
};
