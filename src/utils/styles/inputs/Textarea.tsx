import styled, { css } from 'styled-components';

export const MessageTextarea = styled.textarea`
  background-color: inherit;
  outline: none;
  border: none;
  color: ${({ theme }) => theme.messagePanel.inputContainer.color};
  font-family: 'Inter';
  box-sizing: border-box;
  font-size: 18px;
  width: 100%;
  padding: 0;
  margin: 4px 0;
  resize: none;
  height: 20px;
  max-height: 200px;
  flex: 0 0 auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const OnboardingInputField = styled.input`
  background-color: #101010;
  color: #fff;
  outline: none;
  border: none;
  padding: 20px;
  font-family: 'Inter';
  font-size: 16px;
  border-radius: 8px;
  width: 100%;
  margin: 8px 0;
  box-sizing: border-box;
  &::placeholder {
    color: #353535;
    font-style: italic;
  }
`;

export const OnboardingAboutField = styled.textarea`
  resize: none;
  background-color: #101010;
  color: #fff;
  font-family: 'Inter';
  font-size: 16px;
  border-radius: 8px;
  outline: none;
  border: none;
  padding: 20px;
  width: 100%;
  height: 120px;
  margin: 4px 0;
  box-sizing: border-box;
  &::placeholder {
    color: #353535;
    font-style: italic;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FileInput = styled.input`
  ${({ type }) =>
    type === 'file' &&
    css`
      display: none;
    `}
`;

export const UploadAvatarButton = styled.div`
  width: 100%;
  background-color: #202020;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 8px;
  height: 60px;
  cursor: pointer;
`;

export const SubmitOnboardingFormButton = styled.button`
  width: 100%;
  background-color: #390096;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 8px;
  height: 60px;
  outline: none;
  border: none;
  font-size: 16px;
  font-family: 'Inter';
  cursor: pointer;
  margin: 10px 0;
`;

export const UploadedAvatarContainer = styled.div`
  width: 100%;
  background-color: #101010;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  height: 100px;
  justify-content: space-between;
  border-radius: 4px;
  margin-bottom: 10px;
  & .side {
    display: flex;
    align-items: center;
    gap: 20px;
    & .fileName {
      display: inline-block;
      word-break: break-word;
    }
  }
`;

export const UploadedAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;
