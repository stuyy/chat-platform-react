import styled, { css } from 'styled-components';

type Size = 'sm' | 'md' | 'lg';
type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = Partial<{
  size: Size;
  variant: ButtonVariant;
  flex: boolean;
}>;

export const getButtonSizeStyle = (size?: Size) => {
  switch (size) {
    case 'sm':
      return css`
        padding: 10px 20px;
        font-size: 14px;
      `;
    case 'md':
      return css`
        padding: 12px 24px;
        font-size: 16px;
      `;
    case 'lg':
      return css`
        padding: 14px 26px;
        font-size: 18px;
      `;
    default:
      return css`
        padding: 12px 24px;
        font-size: 16px;
      `;
  }
};

export const getButtonVariantStyle = (variant?: ButtonVariant) => {
  const primary = css`
    background-color: #2b09ff;
    color: #fff;
    &:hover {
      cursor: pointer;
      background-color: #3415ff;
    }
    &:active {
      background-color: #3a1cff;
    }
    &:disabled {
      background-color: #4937bc7c;
      color: #878787a2;
      cursor: not-allowed;
    }
  `;
  const secondary = css`
    background-color: #212121;
    color: #fff;
    &:hover {
      cursor: pointer;
      background-color: #282828;
    }
  `;
  switch (variant) {
    case 'primary':
      return primary;
    case 'secondary':
      return secondary;
    default:
      return primary;
  }
};

export const Button = styled.button<ButtonProps>`
  outline: none;
  border: none;
  font-family: 'Inter';
  border-radius: 10px;
  font-weight: 500;
  transition: 250ms background-color ease;
  ${({ size }) => getButtonSizeStyle(size)}
  ${({ variant }) => getButtonVariantStyle(variant)}
  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      align-items: center;
      gap: 10px;
    `}
`;
